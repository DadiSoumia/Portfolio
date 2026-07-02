import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router()

// ✅ CORRECT — depuis .env
const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (email !== ADMIN_EMAIL) {
    return res.status(401).json({ message: 'Email incorrect' })
  }

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Mot de passe incorrect' })
  }

  const token = jwt.sign(
    { email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  )

  res.json({ token, message: 'Connexion réussie ✅' })
})

export default router