const User = require('../models/user_schema');
const { recalculateLeaderboard } = require('../services/leaderboardService');

exports.getLeaderboard = async (req, res) => {
  const { filter = 'day', search } = req.query;

  if (search) {
    const user = await User.findOne({ _id: search });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const users = await User.find({}).sort({ totalPoints: -1, rank: 1 });
    const sorted = [user, ...users.filter(u => u.userId !== user.userId)];

    return res.json(sorted);
  }

  const users = await User.find({}).sort({ totalPoints: -1, rank: 1 });
  return res.json(users);
};

exports.recalculate = async (req, res) => {
  const { filter } = req.query;

  const result = await recalculateLeaderboard(filter);
  res.json({ message: 'Leaderboard recalculated', data: result });
};