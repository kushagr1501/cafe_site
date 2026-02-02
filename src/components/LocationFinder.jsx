import { useState } from 'react';
import { motion } from 'framer-motion';

const locations = [
    {
        id: 1,
        name: 'Pelita',
        address: 'Regency Park No. 41',
        hours: '08:00 - 22:00',
        phone: '+62 778 123 4567',
        image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1000',
        coords: '1.1301° N, 104.0529° E'
    },
    {
        id: 2,
        name: 'Tiban',
        address: 'Stevonica Ruko No. 2',
        hours: '08:00 - 22:00',
        phone: '+62 778 765 4321',
        image: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&q=80&w=1000',
        coords: '1.1167° N, 103.9917° E'
    }
];

function LocationPanel({ location, isActive, onHover, onLeave }) {
    return (
        <motion.div
            className="relative h-[50vh] md:h-screen w-full md:w-auto flex-1 overflow-hidden border-b md:border-b-0 md:border-r border-white/10 group cursor-pointer md:cursor-none"
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            onClick={onHover} // Ensure click works on mobile
            animate={{
                flex: isActive ? 2 : 1,
                opacity: isActive ? 1 : 0.6
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="absolute inset-0 bg-[#0F0F0F] z-0">
                <motion.div
                    className="absolute inset-0 w-full h-full"
                    animate={{ scale: isActive ? 1.05 : 1.15 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                    <img
                        src={location.image}
                        alt={location.name}
                        className="w-full h-full object-cover grayscale brightness-[0.6] group-hover:grayscale-0 group-hover:brightness-75 transition-all duration-700"
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>

            <div className="absolute inset-0 z-10 p-8 md:p-12 flex flex-col justify-end md:justify-between items-start">

                <div className="hidden md:block w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 transform -translate-y-4 group-hover:translate-y-0">
                    <div className="flex justify-between items-start border-t border-white/20 pt-6">
                        <div>
                            <p className="font-mono text-xs text-[#D4AF37] mb-1">COORDINATES</p>
                            <p className="font-mono text-xs text-white/60">{location.coords}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-mono text-xs text-[#D4AF37] mb-1">CONTACT</p>
                            <p className="font-mono text-xs text-white/60">{location.phone}</p>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <motion.h2
                        className="text-6xl md:text-8xl lg:text-9xl font-display uppercase leading-[0.8] text-white overflow-hidden"
                        layout
                    >
                        {location.name}
                    </motion.h2>

                    <motion.div
                        className="h-1 bg-[#D4AF37] mt-4"
                        initial={{ width: 0 }}
                        animate={{ width: isActive ? 100 : 0 }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                    />

                    <div className="mt-6 overflow-hidden">
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: isActive ? 0 : "100%" }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <p className="text-xl md:text-2xl font-serif text-white/90 mb-2">{location.address}</p>
                            <p className="font-mono text-sm uppercase tracking-widest text-white/50">{location.hours}</p>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-0 group-hover:scale-100 mix-blend-difference hidden md:flex items-center justify-center w-32 h-32 bg-white rounded-full z-20">
                <span className="text-black font-bold uppercase tracking-widest text-xs">View Map</span>
            </div>

        </motion.div>
    );
}

export default function LocationFinder() {
    const [activeLocation, setActiveLocation] = useState(1);

    return (
        <section className="relative w-full bg-[#0F0F0F] flex flex-col md:flex-row overflow-hidden border-t border-white/10">
            {locations.map((loc) => (
                <LocationPanel
                    key={loc.id}
                    location={loc}
                    isActive={activeLocation === loc.id}
                    onHover={() => setActiveLocation(loc.id)}
                    onLeave={() => setActiveLocation(null)}
                />
            ))}

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none mix-blend-difference hidden md:block">
                <span className="font-serif italic text-2xl text-white/40">or</span>
            </div>
        </section>
    );
}
