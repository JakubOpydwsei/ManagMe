import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  id: number;
  name: string;
  desc: string;
}

const ProjectSchema: Schema = new Schema({
  id: { type: Number, unique: true, required: true },
  name: { type: String, required: true, unique: true },
  desc: { type: String, required: true },
});

export const Project = mongoose.model<IProject>('Project', ProjectSchema);