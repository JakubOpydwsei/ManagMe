import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  id: number;
  name: string;
  desc: string;
  priority: 'low' | 'medium' | 'high';
  storyId: number;
  workingHours: number;
  status: 'todo' | 'doing' | 'done';
  addDate: string;
  user?: number;
  startDate?: string;
  endDate?: string;
}

const TaskSchema: Schema = new Schema({
  id: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  desc: { type: String, required: true },
  priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
  storyId: { type: Number, required: true },
  workingHours: { type: Number, required: true },
  status: { type: String, enum: ['todo', 'doing', 'done'], required: true },
  addDate: { type: String, required: true },
  user: { type: Number, required: false },
  startDate: { type: String, required: false },
  endDate: { type: String, required: false },
});

export const Task = mongoose.model<ITask>('Task', TaskSchema);