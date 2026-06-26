export default function Contact() {
  return (
    <section id="contact" className="px-10 py-12 border-t border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <p className="font-serif text-[30px] md:text-[36px] font-medium text-ink leading-tight">
        Travaillons <em className="italic text-muted">ensemble.</em>
      </p>

      <a 
        href="mailto:soumiadadi17@gmail.com"
        className="text-[13px] font-medium px-6 py-3 border border-muted rounded-md text-ink hover:bg-ink hover:text-cream hover:border-ink transition-all"
      >
        soumiadadi17@gmail.com ↗
      </a>
    </section>
  )
}