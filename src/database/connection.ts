import mongoose from 'mongoose';
import { config } from '../config/database';
import logger from '../config/winston';

const dbConnection = async (): Promise<void> => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(config[config.default]);
    console.log('##### DB Online #####');
  } catch (error) {
    logger.error('>>>> Error a la hora de inicializar BD <<<<', error);
  }
};

export default dbConnection;
