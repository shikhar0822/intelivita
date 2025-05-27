const User = require('../models/user_schema');
const Activity = require('../models/activity_schema');
const calculateRanks = require('../utils/calculateRank');

async function recalculateLeaderboard(filter) {
  const matchStage = {};


  const now = new Date();

  if (filter === 'day') {
    matchStage.createdAt = {
      $gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
      $lt: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
    };
  } else if (filter === 'month') {
    matchStage.createdAt = {
      $gte: new Date(now.getFullYear(), now.getMonth(), 1),
      $lt: new Date(now.getFullYear(), now.getMonth() + 1, 1)
    };
  } else if (filter === 'year') {
    matchStage.createdAt = {
      $gte: new Date(now.getFullYear(), 0, 1),
      $lt: new Date(now.getFullYear() + 1, 0, 1)
    };
  }

  const userPoints = await Activity.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: '$userId',
        totalPoints: { $sum: '$points' },
      },
    },
    { $sort: { totalPoints: -1 } }
  ]);

  console.log('userPoints: ', userPoints);
  const users = [];
  for (const { _id, totalPoints } of userPoints) {
    console.log('totalPoints: ', totalPoints);
    const user = await User.findOne({ _id: _id });
    if (user) {
      user.total_points = totalPoints;
      users.push(user);
    }
  }

  const rankedUsers = calculateRanks(users);

  for (const user of rankedUsers) {
    await User.updateOne({ _id: user._id }, { rank: user.rank, total_points: user.total_points });
  }

  return rankedUsers;
}

module.exports = { recalculateLeaderboard };