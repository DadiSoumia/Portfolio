 


export default function Hero() {
  return (
    <section id="home" style={{
      padding: '64px 40px',
      borderBottom: '1px solid #d4d2c8',
      display: 'grid',
      gridTemplateColumns: '2fr 1fr', 
      gap: '40px',
      alignItems: 'center',
      backgroundColor: '#1a1a2e',
    }}>

      {/* Gauche — titre + description */}
      <div>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '35px', fontWeight: '700', lineHeight: '1.2', color: '#f8f8f7' }}>
          Hi, I'm Soumia 
        </h1>
        <p style={{ fontSize: '16px', color: '#888780', lineHeight: '1.75', marginTop: '16px', fontStyle: 'italic' }}>
          Full Stack Developer & Computer Vision student. I build intelligent web applications, <br />
          AI-powered solutions, and computer vision systems.
        </p>
      </div>

      {/* Droite — stats + boutons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Stats */}
        <div style={{ display: 'flex', gap: '32px' }}>
          <div>
            <div style={{ fontSize: '28px', fontWeight: '500', color: '#ededeb' }}>AI</div>
            <div style={{ fontSize: '11px', color: '#a8a69e', marginTop: '4px' }}>Computer Vision</div>
          </div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: '500', color: '#f7f7f2' }}>Full</div>
            <div style={{ fontSize: '11px', color: '#a8a69e', marginTop: '4px' }}>Stack Dev</div>
          </div>
        </div>

        {/* Boutons */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <a href="#projets" style={{
            fontSize: '13px', fontWeight: '500', padding: '10px 20px',
            backgroundColor: '#fdfdfc', color: '#0e0e03',
            borderRadius: '6px', textDecoration: 'none',
          }}>
            Voir mes projets
          </a>
          <a href="/cv.pdf" style={{
            fontSize: '13px', fontWeight: '500', padding: '10px 20px',
            backgroundColor: '#fdfdfc', color: '#0e0e03',
            borderRadius: '6px', textDecoration: 'none',
          }}>
            Télécharger CV ↓
          </a>
        </div>
      </div>

    </section>
  )
}
