import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { profile } from "@/data/profile";

export default function Education() {
  return (
    <section id="education" className="py-24 px-6 max-w-6xl mx-auto">
      <ScrollReveal>
        <SectionEyebrow index="05" label="Education" />
        <h2 className="font-display text-3xl sm:text-4xl text-paper font-semibold mb-12">
          Academic background
        </h2>
      </ScrollReveal>

      <div className="grid sm:grid-cols-2 gap-6">
        {profile.education.map((edu, i) => (
          <ScrollReveal key={edu.institution} delay={i * 0.1}>
            <div className="rounded-lg border border-surface-border bg-surface p-6 h-full">
              <p className="font-mono-stack text-xs text-paper-dim mb-2">
                {edu.start} — {edu.end}
              </p>
              <h3 className="font-display text-lg text-paper font-semibold mb-1">
                {edu.credential}
              </h3>
              <p className="text-signal-blue text-sm mb-3">{edu.institution}</p>
              <p className="text-paper-dim text-xs mb-2">{edu.location}</p>
              {edu.focus && (
                <p className="text-paper-dim text-sm leading-relaxed">{edu.focus}</p>
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>

      {profile.achievements.length > 0 && (
        <ScrollReveal delay={0.2} className="mt-10">
          <div className="rounded-lg border border-surface-border bg-ink-raised p-6">
            <h3 className="font-mono-stack text-xs uppercase tracking-widest text-signal-orange mb-4">
              Notes
            </h3>
            <ul className="space-y-2">
              {profile.achievements.map((a) => (
                <li key={a} className="text-sm text-paper-dim flex gap-2">
                  <span className="text-signal-blue mt-0.5">▸</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      )}
    </section>
  );
}
