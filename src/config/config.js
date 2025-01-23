import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Create a connection to the MySQL database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

sequelize.authenticate()
  .then(() => console.log('Connected to MySQL successfully!'))
  .catch(err => console.error('Unable to connect to MySQL:', err));

export default sequelize;