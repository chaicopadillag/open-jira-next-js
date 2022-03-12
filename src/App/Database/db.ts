import mongoose from 'mongoose';

const mongoConnection = {
  isConnected: 0,
};

export const connect = async () => {
  if (mongoConnection.isConnected) {
    console.log('Ya estamos conectados a MongoDB');
    return;
  }

  if (mongoose.connections.length > 0) {
    mongoConnection.isConnected = mongoose.connections[0].readyState;

    if (mongoConnection.isConnected === 1) {
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

export const disconnect = async () => {
  if (process.env.NODE_ENV === 'development') return;

  if (mongoConnection.isConnected === 0) {
    console.log('No hay conexión a MongoDB');
    return;
  }
  await mongoose.disconnect();
  mongoConnection.isConnected = 0;
  console.log('Desconectado de MongoDB');
};
