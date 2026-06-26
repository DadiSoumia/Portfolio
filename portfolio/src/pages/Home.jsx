import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1a1a2e' }}>
      <Navbar />
      <Hero />
      <Marquee />

      {/* Section Projets */}
      <section id="projects" style={{ padding: '64px 40px' }}>
        <p style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#a8a69e', marginBottom: '16px' }}>
          Mes travaux
        </p>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '42px', fontWeight: '700', color: '#f8f8f7', marginBottom: '48px' }}>
          Projets
        </h2>
        <p style={{ fontSize: '14px', color: '#888780' }}>
          Projets en cours d'ajout...
        </p>
      </section>

      <Footer />
    </div>
  )
}