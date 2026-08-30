import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  fullDescription: { type: String },
  tech: { type: String },
  emoji: { type: String, default: '🚀' },
  bgColor: { type: String, default: '#E1F5EE' },
  link: { type: String, default: '#' },
  year: { type: String },
  photos: { type: [String], default: [] }, 
}, { timestamps: true })

export default mongoose.model('Project', projectSchema)