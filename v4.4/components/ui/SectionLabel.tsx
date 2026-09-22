interface SectionLabelProps {
  label: string
  className?: string
}

export default function SectionLabel({ label, className = '' }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-4 reveal ${className}`}>
      <div className="w-8 h-px bg-gold-DEFAULT" aria-hidden="true" />
      <span className="text-label text-gold-DEFAULT">{label}</span>
    </div>
  )
}
