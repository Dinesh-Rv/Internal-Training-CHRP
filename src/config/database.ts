import { Sequelize, Options } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export type DBConfig = {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: Options['dialect'];
  logging?: boolean;
};

const env = process.env.NODE_ENV || 'development';

const baseConfig: DBConfig = {
  username: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || '',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  dialect: 'postgres',
  logging: false,
};

const configs: Record<string, DBConfig> = {
  development: { ...baseConfig },
  test: {
    ...baseConfig,
    database: process.env.DB_NAME_TEST || baseConfig.database + '_test',
    logging: false,
  },
  production: {
    ...baseConfig,
    logging: false,
  },
};

const currentConfig = configs[env];

export class Database {
  private sequelize: Sequelize;

  constructor(config: DBConfig) {
    this.sequelize = new Sequelize(config.database, config.username, config.password, {
      host: config.host,
      port: config.port,
      dialect: config.dialect,
      logging: config.logging,
    });
  }

  public async testConnection(): Promise<void> {
    try {
      await this.sequelize.authenticate();
      console.log('Database connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      throw error;
    }
  }

  public async sync(options?: Parameters<Sequelize['sync']>[0]): Promise<void> {
    try {
      await this.sequelize.sync(options);
      console.log('Database synchronized.');
    } catch (error) {
      console.error('Database synchronization failed:', error);
      throw error;
    }
  }

  public getSequelize(): Sequelize {
    return this.sequelize;
  }
}

const database = new Database(currentConfig);
export default database; 