import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import { SectionWrapper, SectionHeader } from '@/components/SectionWrapper';
import { certifications } from '@/data/certifications';

function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[parseInt(month) - 1]} ${year}`;
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export function Certifications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <SectionWrapper id="certifications" className="bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Credentials"
          title="Certifications"
          description="Completed courses and training programs that deepened skills across full-stack web development, cloud services, and backend engineering."
        />

        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              variants={fadeUp}
              className="bg-card border border-border rounded-xl p-5 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col"
              data-testid={`cert-${cert.id}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-primary">{cert.provider}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(cert.date)}</p>
                </div>
              </div>
              <h3 className="font-medium text-foreground text-sm leading-tight flex-1 mb-4">
                {cert.name}
              </h3>
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors mt-auto"
                  data-testid={`cert-link-${cert.id}`}
                >
                  <ExternalLink size={11} /> View Credential
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
