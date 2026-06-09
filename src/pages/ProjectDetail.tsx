import { useParams, Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, CheckCircle2, Zap, AlertTriangle, Lightbulb, Layers } from 'lucide-react';
import { projects } from '@/data/projects';
import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-primary z-[60] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const statusColor: Record<string, string> = {
  Live: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  'In Progress': 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  Archived: 'bg-muted text-muted-foreground border-border',
};

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-2xl font-bold text-foreground">Project not found</p>
        <Link href="/" className="text-primary hover:underline text-sm">Back to portfolio</Link>
      </div>
    );
  }

  return (
    <>
      <ReadingProgress />

      <div className="min-h-screen bg-background pt-16">
        {/* Hero */}
        <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30 font-medium">
                  {project.category}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${statusColor[project.status]}`}>
                  {project.status}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight drop-shadow-lg">
                {project.title}
              </h1>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-10">
            <Link href="/" className="hover:text-foreground transition-colors" data-testid="breadcrumb-home">
              Home
            </Link>
            <span>/</span>
            <button
              onClick={() => { window.location.hash = 'projects'; window.history.back(); }}
              className="hover:text-foreground transition-colors"
            >
              Projects
            </button>
            <span>/</span>
            <span className="text-foreground font-medium">{project.title}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main content */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="lg:col-span-2 space-y-10"
            >
              {/* Overview */}
              <motion.div variants={fadeUp}>
                <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Layers size={18} className="text-primary" /> Overview
                </h2>
                <p className="text-muted-foreground leading-relaxed">{project.overview}</p>
              </motion.div>

              {/* Problem */}
              <motion.div variants={fadeUp}>
                <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                  <AlertTriangle size={18} className="text-amber-500" /> Problem Statement
                </h2>
                <p className="text-muted-foreground leading-relaxed">{project.problem}</p>
              </motion.div>

              {/* Solution */}
              <motion.div variants={fadeUp}>
                <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Zap size={18} className="text-primary" /> Solution
                </h2>
                <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
              </motion.div>

              {/* Features */}
              <motion.div variants={fadeUp}>
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-500" /> Key Features
                </h2>
                <ul className="space-y-2">
                  {project.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Architecture */}
              <motion.div variants={fadeUp}>
                <h2 className="text-xl font-semibold text-foreground mb-3">Architecture</h2>
                <div className="bg-card border border-border rounded-xl p-4">
                  <p className="text-sm font-mono text-muted-foreground">{project.architecture}</p>
                </div>
              </motion.div>

              {/* Challenges */}
              <motion.div variants={fadeUp}>
                <h2 className="text-xl font-semibold text-foreground mb-4">Technical Challenges</h2>
                <ul className="space-y-2">
                  {project.challenges.map((c, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <span className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold text-amber-600">
                        {i + 1}
                      </span>
                      <span className="text-sm">{c}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Lessons */}
              <motion.div variants={fadeUp}>
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Lightbulb size={18} className="text-primary" /> Lessons Learned
                </h2>
                <ul className="space-y-2">
                  {project.lessons.map((l, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <Lightbulb size={14} className="text-primary mt-1 flex-shrink-0" />
                      <span className="text-sm">{l}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Screenshots */}
              {project.screenshots.length > 0 && (
                <motion.div variants={fadeUp}>
                  <h2 className="text-xl font-semibold text-foreground mb-4">Screenshots</h2>
                  <div className="grid gap-4">
                    {project.screenshots.map((src, i) => (
                      <div key={i} className="rounded-xl overflow-hidden border border-border bg-muted">
                        <img src={src} alt={`Screenshot ${i + 1}`} className="w-full" loading="lazy" />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-5"
            >
              {/* Links */}
              <div className="bg-card border border-border rounded-xl p-5 space-y-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Links</p>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
                    data-testid="project-detail-live"
                  >
                    <ExternalLink size={14} className="text-primary" /> Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
                    data-testid="project-detail-github"
                  >
                    <Github size={14} className="text-primary" /> Source Code
                  </a>
                )}
              </div>

              {/* Tech Stack */}
              <div className="bg-card border border-border rounded-xl p-5">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-lg bg-muted text-muted-foreground border border-border font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Back button */}
              <Link
                href="/"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="project-detail-back"
              >
                <ArrowLeft size={14} /> Back to Portfolio
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
