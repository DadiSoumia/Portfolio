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

// --- Connexion MongoDB adaptée au serverless (Vercel) ---
// En serverless, chaque "cold start" peut arriver avant que la connexion
// précédente soit prête. On met en cache la promesse de connexion et on
// attend explicitement qu'elle soit résolue avant de traiter une requête,
// au lieu de laisser Mongoose "bufferiser" les requêtes jusqu'au timeout.
let cachedConnection = global._mongooseConn
if (!cachedConnection) {
  cachedConnection = global._mongooseConn = { conn: null, promise: null }
}

async function connectDB() {
  if (cachedConnection.conn) return cachedConnection.conn
  if (!cachedConnection.promise) {
    cachedConnection.promise = mongoose.connect(process.env.MONGO_URI).then((m) => {
      console.log('✅ MongoDB connecté')
      return m
    })
  }
  cachedConnection.conn = await cachedConnection.promise
  return cachedConnection.conn
}

// Toutes les routes attendent que la connexion soit prête avant de continuer
app.use(async (req, res, next) => {
  try {
    await connectDB()
    next()
  } catch (err) {
    console.error('❌ Erreur de connexion MongoDB:', err)
    res.status(503).json({ message: 'Base de données indisponible, réessaie dans quelques secondes.' })
  }
})

app.use('/api/projects', projectRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/upload', uploadRoutes)

// app.listen() n'est utile qu'en local : sur Vercel, l'app est utilisée
// directement comme fonction serverless (voir api/index.js), donc on ne
// démarre un vrai serveur que si on n'est PAS sur Vercel.
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`))
}

export default app