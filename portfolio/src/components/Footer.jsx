import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

export default function Footer() {
  return (
    <div style={{ backgroundColor: '#1a1a2e' }}>
      
      {/* Section contact */}
      <div style={{
        padding: '48px 40px',
        borderTop: '1px solid #2e2e4e',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <p style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '32px',
          fontWeight: '500',
          color: '#f8f8f7',
        }}>
          Travaillons <em style={{ fontStyle: 'italic', color: '#888780' }}>ensemble.</em>
        </p>

        {/* Boutons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <a href="mailto:soumiadadi17@gmail.com" style={{
            fontSize: '13px', fontWeight: '500', padding: '11px 22px',
            border: '1px solid #888780', borderRadius: '7px',
            color: '#f8f8f7', textDecoration: 'none',
          }}>
            soumiadadi17@gmail.com ↗
          </a>
          <a href="https://wa.me/213559174223" target="_blank" style={{
            fontSize: '13px', fontWeight: '500', padding: '11px 22px',
            border: '1px solid #2e2e4e', borderRadius: '7px',
            color: '#888780', textDecoration: 'none',
          }}>
            💬 WhatsApp
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div style={{
        padding: '14px 40px',
        borderTop: '1px solid #2e2e4e',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{ fontSize: '11px', color: '#888780' }}>© 2026 Dadi Soumia</span>

       {/* Liens sociaux */}
<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
  <a href="https://github.com/DadiSoumia" target="_blank" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '22px' }}>
    <FaGithub />
  </a>
  <a href="https://www.linkedin.com/in/dadi-soumia" target="_blank" style={{ color: '#0A66C2', textDecoration: 'none', fontSize: '22px' }}>
    <FaLinkedin />
  </a>
  <a href="mailto:soumiadadi17@gmail.com" style={{ color: '#EA4335', textDecoration: 'none', fontSize: '22px' }}>
    <FaEnvelope />
  </a>
</div>

        <span style={{ fontSize: '11px', color: '#888780' }}>Algérie — Disponible à distance</span>
      </div>

    </div>
  )
}