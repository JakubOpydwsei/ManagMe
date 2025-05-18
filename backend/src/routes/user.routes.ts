import { Router } from 'express';
import { User } from '../models/User';

const router = Router()

router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body)
    await newUser.save()
    res.status(201).json(newUser)
  } catch {
    res.status(400).json({ error: 'Error creating user' })
  }
})

router.get('/', async (_req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch {
    res.status(500).json({ error: 'Error fetching users' })
  }
});

export default router;