import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return prev + Math.floor(Math.random() * 10) + 1;
            });
        }, 150);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (progress === 100) {
            setTimeout(() => {
                onComplete();
            }, 800);
        }
    }, [progress, onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[10000] bg-[#1a1a1a] flex flex-col items-center justify-center text-[#f5f5f5]"
            initial={{ opacity: 1 }}
            animate={progress === 100 ? { y: '-100%' } : { y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
            <div className="overflow-hidden mb-4">
                <motion.h1
                    className="text-6xl md:text-9xl font-display uppercase tracking-tighter"
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    Kobie Coffee.
                </motion.h1>
            </div>

            <div className="w-[300px] h-[1px] bg-white/20 relative overflow-hidden">
                <motion.div
                    className="absolute top-0 left-0 h-full bg-[#f5f5f5]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                />
            </div>

            <div className="mt-4 font-mono text-xs uppercase opacity-50">
                Loading Assets ... {progress}%
            </div>
        </motion.div>
    );
}
