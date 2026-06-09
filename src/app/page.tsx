import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Education from '@/components/sections/Education';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Certifications from '@/components/sections/Certifications';
import Achievements from '@/components/sections/Achievements';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';
import PageLoaderCloser from '@/components/ui/PageLoaderCloser';

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'MD. NAHID',
    jobTitle: 'Software Engineer',
    url: 'https://nahidjc.com',
    image: 'https://avatars.githubusercontent.com/u/50502837?v=4',
    sameAs: [
      'https://github.com/nahidjc',
      'https://www.linkedin.com/in/nahidjc',
      'https://twitter.com/nahidjc',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dhaka',
      addressCountry: 'Bangladesh',
    },
    email: 'nahidjc.cse@gmail.com',
    telephone: '+880 1910125428',
    description:
      'Software Engineer specializing in Node.js, React.js, React Native, MySQL, and AWS Lambda. 4+ years of experience building scalable, production-ready software.',
  };

  return (
    <main>
      <PageLoaderCloser />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <About />
      <Experience />
      <Education />
      <Skills />
      <Projects />
      <Certifications />
      <Achievements />
      <Testimonials />
      <Contact />
    </main>
  );
}
