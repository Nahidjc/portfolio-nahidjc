import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, MapPin, ChevronDown } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { profile } from '@/data/profile';

const roles = [
  'Software Engineer',
  'Node.js Backend Developer',
  'React Native Developer',
  'AWS & Serverless Engineer',
  'Fintech Systems Builder',
];

function TypingText() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[currentIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === current) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % roles.length);
    } else {
      const speed = isDeleting ? 35 : 65;
      timeout = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? current.slice(0, displayText.length - 1)
            : current.slice(0, displayText.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex]);

  return (
    <span className="text-primary">
      {displayText}
      <span className="animate-pulse ml-0.5">|</span>
    </span>
  );
}

const iconMap: Record<string, typeof FaGithub> = {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center relative pt-20 pb-16 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[80px] -z-10 pointer-events-none" />

      {/* Background grid */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.025] dark:opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16"
        >
          {/* Avatar + Stats — top on mobile */}
          <motion.div
            variants={item}
            className="flex flex-col items-center gap-5 order-1 lg:order-2 flex-shrink-0"
          >
            {/* Avatar */}
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-primary/25 blur-2xl scale-105 -z-10" />
              <div className="w-36 h-36 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-2xl overflow-hidden ring-2 ring-primary/40 ring-offset-4 ring-offset-background shadow-2xl">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 px-3 py-1.5 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/40">
                <span className="text-primary-foreground text-xs font-bold tracking-wide">4+ yrs</span>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-2.5 w-full max-w-[260px] sm:max-w-[280px]">
              {profile.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-card border border-border rounded-xl p-3 text-center hover:border-primary/30 hover:shadow-sm transition-all duration-200"
                >
                  <p className="text-lg sm:text-xl font-bold text-foreground leading-none">{stat.value}</p>
                  <p className="text-[10px] text-muted-foreground mt-1 leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Text content */}
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1 w-full min-w-0">
            {/* Availability badge */}
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-sm text-emerald-500 dark:text-emerald-400 mb-5"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
              Available for Opportunities
            </motion.div>

            <motion.h1
              variants={item}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-3 leading-[1.08]"
            >
              {profile.name}
            </motion.h1>

            <motion.p
              variants={item}
              className="text-lg sm:text-xl font-medium text-muted-foreground mb-4 min-h-[1.75rem]"
            >
              <TypingText />
            </motion.p>

            <motion.p
              variants={item}
              className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-5 max-w-lg mx-auto lg:mx-0"
            >
              {profile.bio}
            </motion.p>

            <motion.div
              variants={item}
              className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6 justify-center lg:justify-start"
            >
              <MapPin size={13} className="flex-shrink-0" />
              <span>{profile.location}</span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={item}
              className="flex flex-wrap gap-3 justify-center lg:justify-start mb-6"
            >
              <a
                href={profile.resumeUrl}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 active:scale-95 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25"
                data-testid="hero-resume-download"
              >
                <Download size={14} />
                Download Resume
              </a>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-muted hover:border-primary/30 active:scale-95 transition-all duration-200 hover:-translate-y-0.5"
                data-testid="hero-contact-btn"
              >
                <Mail size={14} />
                Get in Touch
              </button>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={item}
              className="flex items-center gap-2.5 justify-center lg:justify-start"
            >
              {profile.social.map((s) => {
                const Icon = iconMap[s.icon];
                return (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 active:scale-95 transition-all duration-200"
                    aria-label={s.platform}
                    data-testid={`social-${s.platform.toLowerCase()}`}
                  >
                    {Icon && <Icon size={16} />}
                  </a>
                );
              })}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="flex justify-center mt-12 lg:mt-16"
        >
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors group"
          >
            <span className="text-xs tracking-wide">Scroll down</span>
            <ChevronDown size={15} className="animate-bounce" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
