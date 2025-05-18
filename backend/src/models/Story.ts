import mongoose, { Schema, Document } from 'mongoose';

export interface IStory extends Document {
  id: number;
  name: string;
  desc: string;
  priority: 'low' | 'medium' | 'high';
  project_id: number;
  date: string;
  status: 'todo' | 'doing' | 'done';
  owner: number;
}

const StorySchema: Schema = new Schema({
  id: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  desc: { type: String, required: true },
  priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
  project_id: { type: Number, required: true },
  date: { type: String, required: true },
  status: { type: String, enum: ['todo', 'doing', 'done'], required: true },
  owner: { type: Number, required: true },
});

export const Story = mongoose.model<IStory>('Story', StorySchema);