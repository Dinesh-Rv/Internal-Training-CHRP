import sequelize from '../../config/database';
import logger from './logger';

export async function testDbConnection() {
  try {
    await sequelize.authenticate();
    logger.info('Database connection has been established successfully.');
  } catch (error) {
    logger.error('Unable to connect to the database: %o', error);
    throw error;
  }
}

export async function syncDbModels(force = false) {
  try {
    await sequelize.sync({ force });
    logger.info('All models were synchronized successfully.');
  } catch (error) {
    logger.error('Error synchronizing models: %o', error);
    throw error;
  }
} 