"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/data/profile";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group rounded-lg border border-surface-border bg-surface overflow-hidden flex flex-col"
    >
      {/* Screenshot, if one exists at the path declared in profile.ts. Renders
          nothing (graceful no-op) until a real image is dropped into /public/projects. */}
      {project.image && (
        <div className="relative w-full aspect-video bg-ink-raised overflow-hidden border-b border-surface-border">
          <Image
            src={project.image}
            alt={`${project.name} screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover opacity-0 transition-opacity duration-300"
            onLoad={(e) => {
              (e.currentTarget as HTMLImageElement).style.opacity = "1";
            }}
            onError={(e) => {
              // Image not yet added to /public/projects — hide the broken-image box.
              (e.currentTarget.closest("div") as HTMLElement).style.display = "none";
            }}
          />
        </div>
      )}

      {/* connection-log metadata strip */}
      <div className="font-mono-stack text-[11px] text-paper-dim px-5 py-2.5 border-b border-surface-border bg-ink-raised flex items-center gap-2 overflow-x-auto whitespace-nowrap">
        <span className="text-signal-green">$</span>
        <span>stack:</span>
        {project.stack.map((tech) => (
          <span key={tech} className="text-signal-blue">
            {tech}
          </span>
        ))}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-display text-xl text-paper font-semibold">{project.name}</h3>
          {project.featured && (
            <span className="font-mono-stack text-[10px] uppercase tracking-wider text-signal-orange border border-signal-orange/30 rounded px-2 py-0.5 shrink-0">
              Featured
            </span>
          )}
        </div>
        <p className="text-signal-blue text-sm mb-3">{project.tagline}</p>
        <p className="text-paper-dim text-sm leading-relaxed mb-4">{project.description}</p>

        <ul className="space-y-1.5 mb-6 flex-1">
          {project.highlights.map((h) => (
            <li key={h} className="text-sm text-paper-dim flex gap-2">
              <span className="text-signal-orange mt-0.5">▸</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 pt-4 border-t border-surface-border">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="view"
              className="inline-flex items-center gap-1.5 text-sm text-paper hover:text-signal-orange transition-colors"
            >
              <Github size={15} /> Code
            </a>
          )}
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="view"
              className="inline-flex items-center gap-1.5 text-sm text-paper hover:text-signal-orange transition-colors"
            >
              Live Demo <ArrowUpRight size={15} />
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-sm text-paper-dim/50 cursor-default">
              No live demo yet
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
