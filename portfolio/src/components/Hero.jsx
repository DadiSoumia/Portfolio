import { useEffect, useRef, useState } from 'react'

const technologies = [
  { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'OpenCV', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
]

const roles = ['Full Stack Developer', 'Computer Vision Engineer', 'AI Solutions Builder', 'React Developer']

export default function Hero() {
  const containerRef = useRef(null)
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)
  const [visible, setVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
  }, [])

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const currentRole = roles[roleIndex]
    let timeout
    if (typing) {
      if (displayed.length < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayed(currentRole.slice(0, displayed.length + 1))
        }, 60)
      } else {
        timeout = setTimeout(() => setTyping(false), 1800)
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1))
        }, 35)
      } else {
        timeout = setTimeout(() => {
          setRoleIndex((i) => (i + 1) % roles.length)
          setTyping(true)
        }, 100)
      }
    }
    return () => clearTimeout(timeout)
  }, [displayed, typing, roleIndex])

  useEffect(() => {
    let angle = 0
    let animId
    const animate = () => {
      angle += 0.004
      const container = containerRef.current
      if (!container) return
      const size = container.offsetWidth
      const radius = size * 0.38
      container.querySelectorAll('.tech-icon').forEach((icon, i) => {
        const a = angle + (i * (2 * Math.PI / technologies.length))
        icon.style.transform = `translate(${Math.cos(a) * radius}px, ${Math.sin(a) * radius}px)`
      })
      animId = requestAnimationFrame(animate)
    }
    animId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <section style={{
      padding: 'clamp(40px, 6vw, 80px) clamp(20px, 4vw, 40px)',
      backgroundColor: 'var(--bg-primary)',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '32px',
      overflow: 'hidden',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(24px)',
      transition: 'opacity 0.8s ease, transform 0.8s ease',
      minHeight: isMobile ? 'auto' : 'calc(100vh - 60px)',
      position: 'relative',
    }}>

      {/* Background gradient orbs */}
      <div style={{
        position: 'absolute', top: '-20%', left: '-10%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(108,99,255,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-20%', right: '-10%',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Left — text */}
      <div style={{
        flex: '1',
        minWidth: '200px',
        maxWidth: isMobile ? '100%' : '55%',
        position: 'relative',
        zIndex: 2,
        textAlign: isMobile ? 'center' : 'left',
      }}>

        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '6px 14px', marginBottom: '24px',
          border: '1px solid rgba(108,99,255,0.3)',
          borderRadius: '100px',
          background: 'rgba(108,99,255,0.08)',
          backdropFilter: 'blur(10px)',
        }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 6px #4ade80', display: 'inline-block' }} />
          <span style={{ fontSize: '11px', color: '#a78bfa', letterSpacing: '0.08em', fontWeight: '500' }}>
            Available for Internship
          </span>
        </div>

        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(28px, 4.5vw, 52px)',
          fontWeight: '700',
          lineHeight: '1.15',
          color: '#f8f8f7',
          marginBottom: '12px',
        }}>
          Hi, I'm Soumia
        </h1>

        {/* Typewriter */}
        <div style={{ marginBottom: '20px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: isMobile ? 'center' : 'flex-start' }}>
          <span style={{ fontSize: 'clamp(13px, 2vw, 17px)', color: '#a78bfa', fontWeight: '500', letterSpacing: '0.02em' }}>
            {displayed}
            <span style={{ animation: 'blink 1s infinite', color: '#6c63ff' }}>|</span>
          </span>
        </div>

        <p style={{
          fontSize: 'clamp(12px, 1.4vw, 14px)',
          color: '#888780',
          lineHeight: '1.8',
          marginBottom: '28px',
          maxWidth: isMobile ? '100%' : '420px',
          margin: isMobile ? '0 auto 28px auto' : '0 0 28px 0',
        }}>
          I develop custom, modern, and high-performance websites, with a strong focus on clean code, security, and exceptional user experience.
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: isMobile ? 'center' : 'flex-start' }}>
          <a href="#projects" style={{
            fontSize: '12px', fontWeight: '600', padding: '10px 22px',
            background: 'linear-gradient(135deg, #6c63ff, #a78bfa)',
            color: '#fff', borderRadius: '8px', textDecoration: 'none',
            boxShadow: '0 4px 20px rgba(108,99,255,0.3)',
            transition: 'all 0.3s ease', letterSpacing: '0.03em',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(108,99,255,0.5)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(108,99,255,0.3)' }}
          >
            View Projects →
          </a>
          <a href="/cv.pdf" style={{
            fontSize: '12px', fontWeight: '500', padding: '10px 22px',
            border: '1px solid rgba(255,255,255,0.12)',
            color: '#c4c2cc', borderRadius: '8px', textDecoration: 'none',
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(108,99,255,0.4)'; e.currentTarget.style.color = '#f8f8f7'; e.currentTarget.style.background = 'rgba(108,99,255,0.08)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#c4c2cc'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
          >
            Download CV ↓
          </a>
        </div>
      </div>

      {/* Right — orbit */}
      <div ref={containerRef} style={{
        position: 'relative',
        width: isMobile ? '240px' : 'clamp(200px, 40vw, 320px)',
        height: isMobile ? '240px' : 'clamp(200px, 40vw, 320px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, zIndex: 2,
        margin: isMobile ? '0 auto' : '0',
      }}>
        {[80, 60, 40].map((size, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: `${size}%`, height: `${size}%`,
            borderRadius: '50%',
            border: `1px solid rgba(108,99,255,${0.04 + i * 0.03})`,
          }} />
        ))}

        <div style={{
          width: 'clamp(55px, 10vw, 75px)',
          height: 'clamp(55px, 10vw, 75px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(108,99,255,0.9) 0%, rgba(108,99,255,0.2) 60%, transparent 100%)',
          boxShadow: '0 0 50px rgba(108,99,255,0.7), 0 0 100px rgba(108,99,255,0.2)',
          zIndex: 2,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 'clamp(18px, 3vw, 26px)' }}>👩‍💻</span>
        </div>

        {technologies.map((tech, i) => (
          <div key={i} className="tech-icon" title={tech.name} style={{
            position: 'absolute',
            width: isMobile ? '36px' : 'clamp(32px, 4.5vw, 44px)',
            height: isMobile ? '36px' : 'clamp(32px, 4.5vw, 44px)',
            borderRadius: '50%',
            background: 'rgba(26,13,46,0.9)',
            border: '1px solid rgba(108,99,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 3,
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
          }}>
            <img src={tech.icon} alt={tech.name} style={{ width: '58%', height: '58%' }} />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1 } 50% { opacity: 0 } }
      `}</style>
    </section>
  )
}