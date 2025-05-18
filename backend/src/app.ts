import express from 'express';
import cors from 'cors';
import { connectDB } from './db';
import userRoutes from './routes/user.routes';
import projectRoutes from './routes/project.routes';
import storyRoutes from './routes/story.routes';
import taskRoutes from './routes/task.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/tasks', taskRoutes);

connectDB();

export default app;