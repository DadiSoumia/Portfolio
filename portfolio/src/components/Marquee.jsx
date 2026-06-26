import { marqueeItems } from '../data/skills'

export default function Marquee() {
  const items = [...marqueeItems, ...marqueeItems]

  return (
    <div style={{ 
      borderTop: '1px solid #2e2e4e',
      borderBottom: '1px solid #2e2e4e',
      overflow: 'hidden', 
      padding: '12px 0',
      backgroundColor: '#1a1a2e',
    }}>
      <div style={{ animation: 'marquee 20s linear infinite', display: 'inline-flex', gap: '40px' }}>
        {items.map((item, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
            <span style={{ 
              fontSize: '11px', 
              letterSpacing: '0.18em', 
              textTransform: 'uppercase', 
              color: '#a8a69e',  
            }}>
              {item}
            </span>
            <span style={{ color: '#a8a69e' }}>·</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}