import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Projects() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1a1a2e' }}>
      <Navbar />

      <main style={{ padding: '64px 40px' }}>
        <p style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#a8a69e', marginBottom: '16px' }}>
          Mes travaux
        </p>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '42px', fontWeight: '700', color: '#f8f8f7', marginBottom: '48px' }}>
          Projets
        </h1>

        {/* Projets à venir */}
        <p style={{ fontSize: '14px', color: '#888780' }}>
          Projets en cours d'ajout...
        </p>
      </main>

      <Footer />
    </div>
  )
}