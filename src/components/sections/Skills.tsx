"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { profile } from "@/data/profile";

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 max-w-6xl mx-auto">
      <ScrollReveal>
        <SectionEyebrow index="02" label="Skills" />
        <h2 className="font-display text-3xl sm:text-4xl text-paper font-semibold mb-12">
          Stack & tooling
        </h2>
      </ScrollReveal>

      <div className="grid sm:grid-cols-2 gap-8">
        {profile.skills.map((category, ci) => (
          <ScrollReveal key={category.category} delay={ci * 0.08}>
            <div className="rounded-lg border border-surface-border bg-surface p-6">
              <h3 className="font-mono-stack text-xs uppercase tracking-widest text-signal-blue mb-5">
                {category.category}
              </h3>
              <ul className="space-y-4">
                {category.items.map((skill) => (
                  <li key={skill.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-paper">{skill.name}</span>
                      <span className="font-mono-stack text-xs text-paper-dim">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-ink-raised overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full bg-gradient-to-r from-signal-orange to-signal-blue"
                      />
                    </div>
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
