import { Router } from 'express';
import { Project } from '../models/Project';

const router = Router()

router.post('/', async (req, res) => {
  try {
    const project = new Project(req.body)
    await project.save()
    res.status(201).json(project)
  } catch (error) {
    console.error('Error creating project:', error)
    res.status(400).json({ error: 'Error creating project' })
  }
});

router.get('/', async (_req, res) => {
  try {
    const projects = await Project.find()
    res.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    res.status(500).json({ error: 'Error fetching projects' })
  }
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid project id' })

  try {
    const project = await Project.findOne({ id })
    if (!project) return res.status(404).json({ error: 'Project not found' })
    res.json(project)
  } catch (error) {
    console.error('Error fetching project:', error)
    res.status(500).json({ error: 'Error fetching project' })
  }
})

router.put('/:id', async (req, res) => {
  const id = Number(req.params.id)
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid project id' })

  try {
    const updatedProject = await Project.findOneAndUpdate({ id }, req.body, { new: true })
    if (!updatedProject) return res.status(404).json({ error: 'Project not found' })
    res.json(updatedProject)
  } catch (error) {
    console.error('Error updating project:', error)
    res.status(400).json({ error: 'Error updating project' })
  }
})

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid project id' })

  try {
    const deletedProject = await Project.findOneAndDelete({ id })
    if (!deletedProject) return res.status(404).json({ error: 'Project not found' })
    res.json({ message: 'Project deleted' })
  } catch (error) {
    console.error('Error deleting project:', error)
    res.status(500).json({ error: 'Error deleting project' })
  }
})

export default router;