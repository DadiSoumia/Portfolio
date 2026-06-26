import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 40px',
      borderBottom: '1px solid #2e2e4e',
      backgroundColor: '#1a1a2e',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <Link to="/" style={{ fontSize: '15px', fontWeight: '500', color: '#f8f8f7', textDecoration: 'none' }}>
        Dadi Soumia
      </Link>

     <div style={{ display: 'flex', gap: '48px', alignItems: 'center' }}>
       <a href="#" 
   onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
   style={{ fontSize: '13px', color: '#888780', textDecoration: 'none', cursor: 'pointer' }}>
  Home
</a>
        <a href="#projects" style={{ fontSize: '13px', color: '#888780', textDecoration: 'none' }}>
          Projects
        </a>
       <a href="https://wa.me/213559174223" 
   target="_blank"
   style={{ fontSize: '13px', color: '#888780', textDecoration: 'none' }}>
  Contact me
</a>
      </div>
    </nav>
  )
}