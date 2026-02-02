import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import LoadingScreen from './components/LoadingScreen';
import HeroSection from './components/HeroSection';
import ProductShowcase from './components/ProductShowcase';
import BrandStory from './components/BrandStory';
import LocationFinder from './components/LocationFinder';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import './index.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const lenisRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="fixed inset-0 z-[1] pointer-events-none opacity-[0.05] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-[#1a1a1a] origin-left z-[9999]"
            style={{ scaleX }}
          />

          <main className="relative z-10 bg-transparent">
            <HeroSection />

            {/* Menu Heading Section */}
            <div id="menu" className="bg-[#050505] py-24 flex flex-col items-center justify-center border-b border-white/5 relative z-20">
              <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.4em] mb-4">Curated Menu</span>
              <h2 className="text-white text-5xl md:text-7xl font-display uppercase leading-none tracking-tight">
                Selections
              </h2>
            </div>

            <div><ProductShowcase /></div>

            <div className="bg-[#050505] py-24 flex flex-col items-center justify-center border-t border-white/5 relative z-20">
              <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.4em] mb-4">The Craft</span>
              <h2 className="text-white text-5xl md:text-7xl font-display uppercase leading-none tracking-tight">
                Our Journey
              </h2>
            </div>

            <div id="story"><BrandStory /></div>

            <div className="bg-[#0F0F0F] py-32 flex flex-col items-center justify-center border-t border-white/5">
              <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.4em] mb-4">Visit Us</span>
              <h2 className="text-white text-6xl md:text-8xl font-display uppercase leading-none tracking-tight">
                Our Locations
              </h2>
            </div>
            <div id="visit"><LocationFinder /></div>
            <Newsletter />
            <Footer />
          </main>
        </motion.div>
      )}
    </>
  );
}

export default App;
