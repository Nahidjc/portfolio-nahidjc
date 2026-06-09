import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Clock, CalendarDays, ArrowUpRight } from 'lucide-react';
import { SectionWrapper, SectionHeader } from '@/components/SectionWrapper';
import { blogPosts } from '@/data/blogs';

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function Blog() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <SectionWrapper id="blog" className="bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Writing"
          title="Latest Articles"
          description="Long-form thinking on distributed systems, engineering culture, and the craft of writing software."
        />

        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5"
        >
          {blogPosts.map((post) => (
            <motion.a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeUp}
              className="bg-card border border-border rounded-xl overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-lg hover:border-primary/30 transition-all duration-300 group"
              data-testid={`blog-${post.id}`}
            >
              <div className="h-44 overflow-hidden bg-muted relative">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-semibold text-foreground mb-2 leading-snug group-hover:text-primary transition-colors flex-1">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{post.summary}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><CalendarDays size={11} /> {formatDate(post.date)}</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime}</span>
                  </div>
                  <ArrowUpRight size={14} className="group-hover:text-primary transition-colors" />
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
