import { useState, useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import ProjectCard from '../components/ProjectCard'

function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

export default function Home() {
  const [projects, setProjects] = useState([])
  const [aboutRef, aboutInView] = useInView()
  const [projectsRef, projectsInView] = useInView()

  useEffect(() => {
    fetch((import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/projects')
      .then(res => res.json())
      .then(data => setProjects(Array.isArray(data) ? data : []))
      .catch(() => setProjects([]))
  }, [])

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      <Navbar />
      <Hero />

      {/* About Section */}
      <section ref={aboutRef} style={{
        padding: 'clamp(48px, 6vw, 80px) clamp(20px, 4vw, 40px)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '40px',
        alignItems: 'center',
        opacity: aboutInView ? 1 : 0,
        transform: aboutInView ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}>
        <div>
          <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6c63ff', marginBottom: '16px', fontWeight: '500' }}>
            About me
          </p>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(24px, 3.5vw, 36px)',
            fontWeight: '600', color: '#f8f8f7',
            lineHeight: '1.3', marginBottom: '16px',
          }}>
            Passionate about <em style={{ fontStyle: 'italic', color: '#a78bfa' }}>building</em> the future
          </h2>
          <p style={{ fontSize: '14px', color: '#888780', lineHeight: '1.8', maxWidth: '400px' }}>
           Full Stack Developer and Computer Vision student, passionate about building modern, scalable, and user-friendly websites.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {['React', 'Python', 'Node.js', 'Computer Vision', 'TensorFlow', 'OpenCV', 'MongoDB', 'Express'].map((skill, i) => (
            <span key={i} style={{
              fontSize: '12px', padding: '7px 14px',
              border: '1px solid rgba(108,99,255,0.2)',
              borderRadius: '100px', color: '#a8a6b0',
              background: 'rgba(108,99,255,0.05)',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.3s ease',
              cursor: 'default',
              opacity: aboutInView ? 1 : 0,
              transform: aboutInView ? 'translateY(0)' : 'translateY(16px)',
              transitionDelay: `${i * 0.05}s`,
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(108,99,255,0.5)'; e.currentTarget.style.color = '#f8f8f7'; e.currentTarget.style.background = 'rgba(108,99,255,0.12)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(108,99,255,0.2)'; e.currentTarget.style.color = '#a8a6b0'; e.currentTarget.style.background = 'rgba(108,99,255,0.05)' }}
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" ref={projectsRef} style={{
        padding: 'clamp(48px, 6vw, 80px) clamp(20px, 4vw, 40px)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        opacity: projectsInView ? 1 : 0,
        transform: projectsInView ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}>
        <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6c63ff', marginBottom: '12px', fontWeight: '500' }}>
          My works
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '12px' }}>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(26px, 4vw, 40px)',
            fontWeight: '600', color: '#f8f8f7',
          }}>
            Selected Projects
          </h2>
          {projects.length > 0 && (
            <span style={{ fontSize: '12px', color: '#555368', letterSpacing: '0.08em' }}>
              {String(projects.length).padStart(2, '0')} projects
            </span>
          )}
        </div>

        {projects.length === 0 ? (
          <div style={{
            padding: '60px 40px', textAlign: 'center',
            border: '1px dashed rgba(108,99,255,0.2)', borderRadius: '16px',
            background: 'rgba(108,99,255,0.02)',
          }}>
            <p style={{ fontSize: '14px', color: '#555368', marginBottom: '8px' }}>Projets en cours d'ajout...</p>
            <p style={{ fontSize: '12px', color: '#3d3b52' }}>Revenez bientôt ✨</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
            gap: '20px',
          }}>
            {projects.map((p, i) => (
              <div key={p._id} style={{
                opacity: projectsInView ? 1 : 0,
                transform: projectsInView ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
              }}>
                <ProjectCard project={p} />
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  )
}
