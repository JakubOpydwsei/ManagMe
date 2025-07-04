import mongoose from 'mongoose';
import app from '../app';

if (process.env.NODE_ENV === 'test') {
  app.post('/test/reset-db', async (req, res) => {
    try {
      const collections = mongoose.connection.collections;
      for (const key in collections) {
        await collections[key].deleteMany({});
      }
      res.status(200).send('Database reset');
    } catch (error) {
      console.error('Failed to reset DB:', error);
      res.status(500).send('Failed to reset DB');
    }
  });
}