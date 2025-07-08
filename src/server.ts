import 'dotenv/config';
import app from './app';
import { testDbConnection, syncDbModels } from './utils/dbInit';
import logger from './utils/logger';

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await testDbConnection();
    await syncDbModels();
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server due to database error: %o', error);
    process.exit(1);
  }
}

startServer();

