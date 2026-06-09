import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';
import { SectionWrapper, SectionHeader } from '@/components/SectionWrapper';
import { education } from '@/data/education';

function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[parseInt(month) - 1]} ${year}`;
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};
const slideIn = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

export function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <SectionWrapper id="education">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Academic Background"
          title="Education"
          description="The foundation that shaped how I think about problems, systems, and engineering."
        />

        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="relative pl-6 border-l border-border space-y-6"
        >
          {education.map((edu) => (
            <motion.div
              key={edu.id}
              variants={slideIn}
              className="relative"
              data-testid={`education-${edu.id}`}
            >
              <div className="absolute -left-[29px] w-4 h-4 rounded-full bg-card border-2 border-primary shadow flex items-center justify-center">
                <GraduationCap size={8} className="text-primary" />
              </div>

              <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {edu.major}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-primary">{edu.institution}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                    </p>
                  </div>
                </div>

                {edu.achievements.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <Award size={11} /> Achievements
                    </p>
                    <ul className="space-y-1.5">
                      {edu.achievements.map((a, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
