import { profile } from "@/data/profile";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-surface-border bg-ink-raised">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono-stack text-xs text-paper-dim">
          © {year} {profile.name}. Built from the signaling layer up.
        </p>
        <div className="flex items-center gap-4">
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            aria-label="GitHub"
            className="text-paper-dim hover:text-signal-orange transition-colors"
          >
            <Github size={18} />
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            aria-label="LinkedIn"
            className="text-paper-dim hover:text-signal-orange transition-colors"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            data-cursor="link"
            aria-label="Email"
            className="text-paper-dim hover:text-signal-orange transition-colors"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
