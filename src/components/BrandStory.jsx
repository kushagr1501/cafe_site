import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';

const storyChapters = [
    {
        id: 1,
        title: "The Source",
        subtitle: "Volcanic Soil, 1600m",
        text: "We traverse the globe to find beans grown in the most challenging, nutrient-rich environments. Every cherry is hand-picked at peak ripeness.",
        image: "https://images.unsplash.com/photo-1525088553748-01d6e210e00b?q=80&w=2076&auto=format&fit=crop",
        align: "items-start justify-end"
    },
    {
        id: 2,
        title: "The Alchemy",
        subtitle: "Small Batch Roasting",
        text: "Science meets intuition. Our master roasters monitor thermal curves to the second, unlocking the hidden flavor profile of every single bean.",
        image: "https://images.unsplash.com/photo-1515442261605-65987783cb6a?q=80&w=2076&auto=format&fit=crop",
        align: "items-center justify-center"
    },
    {
        id: 3,
        title: "The Ritual",
        subtitle: "Precision Extraction",
        text: "The final 30 seconds define the experience. Water temperature, pressure, and timing converge to create liquid gold.",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2072&auto=format&fit=crop",
        align: "items-end justify-start"
    }
];

export default function BrandStory() {
    const containerRef = useRef(null);
    const [currentChapter, setCurrentChapter] = useState(0);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            if (latest < 0.33) setCurrentChapter(0);
            else if (latest < 0.66) setCurrentChapter(1);
            else setCurrentChapter(2);
        });
        return () => unsubscribe();
    }, [scrollYProgress]);

    return (
        <section ref={containerRef} className="relative h-[300vh] bg-[#0F0F0F]">

            <div className="sticky top-0 h-screen w-full overflow-hidden">

                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={currentChapter}
                        className="absolute inset-0 z-0 overflow-hidden"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    >
                        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

                        <img
                            src={storyChapters[currentChapter].image}
                            alt={storyChapters[currentChapter].title}
                            className="absolute inset-0 w-full h-full object-cover opacity-90"
                        />
                    </motion.div>
                </AnimatePresence>

                <div className="relative z-20 h-full w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center">

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentChapter}
                            className={`flex flex-col h-full w-full py-24 ${storyChapters[currentChapter].align}`}
                            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -50, filter: "blur(10px)" }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="max-w-2xl">
                                <motion.span
                                    className="block text-[#D4AF37] font-mono text-sm tracking-[0.3em] uppercase mb-4"
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                >
                                    0{currentChapter + 1} / {storyChapters[currentChapter].subtitle}
                                </motion.span>

                                <h2 className="text-7xl md:text-9xl font-display uppercase leading-none text-white mb-8 mix-blend-overlay">
                                    {storyChapters[currentChapter].title}
                                </h2>

                                <p className="text-xl md:text-3xl font-serif text-white/80 leading-relaxed">
                                    {storyChapters[currentChapter].text}
                                </p>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-30">
                        {storyChapters.map((_, index) => (
                            <motion.div
                                key={index}
                                className={`w-1 h-12 rounded-full cursor-pointer transition-colors duration-500 ${index === currentChapter ? 'bg-[#D4AF37]' : 'bg-white/20'}`}
                                animate={{ height: index === currentChapter ? 48 : 24 }}
                            />
                        ))}
                    </div>

                </div>
            </div>

        </section>
    );
}
