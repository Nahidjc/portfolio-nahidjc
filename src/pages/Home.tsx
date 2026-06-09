import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { Experience } from '@/sections/Experience';
import { Education } from '@/sections/Education';
import { Skills } from '@/sections/Skills';
import { Projects } from '@/sections/Projects';
import { Certifications } from '@/sections/Certifications';
import { Achievements } from '@/sections/Achievements';
import { Testimonials } from '@/sections/Testimonials';
import { OpenSource } from '@/sections/OpenSource';
import { Contact } from '@/sections/Contact';
import { Footer } from '@/sections/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Education />
      <Skills />
      <Projects />
      <Certifications />
      <Achievements />
      <Testimonials />
      <OpenSource />
      <Contact />
      <Footer />
    </>
  );
}
