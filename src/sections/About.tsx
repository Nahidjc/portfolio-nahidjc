import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Layers, Server, Cloud, Smartphone } from 'lucide-react';
import { SectionWrapper, SectionHeader } from '@/components/SectionWrapper';
import { profile } from '@/data/profile';

const features = [
  {
    icon: Server,
    title: 'Backend & APIs',
    description: 'Scalable REST APIs with Node.js, Express, Koa, and NestJS. Focused on clean architecture, reliability, and performance.',
  },
  {
    icon: Smartphone,
    title: 'Mobile (React Native)',
    description: 'Cross-platform mobile apps with React Native — from OTP auth to real-time Socket.IO features and biometric security.',
  },
  {
    icon: Cloud,
    title: 'Cloud & Serverless',
    description: 'AWS Lambda, API Gateway, S3, CloudFront, and microservices. Deploying and scaling services in the cloud cost-efficiently.',
  },
  {
    icon: Layers,
    title: 'Fintech Systems',
    description: 'Payment flows, subscription modules, gift card services, and financial microservices. Correctness and security are non-negotiable.',
  },
];

const timeline = [
  { year: '2018', event: 'Started BSc in Computer Science & Engineering at Daffodil International University.' },
  { year: '2019', event: 'Competed in ICPC Preliminary Regional Dhaka and DIU Programming Contest. Started competitive programming.' },
  { year: '2021', event: 'Competed in ICPC Preliminary Regional Dhaka again. Completed Full Stack Web Dev certification.' },
  { year: '2022', event: 'Graduated with CGPA 3.91. Joined Spring Rain Pvt Ltd as a Software Engineer in fintech.' },
  { year: '2024', event: 'Completed 2.5 years at Spring Rain. Shipped recurring subscription module and AWS SNS integrations.' },
  { year: '2025', event: 'Joined C3bit as Full Stack Engineer. Leading telemedicine and video banking platforms.' },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <SectionWrapper id="about" className="bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="About Me" title="Engineering with purpose" description={profile.bio} />

        {/* Feature cards */}
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              className="bg-card border border-border rounded-xl p-5 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <f.icon size={20} className="text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2 text-sm">{f.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Philosophy + Timeline */}
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-4">Engineering Philosophy</h3>
            <blockquote className="border-l-2 border-primary pl-5 text-muted-foreground italic leading-relaxed text-base">
              "Good software isn't just about making things work — it's about making them work reliably, securely, and in a way the next engineer can understand. I care about correctness, simplicity, and shipping things that matter to real people."
            </blockquote>
            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <p>My current focus is on fintech systems, serverless microservices, and real-time communication platforms. I'm passionate about clean API design and payment infrastructure that users can trust.</p>
              <p>When I'm not coding, I explore system design concepts and contribute to making that knowledge accessible to the Bangladeshi developer community.</p>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-6">Career Journey</h3>
            <div className="relative pl-5 border-l border-border space-y-5">
              {timeline.map((t, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[21px] w-3 h-3 rounded-full bg-primary border-2 border-background" />
                  <p className="text-xs font-semibold text-primary mb-1">{t.year}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
