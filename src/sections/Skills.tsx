import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import * as Si from 'react-icons/si';
import { SectionWrapper, SectionHeader } from '@/components/SectionWrapper';
import { skillGroups } from '@/data/skills';

type SkillItem = { name: string; icon: string };

function getIcon(iconName: string) {
  const Icon = (Si as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[iconName];
  return Icon
    ? <Icon size={22} className="text-primary" />
    : <span className="text-sm font-bold text-primary">{iconName.replace('Si', '').slice(0, 2)}</span>;
}

const allCategory = 'All';
const categories = [allCategory, ...skillGroups.map(g => g.category)];

const fadeUp = {
  hidden: { opacity: 0, y: 10, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035 } },
};

export function Skills() {
  const [active, setActive] = useState(allCategory);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const visibleSkills: SkillItem[] =
    active === allCategory
      ? skillGroups.flatMap(g => g.skills)
      : skillGroups.find(g => g.category === active)?.skills ?? [];

  return (
    <SectionWrapper id="skills" className="bg-muted/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Technical Skills"
          title="What I work with"
          description="Technologies I use to build production-ready services, mobile apps, and cloud-native systems."
        />

        {/* Horizontally scrollable filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-all duration-200 ${
                active === cat
                  ? 'bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20'
                  : 'border-border text-muted-foreground hover:text-foreground hover:border-primary/40 bg-card'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skill cards grid */}
        <motion.div
          ref={ref}
          key={active}
          variants={stagger}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2.5 sm:gap-3"
        >
          <AnimatePresence mode="popLayout">
            {visibleSkills.map((skill) => (
              <motion.div
                key={skill.name}
                variants={fadeUp}
                layout
                className="group bg-card border border-border rounded-xl p-3 sm:p-4 flex flex-col items-center gap-2 hover:border-primary/40 hover:shadow-md hover:shadow-primary/10 hover:-translate-y-0.5 transition-all duration-200 cursor-default"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors duration-200 flex-shrink-0">
                  {getIcon(skill.icon)}
                </div>
                <span className="text-[10px] sm:text-[11px] font-medium text-foreground text-center leading-tight">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Category legend strip — only in All view */}
        {active === allCategory && (
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            {skillGroups.map((g) => (
              <button
                key={g.category}
                onClick={() => setActive(g.category)}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors duration-150"
              >
                <span className="w-2 h-2 rounded-full bg-primary/60 flex-shrink-0" />
                {g.category}
                <span className="text-muted-foreground/50">({g.skills.length})</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
