import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Contact() {
  const phone = import.meta.env.VITE_WHATSAPP // ton numéro avec indicatif Algérie sans +
  const whatsappMsg = encodeURIComponent("Bonjour Soumia, je vous contacte depuis votre portfolio.")

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      <Navbar />

      <main style={{ padding: '64px 40px', maxWidth: '600px' }}>
        <p style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#a8a69e', marginBottom: '16px' }}>
          Me contacter
        </p>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '42px', fontWeight: '700',  color: 'var(--text-primary)', marginBottom: '16px' }}>
          Travaillons <em style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>ensemble.</em>
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.75', marginBottom: '40px' }}>
          Choisissez comment vous souhaitez me contacter.
        </p>
        
/* Bouton Email */
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {/* Bouton Email */}
          <a
            href="mailto:soumiadadi17@gmail.com"
            style={btnStyle}
          >
            ✉️ Envoyer un email
          </a>

          {/* Bouton WhatsApp */}
          <a
            href={`https://wa.me/${phone}?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...btnStyle, backgroundColor: '#25D366', color: '#fff', borderColor: '#25D366' }}
          >
            💬 WhatsApp
          </a>
        </div>
      </main>

      <Footer />
    </div>
  )
}

const btnStyle = {
  fontSize: '14px',
  fontWeight: '600',
  padding: '14px 28px',
  border: '1px solid #888780',
  color: 'var(--text-primary)',
  borderRadius: '6px',
  textDecoration: 'none',
  display: 'inline-block',
  transition: 'opacity 0.2s',
}