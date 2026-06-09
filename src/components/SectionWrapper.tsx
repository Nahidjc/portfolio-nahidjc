import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function SectionWrapper({ id, children, className = '' }: SectionWrapperProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id={id} ref={ref} className={`py-16 sm:py-20 md:py-24 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55 }}
      >
        {children}
      </motion.div>
    </section>
  );
}

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
}

export function SectionHeader({ label, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-10 sm:mb-12 md:mb-14">
      {label && (
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
          {label}
        </p>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
      <div className="mt-5 h-px w-14 bg-primary rounded-full" />
    </div>
  );
}
