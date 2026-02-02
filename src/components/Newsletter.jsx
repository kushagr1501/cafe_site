import { useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

export default function Newsletter() {
    const [email, setEmail] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        let { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <section
            className="relative h-[80vh] md:h-screen w-full bg-[#050505] overflow-hidden flex flex-col items-center justify-center group"
            onMouseMove={handleMouseMove}
        >

            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            650px circle at ${mouseX}px ${mouseY}px,
                            rgba(212, 175, 55, 0.07),
                            transparent 80%
                        )
                    `
                }}
            />

            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center text-center">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block py-1 px-3 border border-white/20 rounded-full text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] mb-8 bg-white/5 backdrop-blur-sm">
                        Members Only
                    </span>

                    <h2 className="text-4xl md:text-6xl font-display uppercase leading-tight text-white mb-12">
                        Unlock The<br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#888] to-[#333]">Secret Menu</span>
                    </h2>
                </motion.div>

                <div className="relative w-full max-w-xl group/input">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ENTER YOUR EMAIL"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className="w-full bg-transparent border-b-2 border-white/10 py-4 text-center text-xl md:text-3xl font-display uppercase tracking-widest text-[#D4AF37] placeholder:text-white/10 focus:outline-none focus:border-[#D4AF37]/50 transition-all duration-500"
                    />

                    <motion.div
                        className="absolute bottom-0 left-0 h-[2px] bg-[#D4AF37] shadow-[0_0_20px_#D4AF37]"
                        initial={{ width: "0%" }}
                        animate={{ width: isFocused ? "100%" : "0%" }}
                        transition={{ duration: 0.5, ease: "circOut" }}
                    />

                    <motion.button
                        className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 hover:opacity-100 text-[#D4AF37] text-sm uppercase tracking-widest font-bold"
                        animate={{ opacity: email.length > 0 ? 1 : 0, x: email.length > 0 ? 0 : 20 }}
                    >
                        Join
                    </motion.button>
                </div>

                <p className="mt-8 text-white/20 text-xs font-mono tracking-widest uppercase">
                    No spam. Just early access & exclusive drops.
                </p>

            </div>

            <div className="absolute bottom-0 w-full border-t border-white/5 bg-black/50 backdrop-blur-md">
                <div className="flex whitespace-nowrap py-3 animate-marquee">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="flex gap-8 mx-4 items-center opacity-40">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">Priority Access Available</span>
                            <span className="w-1 h-1 bg-[#D4AF37] rounded-full"></span>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">Limited Spots</span>
                            <span className="w-1 h-1 bg-[#D4AF37] rounded-full"></span>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
}
