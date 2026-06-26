import { skills } from '../data/skills'

export default function About() {
  return (
    <section id="about" className="px-10 py-14 border-t border-border grid grid-cols-1 md:grid-cols-[120px_1fr] gap-10 items-start">
      <span className="text-[10px] tracking-widest uppercase text-hint pt-1">
        À propos
      </span>

      <div>
        <p className="font-serif text-[20px] font-normal leading-[1.65] text-ink">
          Étudiante en <em className="italic text-muted">Computer Vision</em> et développeuse Full Stack — je combine l'intelligence artificielle et le développement web pour créer des solutions innovantes.
        </p>

        <div className="flex flex-wrap gap-2 mt-6">
          {skills.map((skill) => (
            <span
              key={skill}
              className="text-[11px] tracking-wide px-3 py-1.5 border border-border rounded-full text-muted hover:border-muted transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}