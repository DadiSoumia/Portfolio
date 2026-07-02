import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp } from 'react-icons/fa'

export default function Footer() {
  const socialLinks = [
    { href: 'https://github.com/DadiSoumia', icon: <FaGithub />, color: '#f8f8f7', label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/dadi-soumia', icon: <FaLinkedin />, color: '#0A66C2', label: 'LinkedIn' },
    { href: 'mailto:soumiadadi17@gmail.com', icon: <FaEnvelope />, color: '#EA4335', label: 'Email' },
   { href: `https://wa.me/${import.meta.env.VITE_WHATSAPP}`, icon: <FaWhatsapp />, color: '#25D366', label: 'WhatsApp' },
  ]

  return (
    <footer style={{ backgroundColor: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>

      {/* Top glow line */}
      <div style={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(108,99,255,0.4), transparent)',
      }} />

      {/* Background orb */}
      <div style={{
        position: 'absolute', bottom: '-50%', left: '50%',
        transform: 'translateX(-50%)',
        width: '600px', height: '300px',
        background: 'radial-gradient(ellipse, rgba(108,99,255,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* CTA Section */}
      <div style={{
        padding: 'clamp(48px, 6vw, 80px) clamp(20px, 4vw, 40px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '24px',
        position: 'relative', zIndex: 1,
      }}>
        <p style={{
          fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
          color: '#6c63ff', fontWeight: '500',
        }}>
          Let's work together
        </p>
        <h2 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(28px, 5vw, 48px)',
          fontWeight: '500',
          color: '#f8f8f7',
          lineHeight: '1.2',
          maxWidth: '500px',
        }}>
          Let's Build Something Great  <em style={{ fontStyle: 'italic', color: '#a78bfa' }}>Together</em>
        </h2>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="mailto:soumiadadi17@gmail.com"
            style={{
              fontSize: '13px', fontWeight: '500', padding: '12px 24px',
              background: 'linear-gradient(135deg, #6c63ff, #a78bfa)',
              color: '#fff', borderRadius: '8px', textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(108,99,255,0.3)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(108,99,255,0.5)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(108,99,255,0.3)' }}
          >
            soumiadadi17@gmail.com ↗
          </a>
          <a href={`https://wa.me/${import.meta.env.VITE_WHATSAPP}`} target="_blank" rel="noopener noreferrer"
            style={{
              fontSize: '13px', fontWeight: '500', padding: '12px 24px',
              border: '1px solid rgba(37,211,102,0.3)',
              color: '#25D366', borderRadius: '8px', textDecoration: 'none',
              background: 'rgba(37,211,102,0.05)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(37,211,102,0.12)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(37,211,102,0.05)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            💬 WhatsApp
          </a>
        </div>
      </div>

      {/* Divider */}
      <div style={{
        height: '1px', margin: '0 clamp(20px, 4vw, 40px)',
        background: 'rgba(255,255,255,0.06)',
      }} />

      {/* Bottom bar */}
      <div style={{
        padding: '20px clamp(20px, 4vw, 40px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        position: 'relative', zIndex: 1,
      }}>
        <span style={{ fontSize: '11px', color: '#555368', letterSpacing: '0.04em' }}>
          © 2026 Dadi Soumia — Algérie
        </span>

        {/* Social icons */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {socialLinks.map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
              title={s.label}
              style={{
                color: '#555368', fontSize: '18px', display: 'flex',
                alignItems: 'center', transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = s.color; e.currentTarget.style.transform = 'translateY(-3px)' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#555368'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              {s.icon}
            </a>
          ))}
        </div>

        <span style={{ fontSize: '11px', color: '#555368', letterSpacing: '0.04em' }}>
          Disponible à distance
        </span>
      </div>
    </footer>
  )
}
