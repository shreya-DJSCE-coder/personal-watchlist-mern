const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Movie = require('./models/Movie');

dotenv.config();

const dummyMovies = [
  {
    title: 'Inception',
    type: 'Movie',
    platform: 'Netflix',
    rating: 5,
    status: 'Completed'
  },
  {
    title: 'Stranger Things',
    type: 'Series',
    platform: 'Netflix',
    rating: 4,
    status: 'Watching'
  },
  {
    title: 'The Boys',
    type: 'Series',
    platform: 'Prime',
    rating: 5,
    status: 'Completed'
  },
  {
    title: 'Attack on Titan',
    type: 'Anime',
    platform: 'Other',
    rating: 5,
    status: 'Completed'
  },
  {
    title: 'Loki',
    type: 'Series',
    platform: 'Hotstar',
    rating: 4,
    status: 'Plan to Watch'
  },
  {
    title: 'Interstellar',
    type: 'Movie',
    platform: 'Prime',
    rating: 5,
    status: 'Completed'
  },
  {
    title: 'Jujutsu Kaisen',
    type: 'Anime',
    platform: 'Netflix',
    rating: 4,
    status: 'Watching'
  },
  {
    title: 'MKBHD Tech Documentary',
    type: 'Series',
    platform: 'YouTube',
    rating: 4,
    status: 'Plan to Watch'
  }
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/watchlist_db';
    console.log(`Connecting to MongoDB at: ${mongoUri}`);
    await mongoose.connect(mongoUri);

    console.log('Clearing existing watchlist entries...');
    await Movie.deleteMany({});

    console.log('Inserting dummy watchlist entries...');
    const inserted = await Movie.insertMany(dummyMovies);
    console.log(`🎉 Successfully seeded ${inserted.length} dummy entries!`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(`❌ Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedDB();

