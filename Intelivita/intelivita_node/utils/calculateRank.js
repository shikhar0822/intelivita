function calculateRanks(users) {
    let rank = 1;
    let lastPoints = null;
    let count = 0;
  
    users.forEach((user, index) => {
      if (user.total_points !== lastPoints) {
        rank = index + 1;
      }
      user.rank = rank;
      lastPoints = user.total_points;
    });
  
    return users;
}
  
module.exports = calculateRanks;