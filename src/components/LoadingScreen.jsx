import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useProgress } from '@react-three/drei';

export default function LoadingScreen({ onComplete }) {
    const { progress, active } = useProgress();
    const [displayProgress, setDisplayProgress] = useState(0);

    useEffect(() => {
        // Smoothly interpolate progress to avoid jumping
        if (progress > displayProgress) {
            const timer = setTimeout(() => {
                setDisplayProgress(Math.min(displayProgress + 5, progress));
            }, 20);
            return () => clearTimeout(timer);
        }
    }, [progress, displayProgress]);

    useEffect(() => {
        // When actual loading is done (active is false or progress is 100)
        // We wait a bit to ensure the transition is smooth
        if ((progress === 100 || !active) && displayProgress >= 99) {
            const timeout = setTimeout(() => {
                onComplete();
            }, 500);
            return () => clearTimeout(timeout);
        }
    }, [progress, active, displayProgress, onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[10000] bg-[#1a1a1a] flex flex-col items-center justify-center text-[#f5f5f5]"
            initial={{ opacity: 1 }}
            exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
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
                    animate={{ width: `${Math.round(displayProgress)}%` }}
                />
            </div>

            <div className="mt-4 font-mono text-xs uppercase opacity-50">
                Loading Assets ... {Math.round(displayProgress)}%
            </div>
        </motion.div>
    );
}
