import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../App/Database';
import { Entry, IEntry } from '../../../../App/Models';

type Data =
  | {
      message: string;
    }
  | IEntry;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      return get(req, res);
    case 'PUT':
      return put(req, res);
    default:
      res.status(200).json({ message: 'Method Not Found' });
      break;
  }
}

const get = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { id } = req.query;
    await db.connectToMongoDb();

    const entry = await Entry.findById(id);

    if (!entry) {
      await db.disconnectOfMongoDb();
      return res.status(404).json({ message: 'Entry not found' });
    }

    await db.disconnectOfMongoDb();

    return res.status(200).json(entry);
  } catch (error: any) {
    await db.disconnectOfMongoDb();
    return res.status(500).json({ message: 'Error al obtener entrada' });
  }
};
const put = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { id } = req.query;
    await db.connectToMongoDb();

    const oldEntry = await Entry.findById(id);

    if (!oldEntry) {
      await db.disconnectOfMongoDb();
      return res.status(404).json({ message: 'Entry not found' });
    }

    const { description = oldEntry.description, status = oldEntry.status } = req.body;

    const entry = await Entry.findByIdAndUpdate(
      id,
      {
        description,
        status,
      },
      { new: true, runValidators: true }
    );
    await db.disconnectOfMongoDb();

    return res.status(200).json(entry!);
  } catch (error: any) {
    await db.disconnectOfMongoDb();
    if (error?.errors?.status?.message) {
      return res.status(422).json({ message: error.errors.status.message });
    }
    return res.status(500).json({ message: 'Error al actulizar entrada' });
  }
};
