import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Trophy, Mic, Code2, BookOpen, Users, ExternalLink } from 'lucide-react';
import { SectionWrapper, SectionHeader } from '@/components/SectionWrapper';
import { achievements } from '@/data/achievements';
import type { Achievement } from '@/types';

const typeConfig: Record<Achievement['type'], { label: string; icon: typeof Trophy; color: string }> = {
  award: { label: 'Awards', icon: Trophy, color: 'text-amber-500' },
  speaking: { label: 'Speaking', icon: Mic, color: 'text-purple-500' },
  'open-source': { label: 'Open Source', icon: Code2, color: 'text-primary' },
  publication: { label: 'Publications', icon: BookOpen, color: 'text-cyan-500' },
  community: { label: 'Community', icon: Users, color: 'text-emerald-500' },
};

const tabs = ['All', ...Object.entries(typeConfig).map(([, v]) => v.label)];

function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[parseInt(month) - 1]} ${year}`;
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export function Achievements() {
  const [active, setActive] = useState('All');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const filtered = active === 'All'
    ? achievements
    : achievements.filter((a) => typeConfig[a.type].label === active);

  return (
    <SectionWrapper id="achievements">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Recognition"
          title="Achievements"
          description="Awards, publications, open source contributions, and community impact."
        />

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                active === tab
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 bg-card'
              }`}
              data-testid={`achievement-filter-${tab.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <motion.div
          ref={ref}
          key={active}
          variants={stagger}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filtered.map((ach) => {
            const config = typeConfig[ach.type];
            const Icon = config.icon;
            return (
              <motion.div
                key={ach.id}
                variants={fadeUp}
                className="bg-card border border-border rounded-xl p-5 hover:-translate-y-1 hover:shadow-md hover:border-primary/30 transition-all duration-300"
                data-testid={`achievement-${ach.id}`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className={config.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{config.label}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(ach.date)}</p>
                  </div>
                </div>
                <h3 className="font-medium text-foreground text-sm mb-2">{ach.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{ach.description}</p>
                {ach.url && ach.url !== '#' && (
                  <a href={ach.url} target="_blank" rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
                    data-testid={`achievement-link-${ach.id}`}
                  >
                    <ExternalLink size={11} /> View
                  </a>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
