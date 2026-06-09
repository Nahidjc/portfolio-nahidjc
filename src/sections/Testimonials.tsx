import { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Quote } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { SectionWrapper, SectionHeader } from '@/components/SectionWrapper';
import { testimonials } from '@/data/testimonials';

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [autoplay.current]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <SectionWrapper id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Social Proof"
          title="What colleagues say"
          description="Recommendations from managers, peers, and founders who've seen my work up close."
        />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-5">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-10px)] lg:flex-[0_0_calc(50%-10px)] bg-card border border-border rounded-xl p-6 relative"
                  data-testid={`testimonial-${t.id}`}
                >
                  <Quote size={28} className="text-primary/20 absolute top-5 right-5" />
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5 italic">
                    "{t.content}"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-10 h-10 rounded-full bg-muted border border-border"
                    />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role} · {t.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 mt-6 justify-center">
            <button
              onClick={scrollPrev}
              className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              data-testid="testimonial-prev"
              aria-label="Previous"
            >
              ←
            </button>
            <button
              onClick={scrollNext}
              className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              data-testid="testimonial-next"
              aria-label="Next"
            >
              →
            </button>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
