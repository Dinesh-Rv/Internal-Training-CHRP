import express from 'express';
import dotenv from 'dotenv';
import database from './config/database';

dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Stock Management System API');
});

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await database.testConnection();
    await database.sync();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
