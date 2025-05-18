import { Router, Request, Response } from 'express';
import { Story } from '../models/Story';

const router = Router()

router.post('/', async (req: Request, res: Response) => {
  try {
    if (!req.body.id) {
      req.body.id = Date.now()
    }

    const story = new Story(req.body)
    await story.save()
    res.status(201).json(story)
  } catch (err) {
    console.error(err)
    res.status(400).json({ error: 'Error creating story' })
  }
})

router.get('/', async (req: Request, res: Response) => {
  try {
    const filter = req.query || {}
    const stories = await Story.find(filter)
    res.json(stories)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error fetching stories' })
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid id' })

  try {
    const story = await Story.findOne({ id })
    if (!story) return res.status(404).json({ error: 'Story not found' })
    res.json(story)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error fetching story' })
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid id' })

  try {
    const updateData = { ...req.body }
    delete updateData.id

    const updatedStory = await Story.findOneAndUpdate({ id }, updateData, { new: true })
    if (!updatedStory) return res.status(404).json({ error: 'Story not found' })
    res.json(updatedStory)
  } catch (err) {
    console.error(err)
    res.status(400).json({ error: 'Error updating story' })
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid id' })

  try {
    const deletedStory = await Story.findOneAndDelete({ id })
    if (!deletedStory) return res.status(404).json({ error: 'Story not found' })
    res.json({ message: 'Story deleted' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error deleting story' })
  }
});

export default router;