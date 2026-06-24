import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import ProjectCard from "@/components/ui/ProjectCard";
import { profile } from "@/data/profile";

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
      <ScrollReveal>
        <SectionEyebrow index="03" label="Projects" />
        <h2 className="font-display text-3xl sm:text-4xl text-paper font-semibold mb-12">
          Things I&apos;ve shipped
        </h2>
      </ScrollReveal>

      <div className="grid sm:grid-cols-2 gap-6">
        {profile.projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
