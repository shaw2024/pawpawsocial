import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DB_NAME || 'pawpal', process.env.DB_USER || 'user', process.env.DB_PASSWORD || 'password', {
  host: process.env.DB_HOST || 'localhost',
  dialect: 'postgres', // or 'mysql', 'sqlite', 'mariadb', 'mssql'
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export { sequelize, connectDB };