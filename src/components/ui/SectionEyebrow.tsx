type Props = {
  index: string; // e.g. "01"
  label: string;
};

export default function SectionEyebrow({ index, label }: Props) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="font-mono-stack text-xs text-signal-orange">{index}</span>
      <span className="h-px w-10 bg-surface-border" />
      <span className="font-mono-stack text-xs uppercase tracking-[0.2em] text-paper-dim">
        {label}
      </span>
    </div>
  );
}
