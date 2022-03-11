import mongoose from 'mongoose';

const mongoDbStatus = {
  isConnected: 0,
};

export const connectToMongoDb = async () => {
  if (mongoDbStatus.isConnected) {
    console.log('Ya estamos conectados a MongoDB');
    return;
  }

  if (mongoose.connections.length > 0) {
    mongoDbStatus.isConnected = mongoose.connections[0].readyState;

    if (mongoDbStatus.isConnected === 1) {
      console.log('Usando conexión anterior a MongoDB');
      return;
    }

    await mongoose.disconnect();
  }

  await mongoose.connect(process.env.MONGO_DB_URL || '', {
    dbName: process.env.MONGO_DB_NAME,
  });
  console.log('Conectado a MongoDB');
};

export const disconnectOfMongoDb = async () => {
  if (process.env.NODE_ENV === 'development') return;

  if (mongoDbStatus.isConnected === 0) {
    console.log('No hay conexión a MongoDB');
    return;
  }
  await mongoose.disconnect();
  console.log('Desconectado de MongoDB');
};
