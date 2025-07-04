import { Sequelize } from 'sequelize';

const env = (process.env.NODE_ENV as 'development' | 'test' | 'production') || 'development';

type DBEnv = 'development' | 'test' | 'production';

const dbConfig: Record<DBEnv, {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: 'postgres';
  logging: boolean;
}> = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'product_db',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    logging: false,
  },
  test: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'product_db_test',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    logging: false,
  },
  production: {
    username: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || '',
    host: process.env.DB_HOST || '',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    logging: false,
  },
};

const currentConfig = dbConfig[env];

let sequelize: Sequelize;

try {
  sequelize = new Sequelize(
    currentConfig.database,
    currentConfig.username,
    currentConfig.password,
    {
      host: currentConfig.host,
      port: currentConfig.port,
      dialect: currentConfig.dialect,
      logging: currentConfig.logging,
    }
  );
} catch (error) {
  console.error('Unable to initialize Sequelize:', error);
  throw error;
}

export default sequelize;
