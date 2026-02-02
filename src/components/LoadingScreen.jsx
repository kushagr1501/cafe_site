import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useProgress } from '@react-three/drei';
import PropTypes from 'prop-types';

export default function LoadingScreen({ onComplete }) {
    const { progress } = useProgress();
    const [displayProgress, setDisplayProgress] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        let incrementAmount = 1;
        let intervalTime = 30;

        if (isMobile && progress === 0) {
            incrementAmount = 2; 
            intervalTime = 20;   
        }

        const interval = setInterval(() => {
            setDisplayProgress(prev => {
                if (prev >= 100) return 100;
                
                if (isMobile && progress === 0) {
                    return Math.min(100, prev + incrementAmount);
                }
                
                const target = progress > prev ? progress : prev + 1;
                return Math.min(100, target);
            });
        }, intervalTime);

        return () => clearInterval(interval);
    }, [progress, isMobile]);

    useEffect(() => {
        if (displayProgress === 100) {
            const timeout = setTimeout(() => {
                onComplete();
            }, 500);
            return () => clearTimeout(timeout);
        }
    }, [displayProgress, onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center text-[#f5f5f5]"
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

LoadingScreen.propTypes = {
    onComplete: PropTypes.func.isRequired
};
