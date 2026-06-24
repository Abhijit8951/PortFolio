import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { profile } from "@/data/profile";

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 max-w-6xl mx-auto">
      <ScrollReveal>
        <SectionEyebrow index="04" label="Experience" />
        <h2 className="font-display text-3xl sm:text-4xl text-paper font-semibold mb-12">
          Where I&apos;ve worked
        </h2>
      </ScrollReveal>

      <div className="relative border-l border-surface-border pl-8 space-y-10 max-w-2xl">
        {profile.experience.map((item, i) => (
          <ScrollReveal key={item.org} delay={i * 0.1}>
            <div className="relative">
              <span className="absolute -left-[37px] top-1.5 w-3 h-3 rounded-full bg-signal-orange border-2 border-ink" />
              <p className="font-mono-stack text-xs text-paper-dim mb-1">
                {item.start} — {item.end}
              </p>
              <h3 className="font-display text-lg text-paper font-semibold">{item.role}</h3>
              <p className="text-signal-blue text-sm mb-3">
                {item.org} · {item.location}
              </p>
              <ul className="space-y-1.5">
                {item.bullets.map((b) => (
                  <li key={b} className="text-sm text-paper-dim flex gap-2">
                    <span className="text-signal-orange mt-0.5">▸</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
