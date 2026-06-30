import { Link } from 'react-router-dom'

export default function ProjectCard({ project }) {
  return (
    <Link 
      to={`/project/${project._id}`} 
      style={{ 
        textDecoration: 'none', 
        display: 'block', 
        backgroundColor: 'var(--bg-secondary)', 
        borderRadius: '12px', 
        overflow: 'hidden', 
        transition: 'transform 0.2s',
        height: '100%'
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      {/* Titre + description en haut */}
      <div style={{ padding: '16px 16px 12px 16px' }}>
        <h2 style={{ fontSize: 'clamp(16px, 3vw, 20px)', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px', fontFamily: 'Playfair Display, serif' }}>
          {project.name}
        </h2>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {project.description}
        </p>
      </div>

      {/* Photos en dessous */}
     {/* Photos en dessous */}
{project.photos && project.photos.length > 0 && (
  <div style={{ 
    display: 'grid', 
    gridTemplateColumns: project.photos.length === 1 ? '1fr' : '1fr 1fr', 
    gap: '2px', 
    height: '160px',
    overflow: 'hidden',
    margin: '0 12px',
    borderRadius: '8px',
  }}>
    {project.photos.slice(0, 2).map((photo, i) => (
      <img key={i} src={photo} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    ))}
  </div>
)}

      {/* Tech + flèche */}
      <div style={{ padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{project.tech}</span>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>↗</span>
      </div>
    </Link>
  )
}