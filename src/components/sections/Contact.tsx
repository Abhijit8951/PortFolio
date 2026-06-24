"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Github, Linkedin, Mail, Phone, Send, Loader2, Check, AlertCircle } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { profile } from "@/data/profile";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  // Sends the form directly to your inbox via EmailJS — no backend route,
  // no mail-client popup. Requires three values from your EmailJS dashboard,
  // set as env vars (see README "Wiring the contact form" for setup steps):
  //   NEXT_PUBLIC_EMAILJS_SERVICE_ID
  //   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
  //   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      // EmailJS isn't configured yet — fall back to mailto so the form still
      // does *something* useful rather than failing silently.
      const subject = encodeURIComponent(`Portfolio contact from ${form.name || "a visitor"}`);
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_email: profile.email,
        },
        { publicKey }
      );
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS send failed:", err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-6xl mx-auto">
      <ScrollReveal>
        <SectionEyebrow index="06" label="Contact" />
        <h2 className="font-display text-3xl sm:text-4xl text-paper font-semibold mb-4">
          Let&apos;s build something.
        </h2>
        <p className="text-paper-dim mb-12 max-w-xl">
          Open to junior full-stack, backend, and DevSecOps roles. Reach out directly or
          drop a message below.
        </p>
      </ScrollReveal>

      <div className="grid md:grid-cols-[1fr_1.2fr] gap-10">
        <ScrollReveal delay={0.1} className="space-y-4">
          <a
            href={`mailto:${profile.email}`}
            data-cursor="link"
            className="flex items-center gap-3 text-paper hover:text-signal-orange transition-colors"
          >
            <Mail size={18} /> {profile.email}
          </a>
          <a
            href={`tel:${profile.phone.replace(/\s/g, "")}`}
            data-cursor="link"
            className="flex items-center gap-3 text-paper hover:text-signal-orange transition-colors"
          >
            <Phone size={18} /> {profile.phone}
          </a>
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            className="flex items-center gap-3 text-paper hover:text-signal-orange transition-colors"
          >
            <Github size={18} /> github.com/Abhijit8951
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            className="flex items-center gap-3 text-paper hover:text-signal-orange transition-colors"
          >
            <Linkedin size={18} /> LinkedIn
          </a>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block font-mono-stack text-xs text-paper-dim mb-1.5">
                Name
              </label>
              <input
                id="name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-surface border border-surface-border rounded-md px-4 py-2.5 text-paper text-sm outline-none focus:border-signal-orange transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-mono-stack text-xs text-paper-dim mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-surface border border-surface-border rounded-md px-4 py-2.5 text-paper text-sm outline-none focus:border-signal-orange transition-colors"
              />
            </div>
            <div>
              <label htmlFor="message" className="block font-mono-stack text-xs text-paper-dim mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-surface border border-surface-border rounded-md px-4 py-2.5 text-paper text-sm outline-none focus:border-signal-orange transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              data-cursor="link"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-signal-orange text-ink font-medium text-sm hover:bg-signal-orange/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "sending" ? (
                <>
                  Sending <Loader2 size={16} className="animate-spin" />
                </>
              ) : (
                <>
                  Send Message <Send size={16} />
                </>
              )}
            </button>

            {status === "success" && (
              <p className="flex items-center gap-2 text-sm text-signal-green">
                <Check size={16} /> Message sent — thanks for reaching out.
              </p>
            )}
            {status === "error" && (
              <p className="flex items-center gap-2 text-sm text-signal-orange">
                <AlertCircle size={16} /> Something went wrong. Try emailing directly at{" "}
                {profile.email}.
              </p>
            )}
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
