import express from 'express'
import { upload } from '../config/cloudinary.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

// Upload plusieurs photos
router.post('/', authMiddleware, upload.array('photos', 20), async (req, res) => {
  try {
    const urls = req.files.map(file => file.path)
    res.json({ urls })
  } catch (err) {
    res.status(500).json({ message: 'Erreur upload' })
  }
})

export default router
