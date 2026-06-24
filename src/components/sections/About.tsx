"use client";

import Image from "next/image";
import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { profile } from "@/data/profile";

export default function About() {
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <section id="about" className="py-24 px-6 max-w-6xl mx-auto">
      <ScrollReveal>
        <SectionEyebrow index="01" label="About" />
      </ScrollReveal>

      <div className="grid md:grid-cols-[1fr_1.4fr] gap-12 items-start">
        <ScrollReveal delay={0.1}>
          <div className="relative w-full max-w-xs aspect-square rounded-lg border border-surface-border bg-surface flex items-center justify-center overflow-hidden">
            {!photoFailed ? (
              <Image
                src="/profile.png"
                alt={profile.name}
                fill
                sizes="320px"
                className="object-cover"
                onError={() => setPhotoFailed(true)}
              />
            ) : (
              // Shown until a real photo is added at /public/profile.jpg
              <span className="font-display text-6xl text-paper-dim/40">AS</span>
            )}
            <div className="absolute inset-0 border border-signal-orange/20 rounded-lg" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2} className="space-y-6">
          <h2 className="font-display text-3xl sm:text-4xl text-paper font-semibold text-balance">
            Building things that have to work in real time.
          </h2>
          <p className="text-paper-dim leading-relaxed">{profile.about.summary}</p>
          <p className="text-paper-dim leading-relaxed">{profile.about.story}</p>
        </ScrollReveal>
      </div>
    </section>
  );
}
