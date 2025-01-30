import { Sequelize } from 'sequelize';
import 'dotenv/config'


// creates sequelize object
const dbconn = new Sequelize(
  
  //grab the values from the env file
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD,
  
  {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  logging: true,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

export default dbconn;
