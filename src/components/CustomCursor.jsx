import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Only enable on non-touch devices
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        window.addEventListener("mousemove", updateMousePosition);
        document.body.addEventListener("mouseenter", handleMouseEnter);
        document.body.addEventListener("mouseleave", handleMouseLeave);

        // Add listeners for clickable elements
        const handleHoverStart = () => setIsHovering(true);
        const handleHoverEnd = () => setIsHovering(false);

        const clickableElements = document.querySelectorAll(
            'a, button, input, textarea, [role="button"], .clickable'
        );

        // We need a MutationObserver to attach listeners to dynamic elements
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(() => {
                const newClickables = document.querySelectorAll(
                    'a, button, input, textarea, [role="button"], .clickable'
                );
                newClickables.forEach((el) => {
                    el.addEventListener("mouseenter", handleHoverStart);
                    el.addEventListener("mouseleave", handleHoverEnd);
                });
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        // Initial attach
        clickableElements.forEach((el) => {
            el.addEventListener("mouseenter", handleHoverStart);
            el.addEventListener("mouseleave", handleHoverEnd);
        });

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            document.body.removeEventListener("mouseenter", handleMouseEnter);
            document.body.removeEventListener("mouseleave", handleMouseLeave);
            observer.disconnect();
            clickableElements.forEach((el) => {
                el.removeEventListener("mouseenter", handleHoverStart);
                el.removeEventListener("mouseleave", handleHoverEnd);
            });
        };
    }, [isVisible]);

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9999] mix-blend-exclusion"
                style={{
                    background: 'var(--kobie-maroon)',
                    x: mousePosition.x - 8,
                    y: mousePosition.y - 8,
                }}
                animate={{
                    scale: isHovering ? 2.5 : 1,
                    opacity: isVisible ? 1 : 0
                }}
                transition={{
                    scale: { type: "spring", stiffness: 500, damping: 20 },
                    opacity: { duration: 0.2 }
                }}
            />
            <motion.div
                className="fixed top-0 left-0 w-12 h-12 rounded-full border border-gray-400 pointer-events-none z-[9998] mix-blend-exclusion"
                style={{
                    x: mousePosition.x - 24,
                    y: mousePosition.y - 24,
                }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    opacity: isVisible ? 0.5 : 0
                }}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 15,
                    opacity: { duration: 0.2 }
                }}
            />
        </>
    );
}
