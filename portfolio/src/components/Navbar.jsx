import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleProjects = () => {
    if (location.pathname === '/') {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      setTimeout(() => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    }
  }

  const navLinkStyle = {
    fontSize: '12px',
    color: '#a8a6b0',
    textDecoration: 'none',
    cursor: 'pointer',
    position: 'relative',
    padding: '4px 0',
    transition: 'color 0.3s ease',
    letterSpacing: '0.04em',
  }

  return (
    <>
      {/* Scroll Progress Bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, zIndex: 100,
        height: '2px', width: `${scrollProgress}%`,
        background: 'linear-gradient(90deg, #6c63ff, #a78bfa)',
        transition: 'width 0.1s ease',
        boxShadow: '0 0 8px rgba(108,99,255,0.6)',
      }} />

      {/* Custom Cursor */}
      <style>{`
        * { cursor: none !important; }
        .custom-cursor {
          width: 10px; height: 10px;
          background: #6c63ff;
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: transform 0.1s ease;
          box-shadow: 0 0 12px rgba(108,99,255,0.8);
        }
        .custom-cursor-ring {
          width: 36px; height: 36px;
          border: 1px solid rgba(108,99,255,0.4);
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
          transition: all 0.15s ease;
        }
        .nav-link:hover { color: #f8f8f7 !important; }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 0; height: 1px;
          background: linear-gradient(90deg, #6c63ff, #a78bfa);
          transition: width 0.3s ease;
        }
        .nav-link:hover::after { width: 100%; }
        .nav-btn:hover {
          background: rgba(108,99,255,0.15) !important;
          border-color: #6c63ff !important;
          color: #a78bfa !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(108,99,255,0.2) !important;
        }
      `}</style>

      <CursorFollower />

      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '14px 40px',
        borderBottom: scrolled ? '1px solid rgba(108,99,255,0.15)' : '1px solid rgba(255,255,255,0.06)',
        backgroundColor: scrolled ? 'rgba(17,7,31,0.92)' : 'var(--bg-primary)',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        transition: 'all 0.3s ease',
      }}>
        <Link to="/" style={{
          fontSize: '15px', fontWeight: '600', color: '#f8f8f7',
          textDecoration: 'none', letterSpacing: '0.02em',
          background: 'linear-gradient(135deg, #f8f8f7, #a78bfa)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          Dadi Soumia
        </Link>

        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <Link to="/"
            className="nav-link"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={navLinkStyle}
          >Home</Link>

          <span className="nav-link" onClick={handleProjects} style={navLinkStyle}>
            Projects
          </span>

          <a href={`https://wa.me/${import.meta.env.VITE_WHATSAPP}`} target="_blank" rel="noopener noreferrer"
            className="nav-link" style={navLinkStyle}>
            Contact me
          </a>

          <a href="https://github.com/DadiSoumia" target="_blank" rel="noopener noreferrer"
            style={{ color: '#888780', fontSize: '16px', display: 'flex', alignItems: 'center', transition: 'color 0.3s' }}
            onMouseEnter={e => e.target.style.color = '#f8f8f7'}
            onMouseLeave={e => e.target.style.color = '#888780'}
          ><FaGithub /></a>

          <a href="https://www.linkedin.com/in/dadi-soumia" target="_blank" rel="noopener noreferrer"
            style={{ color: '#888780', fontSize: '16px', display: 'flex', alignItems: 'center', transition: 'color 0.3s' }}
            onMouseEnter={e => e.target.style.color = '#0A66C2'}
            onMouseLeave={e => e.target.style.color = '#888780'}
          ><FaLinkedin /></a>
        </div>
      </nav>
    </>
  )
}

function CursorFollower() {
  useEffect(() => {
    const dot = document.querySelector('.custom-cursor')
    const ring = document.querySelector('.custom-cursor-ring')
    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0

    const moveCursor = (e) => {
      mouseX = e.clientX; mouseY = e.clientY
      if (dot) { dot.style.left = mouseX + 'px'; dot.style.top = mouseY + 'px' }
    }

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      if (ring) { ring.style.left = ringX + 'px'; ring.style.top = ringY + 'px' }
      requestAnimationFrame(animateRing)
    }

    window.addEventListener('mousemove', moveCursor)
    animateRing()
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [])

  return (
    <>
      <div className="custom-cursor" />
      <div className="custom-cursor-ring" />
    </>
  )
}
