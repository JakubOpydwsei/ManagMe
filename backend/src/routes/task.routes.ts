import { Router, Request, Response } from 'express';
import { Task } from '../models/Task';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    if (!req.body.id) {
      req.body.id = Date.now();
    }
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Error creating task' });
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: any = {}
    if (req.query.storyId) {
      const sid = Number(req.query.storyId)
      if (isNaN(sid)) return res.status(400).json({ error: 'Invalid storyId' });
      filter.storyId = sid
    }

    const tasks = await Task.find(filter)
    res.json(tasks)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error fetching tasks' })
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid id' })

  try {
    const task = await Task.findOne({ id })
    if (!task) return res.status(404).json({ error: 'Task not found' })
    res.json(task)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error fetching task' })
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid id' })

  try {
    const updateData = { ...req.body }
    delete updateData.id

    const updatedTask = await Task.findOneAndUpdate({ id }, updateData, { new: true })
    if (!updatedTask) return res.status(404).json({ error: 'Task not found' })
    res.json(updatedTask)
  } catch (err) {
    console.error(err)
    res.status(400).json({ error: 'Error updating task' })
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid id' })

  try {
    const deletedTask = await Task.findOneAndDelete({ id })
    if (!deletedTask) return res.status(404).json({ error: 'Task not found' })
    res.json({ message: 'Task deleted' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error deleting task' })
  }
})

export default router;