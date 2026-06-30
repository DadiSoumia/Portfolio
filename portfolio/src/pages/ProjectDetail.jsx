import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function ProjectDetail() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [touchStart, setTouchStart] = useState(0)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/projects/${id}`)
      .then(res => res.json())
      .then(data => {
        setProject(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  const goNext = (e) => {
    e?.stopPropagation()
    setSelectedIndex(i => (i + 1) % project.photos.length)
  }

  const goPrev = (e) => {
    e?.stopPropagation()
    setSelectedIndex(i => (i - 1 + project.photos.length) % project.photos.length)
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#888780' }}>Chargement...</p>
    </div>
  )

  if (!project) return (
    <div style={{ minHeight: '100vh',backgroundColor: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: '#888780', marginBottom: '16px' }}>Projet introuvable.</p>
        <Link to="/" style={{ color: '#f8f8f7', textDecoration: 'underline' }}>← Retour à l'accueil</Link>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh',backgroundColor: 'var(--bg-primary)' }}>
      <Navbar />

      <main style={{ padding: '40px 20px', maxWidth: '700px', margin: '0 auto' }}>
        <Link 
          to="/" 
          onClick={() => setTimeout(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }), 100)} 
          style={{ fontSize: '12px', color: '#888780', textDecoration: 'none', display: 'inline-block', marginBottom: '28px' }}
        >
          ← Retour
        </Link>

        {/* Titre */}
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: '700', color: '#f8f8f7', marginBottom: '12px' }}>
          {project.name}
        </h1>

        {/* Tech + année */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
          {project.tech && project.tech.split(',').map((t, i) => (
            <span key={i} style={{ fontSize: '11px', padding: '3px 10px', border: '1px solid #333', borderRadius: '20px', color: '#a8a69e' }}>
              {t.trim()}
            </span>
          ))}
          {project.year && <span style={{ fontSize: '11px', color: '#888780' }}>{project.year}</span>}
        </div>

        {/* Description */}
        <p style={{ fontSize: '14px', color: '#888780', lineHeight: '1.8', marginBottom: '32px' }}>
          {project.fullDescription || project.description}
        </p>

        {/* Galerie horizontale */}
        {project.photos && project.photos.length > 0 && (
          <>
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginBottom: '32px', paddingBottom: '8px', scrollbarWidth: 'none' }}>
              {project.photos.map((photo, i) => (
                <img
                  key={i}
                  src={photo}
                  alt={project.name}
                  onClick={() => setSelectedIndex(i)}
                  style={{
                    height: 'clamp(150px, 30vw, 280px)',
                    width: 'auto',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    flexShrink: 0,
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => e.target.style.opacity = '0.8'}
                  onMouseLeave={e => e.target.style.opacity = '1'}
                />
              ))}
            </div>

            {/* Lightbox avec navigation + swipe */}
            {selectedIndex !== null && (
              <div
                onClick={() => setSelectedIndex(null)}
                onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
                onTouchEnd={(e) => {
                  const diff = touchStart - e.changedTouches[0].clientX
                  if (diff > 50) goNext()
                  else if (diff < -50) goPrev()
                }}
                style={{
                  position: 'fixed', inset: 0,
                  backgroundColor: 'rgba(0,0,0,0.95)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  zIndex: 1000, cursor: 'pointer'
                }}
              >
                {/* Bouton précédent */}
                {project.photos.length > 1 && (
                  <button onClick={goPrev} style={{
                    position: 'absolute', left: '16px',
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    border: 'none', color: '#fff',
                    fontSize: '24px', width: '44px', height: '44px',
                    borderRadius: '50%', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>‹</button>
                )}

                {/* Image */}
                <img
                  src={project.photos[selectedIndex]}
                  alt=""
                  onClick={e => e.stopPropagation()}
                  style={{ maxWidth: '90vw', maxHeight: '85vh', borderRadius: '8px', objectFit: 'contain' }}
                />

                {/* Bouton suivant */}
                {project.photos.length > 1 && (
                  <button onClick={goNext} style={{
                    position: 'absolute', right: '16px',
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    border: 'none', color: '#fff',
                    fontSize: '24px', width: '44px', height: '44px',
                    borderRadius: '50%', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>›</button>
                )}

                {/* Compteur */}
                <div style={{
                  position: 'absolute', bottom: '20px',
                  color: '#fff', fontSize: '13px',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  padding: '4px 12px', borderRadius: '20px'
                }}>
                  {selectedIndex + 1} / {project.photos.length}
                </div>

                {/* Fermer */}
                <button onClick={() => setSelectedIndex(null)} style={{
                  position: 'absolute', top: '16px', right: '16px',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  border: 'none', color: '#fff',
                  fontSize: '18px', width: '36px', height: '36px',
                  borderRadius: '50%', cursor: 'pointer'
                }}>✕</button>
              </div>
            )}
          </>
        )}

        {/* Lien projet */}
        {project.link && project.link !== '#' && (
          <a href={project.link} target="_blank" rel="noreferrer" style={{ fontSize: '13px', fontWeight: '600', padding: '10px 20px', border: '1px solid #888780', borderRadius: '6px', color: '#f8f8f7', textDecoration: 'none', display: 'inline-block' }}>
            Voir le projet ↗
          </a>
        )}
      </main>

      <Footer />
    </div>
  )
}