import { Link } from 'react-router-dom'

export default function ProjectCard({ project }) {
  return (
    <Link to={`/project/${project.id}`} className="block p-7 hover:bg-stone-50 transition-colors group">
      <p className="text-[10px] tracking-widest uppercase text-hint mb-4">
        {project.tag}
      </p>

      <div
        className="w-full h-24 rounded-lg mb-4 flex items-center justify-center text-3xl"
        style={{ backgroundColor: project.bgColor }}
      >
        {project.emoji}
      </div>

      <p className="text-[15px] font-medium text-ink mb-1.5">{project.name}</p>
      <p className="text-[12px] text-muted leading-[1.55]">{project.description}</p>

      <div className="flex justify-between items-center mt-4">
        <span className="text-[11px] text-hint">{project.tech}</span>
        <span className="text-[15px] text-hint group-hover:text-ink transition-colors">↗</span>
      </div>
    </Link>
  )
}