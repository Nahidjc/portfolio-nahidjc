import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ChevronDown, ChevronUp, MapPin, Calendar, Briefcase } from 'lucide-react';
import { SectionWrapper, SectionHeader } from '@/components/SectionWrapper';
import { experiences } from '@/data/experience';

function formatDate(dateStr: string | null): string {
  if (!dateStr) return 'Present';
  const [year, month] = dateStr.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[parseInt(month) - 1]} ${year}`;
}

function getDuration(start: string, end: string | null): string {
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : new Date();
  const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + endDate.getMonth() - startDate.getMonth();
  const years = Math.floor(months / 12);
  const rem = months % 12;
  if (years === 0) return `${rem}mo`;
  if (rem === 0) return `${years}yr`;
  return `${years}yr ${rem}mo`;
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};
const slideIn = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

export function Experience() {
  const [expanded, setExpanded] = useState<string | null>(experiences[0]?.id ?? null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <SectionWrapper id="experience">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Work History"
          title="Professional Experience"
          description="A track record of building systems that scale and teams that thrive."
        />

        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="relative pl-6 border-l border-border space-y-6"
        >
          {experiences.map((exp) => {
            const isOpen = expanded === exp.id;
            return (
              <motion.div
                key={exp.id}
                variants={slideIn}
                className="relative"
                data-testid={`experience-${exp.id}`}
              >
                {/* Timeline dot */}
                <div className="absolute -left-[29px] w-4 h-4 rounded-full bg-card border-2 border-primary shadow" />

                <div
                  className={`bg-card border rounded-xl overflow-hidden transition-all duration-300 ${
                    isOpen ? 'border-primary/40 shadow-md' : 'border-border hover:border-border/70'
                  }`}
                >
                  {/* Header */}
                  <button
                    className="w-full text-left p-5 sm:p-6"
                    onClick={() => setExpanded(isOpen ? null : exp.id)}
                    data-testid={`experience-toggle-${exp.id}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">{exp.role}</h3>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                            {exp.type}
                          </span>
                          {!exp.endDate && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="font-medium text-primary text-sm">{exp.company}</p>
                        <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><MapPin size={11} /> {exp.location}</span>
                          <span className="flex items-center gap-1">
                            <Calendar size={11} />
                            {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                            <span className="text-muted-foreground/60">({getDuration(exp.startDate, exp.endDate)})</span>
                          </span>
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-muted-foreground mt-1">
                        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </div>
                  </button>

                  {/* Expanded content */}
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-5 sm:px-6 pb-6 space-y-5"
                    >
                      <div className="h-px bg-border" />

                      {/* Impact */}
                      <div className="bg-primary/5 border border-primary/15 rounded-lg p-4">
                        <p className="text-xs font-semibold text-primary mb-1 uppercase tracking-wider flex items-center gap-1.5">
                          <Briefcase size={11} /> Business Impact
                        </p>
                        <p className="text-sm text-foreground">{exp.impact}</p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        {/* Responsibilities */}
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Responsibilities</p>
                          <ul className="space-y-2">
                            {exp.responsibilities.map((r, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                                {r}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Achievements */}
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Key Achievements</p>
                          <ul className="space-y-2">
                            {exp.achievements.map((a, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                                {a}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Tech stack */}
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Tech Stack</p>
                        <div className="flex flex-wrap gap-2">
                          {exp.tech.map((t) => (
                            <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-muted text-muted-foreground border border-border">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
