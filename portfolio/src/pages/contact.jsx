import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Contact() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1a1a2e' }}>
      <Navbar />

      <main style={{ padding: '64px 40px', maxWidth: '600px' }}>
        <p style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#a8a69e', marginBottom: '16px' }}>
          Me contacter
        </p>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '42px', fontWeight: '700', color: '#f8f8f7', marginBottom: '16px' }}>
          Travaillons <em style={{ fontStyle: 'italic', color: '#888780' }}>ensemble.</em>
        </h1>
        <p style={{ fontSize: '14px', color: '#888780', lineHeight: '1.75', marginBottom: '40px' }}>
          Envoyez-moi un email ou connectez-vous sur LinkedIn.
        </p>

        <a href="mailto:soumiadadi17@gmail.com" style={{
          fontSize: '13px', fontWeight: '500', padding: '12px 24px',
          border: '1px solid #888780', color: '#f8f8f7',
          borderRadius: '6px', textDecoration: 'none',
          display: 'inline-block',
        }}>
          soumiadadi17@gmail.com ↗
        </a>
      </main>

      <Footer />
    </div>
  )
}