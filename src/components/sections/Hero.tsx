"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, Mail } from "lucide-react";
import HeroBackground from "@/components/three/HeroBackground";
import { profile } from "@/data/profile";

function useTypedLines(lines: readonly string[], speed = 22, lineDelay = 280) {
  const [renderedLines, setRenderedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const typeChar = () => {
      const line = lines[lineIndex];
      if (charIndex <= line.length) {
        setCurrentLine(line.slice(0, charIndex));
        charIndex++;
        timeoutId = setTimeout(typeChar, speed);
      } else {
        setRenderedLines((prev) => [...prev, line]);
        setCurrentLine("");
        lineIndex++;
        charIndex = 0;
        if (lineIndex < lines.length) {
          timeoutId = setTimeout(typeChar, lineDelay);
        } else {
          setDone(true);
        }
      }
    };

    timeoutId = setTimeout(typeChar, 400);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { renderedLines, currentLine, done };
}

export default function Hero() {
  const { renderedLines, currentLine, done } = useTypedLines(profile.heroLines);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      <HeroBackground />

      <div className="relative z-10 max-w-3xl w-full">
        <div className="font-mono-stack text-sm sm:text-base leading-relaxed bg-ink-raised/60 backdrop-blur-sm border border-surface-border rounded-lg p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-surface-border">
            <span className="w-2.5 h-2.5 rounded-full bg-signal-orange" style={{ animation: "pulse-glow 2s ease-in-out infinite" }} />
            <span className="w-2.5 h-2.5 rounded-full bg-signal-blue/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-paper-dim/30" />
            <span className="ml-auto text-paper-dim text-xs">session.log</span>
          </div>
          {renderedLines.map((line, i) => (
            <div key={i} className={line.startsWith(">") ? "text-paper-dim" : "text-signal-orange"}>
              {line || "\u00A0"}
            </div>
          ))}
          <div className={currentLine.startsWith(">") ? "text-paper-dim" : "text-signal-orange"}>
            {currentLine}
            <span className="inline-block w-2 h-4 bg-signal-orange ml-0.5 align-middle" style={{ animation: "pulse-glow 1s step-end infinite" }} />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: done ? 1 : 0, y: done ? 0 : 16 }}
          transition={{ duration: 0.5 }}
          className="mt-8 text-center"
        >
          <h1 className="font-display font-bold text-4xl sm:text-6xl text-paper tracking-tight text-balance">
            {profile.name}
          </h1>
          <p className="mt-3 font-mono-stack text-signal-blue text-sm sm:text-base tracking-wide">
            {profile.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#projects"
              data-cursor="link"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-signal-orange text-ink font-medium text-sm hover:bg-signal-orange/90 transition-colors"
            >
              View Projects <ArrowDown size={16} />
            </a>
            <a
              href={profile.resumeFile}
              download
              data-cursor="link"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-surface-border text-paper font-medium text-sm hover:border-signal-blue hover:text-signal-blue transition-colors"
            >
              Download Resume <Download size={16} />
            </a>
            <a
              href="#contact"
              data-cursor="link"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-paper-dim font-medium text-sm hover:text-paper transition-colors"
            >
              Contact Me <Mail size={16} />
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-paper-dim"
      >
        <ArrowDown size={20} />
      </motion.div>
    </section>
  );
}
