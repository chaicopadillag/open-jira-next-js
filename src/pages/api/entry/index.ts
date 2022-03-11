import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../App/Database';
import { Entry, IEntry } from '../../../App/Models';

type Data =
  | {
      message: string;
    }
  | IEntry[]
  | IEntry;

export default function hanlder(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return get(res);
    case 'POST':
      return post(req, res);
    default:
      return res.status(404).json({ message: 'Not Found Endpoind' });
  }
}

const get = async (res: NextApiResponse<Data>) => {
  await db.connectToMongoDb();
  const entries = await Entry.find().sort({ createdAt: 'ascending' });
  await db.disconnectOfMongoDb();
  return res.status(200).json(entries);
};

const post = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { description = '' } = req.body;
  const newEntry = new Entry({
    description,
    createdAt: Date.now(),
  });
  try {
    await db.connectToMongoDb();
    await newEntry.save();
    await db.disconnectOfMongoDb();

    return res.status(201).json(newEntry);
  } catch (error) {
    await db.disconnectOfMongoDb();
    return res.status(500).json({ message: 'Error al crear entrada' });
  }
};
