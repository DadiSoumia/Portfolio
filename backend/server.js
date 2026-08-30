import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import projectRoutes from './routes/projectRoutes.js'
import authRoutes from './routes/authRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()

const app = express()

app.use(cors({
  origin: ['https://soumiadadi.vercel.app', 'http://localhost:5173'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

app.use(express.json())

app.use('/api/projects', projectRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/upload', uploadRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connecté'))
  .catch((err) => console.log(' Erreur MongoDB:', err))

// app.listen() n'est utile qu'en local : sur Vercel, l'app est utilisée
// directement comme fonction serverless (voir api/index.js), donc on ne
// démarre un vrai serveur que si on n'est PAS sur Vercel.
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`))
}

export default app