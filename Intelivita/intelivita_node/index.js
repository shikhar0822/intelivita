require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const leaderboardRoutes = require('./routes/leaderboardRoutes');

const app = express();
app.use(express.json());

var cors = require('cors');
app.use(cors());

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB connected');
});

app.use('/api/leaderboard', leaderboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));