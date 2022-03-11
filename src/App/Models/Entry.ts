import { Model, model, Schema } from 'mongoose';
import { Entry } from '../../interfaces';
import mongoose from 'mongoose';

export interface IEntry extends Entry {}
const entrySchema = new Schema<IEntry>({
  description: {
    type: String,
    required: true,
  },
  createdAt: { type: Number, required: true },
  status: {
    type: String,
    enum: {
      values: ['pending', 'inProgress', 'finished'],
      message: '{VALUE} no es un estado válido',
    },
    default: 'pending',
  },
});

const EntryModel: Model<IEntry> = mongoose.models.Entry || model('Entry', entrySchema);
export default EntryModel;
