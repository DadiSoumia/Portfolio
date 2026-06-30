import express from 'express'
import Project from '../models/Project.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

// GET — récupérer tous les projets
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find()
    res.json(projects)
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    if (!project) return res.status(404).json({ message: 'Projet introuvable' })
    res.json(project)
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
})
// POST — ajouter un projet (admin seulement)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const project = new Project(req.body)
    await project.save()
    res.status(201).json(project)
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

// PUT — modifier un projet (admin seulement)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(project)
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

// DELETE — supprimer un projet (admin seulement)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id)
    res.json({ message: 'Projet supprimé ' })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

export default router