import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../App/Database';
import { entrySeeder } from '../../App/Database/Seeders';
import { Entry } from '../../App/Models';

type Data = {
  message: string;
};

const dbSeed = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ message: 'Forbidden in production' });
  }

  await db.connect();

  await Entry.deleteMany({});
  await Entry.insertMany(entrySeeder);
  await db.disconnect();

  res.status(200).json({ message: 'Proceso finalizado correctamente' });
};

export default dbSeed;
