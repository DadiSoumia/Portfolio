import { useParams, Link } from 'react-router-dom'
import { projects } from '../data/projects'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function ProjectDetail() {
  const { id } = useParams()
  const project = projects.find((p) => p.id === id)

  if (!project) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted mb-4">Projet introuvable.</p>
          <Link to="/" className="text-ink underline underline-offset-4">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <main className="px-10 py-16 max-w-3xl mx-auto">
        <Link to="/" className="text-[12px] text-hint hover:text-ink transition-colors mb-10 inline-block">
          ← Retour
        </Link>

        <div
          className="w-full h-64 rounded-xl mb-10 flex items-center justify-center text-6xl"
          style={{ backgroundColor: project.bgColor }}
        >
          {project.emoji}
        </div>

        <p className="text-[11px] tracking-widest uppercase text-hint mb-3">
          {project.tag}
        </p>
        <h1 className="font-serif text-[38px] font-medium text-ink mb-4">
          {project.name}
        </h1>
        <p className="text-[15px] text-muted leading-[1.75] mb-8">
          {project.fullDescription}
        </p>

        <div className="flex gap-2 flex-wrap mb-10">
          {project.tech.split(' · ').map((t) => (
            <span key={t} className="text-[11px] px-3 py-1.5 border border-border rounded-full text-muted">
              {t}
            </span>
          ))}
        </div>

        {project.link && project.link !== '#' && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="text-[13px] font-medium px-6 py-3 border border-muted rounded-md text-ink hover:bg-ink hover:text-cream transition-all inline-block"
          >
            Voir le projet ↗
          </a>
        )}
      </main>

      <Footer />
    </div>
  )
}