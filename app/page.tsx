import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Projects } from "@/components/sections/Projects";
import { Blog } from "@/components/sections/Blog";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { InteractiveTerminal } from "@/components/sections/Terminal";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="w-full bg-background flex flex-col items-center">
      
      {/* 
        Phase 3: Hero Section 
      */}
      <Hero />
      
      {/* 
        Phase 4: About Section 
      */}
      <About />
      
      {/* 
        Phase 5: Technical Skills 
      */}
      <Skills />

      {/* 
        Phase 6: Experience Section 
      */}
      <Experience />

      {/* 
        Phase 7: Education and Certifications 
      */}
      <Education />

      {/* 
        Phase 8: Advanced Project Showcase (Homepage Component) 
      */}
      <Projects />

      {/* 
        Phase 9: Developer Blog 
      */}
      <Blog />

      {/* 
        Phase 10: Testimonials
      */}
      <Testimonials />

      {/* 
        Phase 11: Contact System 
      */}
      <Contact />

      {/* 
        Phase 12: Advanced Features
      */}
      <InteractiveTerminal />
      
      <div className="w-full">
        <Footer />
      </div>

    </div>
  );
}