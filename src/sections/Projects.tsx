import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Search, ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { SectionWrapper, SectionHeader } from '@/components/SectionWrapper';
import { projects } from '@/data/projects';

const allTech = ['All', ...Array.from(new Set(projects.flatMap((p) => p.tech))).slice(0, 10)];

const statusColor: Record<string, string> = {
  Live: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  'In Progress': 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  Archived: 'bg-muted text-muted-foreground border-border',
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export function Projects() {
  const [search, setSearch] = useState('');
  const [activeTech, setActiveTech] = useState('All');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const filtered = projects.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchTech = activeTech === 'All' || p.tech.includes(activeTech);
    return matchSearch && matchTech;
  });

  return (
    <SectionWrapper id="projects">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Portfolio"
          title="Featured Projects"
          description="A selection of projects that demonstrate depth across the stack — from real-time analytics to developer tooling."
        />

        {/* Search + filter */}
        <div className="flex flex-col gap-3 mb-8">
          <div className="relative max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              data-testid="projects-search"
            />
          </div>
          {/* Horizontally scrollable filter chips */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
            {allTech.slice(0, 10).map((t) => (
              <button
                key={t}
                onClick={() => setActiveTech(t)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                  activeTech === t
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/20'
                    : 'border-border text-muted-foreground hover:text-foreground hover:border-primary/40 bg-card'
                }`}
                data-testid={`project-filter-${t.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <motion.div
          ref={ref}
          key={`${search}-${activeTech}`}
          variants={stagger}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          {filtered.map((project) => (
            <motion.div
              key={project.id}
              variants={fadeUp}
              className={`bg-card border rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/30 transition-all duration-300 group ${
                project.featured ? 'border-primary/30 ring-1 ring-primary/10' : 'border-border hover:border-primary/20'
              }`}
              data-testid={`project-card-${project.id}`}
            >
              {/* Cover image */}
              <div className="relative h-44 overflow-hidden bg-muted flex-shrink-0">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                {project.featured && (
                  <span className="absolute top-3 left-3 text-[10px] px-2 py-0.5 rounded-full bg-primary text-primary-foreground font-semibold tracking-wide uppercase">
                    Featured
                  </span>
                )}
                <span className={`absolute top-3 right-3 text-[10px] px-2 py-0.5 rounded-full border font-medium ${statusColor[project.status]}`}>
                  {project.status}
                </span>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-foreground leading-tight text-sm sm:text-base">{project.title}</h3>
                  <span className="text-[10px] text-muted-foreground flex-shrink-0 bg-muted px-2 py-0.5 rounded-md border border-border">
                    {project.category}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3 flex-1">{project.description}</p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.slice(0, 4).map((t) => (
                    <span key={t} className="text-[10px] sm:text-xs px-2 py-0.5 rounded-md bg-primary/8 text-primary border border-primary/15 font-medium">
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border">
                      +{project.tech.length - 4}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-3 border-t border-border">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                      data-testid={`project-live-${project.id}`}
                    >
                      <ExternalLink size={11} /> Live
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                      data-testid={`project-github-${project.id}`}
                    >
                      <Github size={11} /> Code
                    </a>
                  )}
                  <div className="flex-1" />
                  <Link
                    href={`/projects/${project.slug}`}
                    className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-medium transition-colors"
                    data-testid={`project-details-${project.id}`}
                  >
                    Details <ArrowRight size={11} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-base">No projects match your search.</p>
            <button
              onClick={() => { setSearch(''); setActiveTech('All'); }}
              className="mt-3 text-sm text-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
