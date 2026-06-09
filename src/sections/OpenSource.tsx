import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Star, GitFork, ExternalLink } from 'lucide-react';
import { SectionWrapper, SectionHeader } from '@/components/SectionWrapper';
import { openSourceProjects } from '@/data/openSource';

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export function OpenSource() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <SectionWrapper id="opensource" className="bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Open Source"
          title="Contributions"
          description="Projects I've built and maintain in the open. Used by engineers at companies around the world."
        />

        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid sm:grid-cols-2 gap-4"
        >
          {openSourceProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={fadeUp}
              className="bg-card border border-border rounded-xl p-5 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
              data-testid={`opensource-${project.id}`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="font-mono font-semibold text-primary text-sm">{project.name}</h3>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                  data-testid={`opensource-link-${project.id}`}
                  aria-label={`View ${project.name} on GitHub`}
                >
                  <ExternalLink size={14} />
                </a>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{project.description}</p>
              <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Star size={12} className="text-amber-500" /> {project.stars}</span>
                <span className="flex items-center gap-1"><GitFork size={12} /> {project.forks}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
