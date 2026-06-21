interface SectionLabelProps {
  children: React.ReactNode;
  dot?: boolean;
}

export default function SectionLabel({ children, dot = false }: SectionLabelProps) {
  return (
    <div className="inline-flex items-center gap-2 mb-4">
      {dot && (
        <span
          className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0"
          aria-hidden="true"
        />
      )}
      <span
        className="text-xs font-semibold tracking-[0.15em] uppercase text-primary"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {children}
      </span>
    </div>
  );
}
