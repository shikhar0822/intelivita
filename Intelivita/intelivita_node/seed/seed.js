require('dotenv').config();
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const User = require('../models/user_schema');
const Activity = require('../models/activity_schema');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

const seedData = async () => {
  // await User.deleteMany({});
  // await Activity.deleteMany({});

  for (let i = 1; i <= 40; i++) {
    const user = await User.create({
      full_name: faker.person.fullName(),
      userId: i,
    });

    // Random number of activities
    const activityCount = Math.floor(Math.random() * 20) + 1;
    const activities = [];

    for (let j = 0; j < activityCount; j++) {
      const daysAgo = Math.floor(Math.random() * 365);
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);

      activities.push({
        userId: user._id,
        timestamp: date,
        points: 20,
      });
    }

    await Activity.insertMany(activities);
      }

  console.log('Seeding complete');
  process.exit();
};

connectDB().then(seedData);
