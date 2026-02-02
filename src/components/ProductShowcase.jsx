import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const products = [
    {
        id: 1,
        name: 'Signature Latte',
        desc: 'Velvety steamed milk over rich espresso with a hint of roasted caramel.',
        price: '$6.50',
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=1000&auto=format&fit=crop',
        tag: 'Bestseller'
    },
    {
        id: 2,
        name: 'Iced Mocha',
        desc: 'Cold brew, premium cocoa, and fresh cream over ice.',
        price: '$7.00',
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=1000&auto=format&fit=crop',
        tag: 'Popular'
    },
    {
        id: 3,
        name: 'M. Matcha',
        desc: 'Ceremonial grade matcha from Kyoto, whisked to perfection.',
        price: '$8.00',
        image: 'https://images.unsplash.com/photo-1582785513054-8d1bf9d69c1a?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        tag: 'Imported'
    },
    {
        id: 4,
        name: 'Classic Cortado',
        desc: 'Equal parts espresso and milk. The purist’s choice.',
        price: '$5.50',
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop',
        tag: 'Classic'
    }
];

export default function ProductShowcase() {
    const [activeId, setActiveId] = useState(1);

    return (
        <section className="h-screen w-full bg-[#0F0F0F] overflow-hidden flex flex-col md:flex-row relative">



            {products.map((product) => (
                <motion.div
                    key={product.id}
                    className="relative h-full border-b md:border-b-0 md:border-r border-white/5 overflow-hidden cursor-pointer group"
                    onMouseEnter={() => setActiveId(product.id)}
                    onClick={() => setActiveId(product.id)}
                    animate={{
                        flex: activeId === product.id ? 3 : 1,
                        filter: activeId === product.id ? 'grayscale(0%)' : 'grayscale(100%) brightness(0.5)'
                    }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ flex: 1 }}
                >
                    <div className="absolute inset-0 bg-[#0F0F0F]">
                        <motion.img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover opacity-60"
                            animate={{ scale: activeId === product.id ? 1.05 : 1.15 }}
                            transition={{ duration: 1.2 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
                    </div>

                    <div className={`absolute bottom-8 md:bottom-12 left-8 md:left-1/2 md:-translate-x-1/2 transition-opacity duration-500 z-10 ${activeId === product.id ? 'opacity-0' : 'opacity-100'}`}>
                        <span className="text-white/30 text-lg md:text-xl font-mono">0{product.id}</span>
                    </div>

                    <AnimatePresence>
                        {activeId === product.id && (
                            <motion.div
                                className="absolute inset-x-0 bottom-0 p-6 md:p-12 z-20"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                <div className="flex justify-between items-end mb-2 md:mb-4 border-b border-white/20 pb-2 md:pb-4">
                                    <h3 className="text-3xl md:text-6xl lg:text-7xl font-display uppercase leading-none text-white">
                                        {product.name}
                                    </h3>
                                    <span className="text-xl md:text-3xl font-display text-[#D4AF37]">{product.price}</span>
                                </div>

                                <div className="flex justify-between items-start flex-col md:flex-row gap-4">
                                    <p className="font-serif text-sm md:text-lg text-white/70 max-w-md leading-relaxed line-clamp-2 md:line-clamp-none">
                                        {product.desc}
                                    </p>
                                    <button className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-white hover:text-[#D4AF37] transition-colors">
                                        Order Now <span className="text-lg">→</span>
                                    </button>
                                </div>

                                <div className="absolute top-0 right-6 md:right-12 -translate-y-[150%] md:-translate-y-[200%]">
                                    <span className="bg-[#D4AF37] text-black text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-2 py-1 md:px-3 md:py-1">
                                        {product.tag}
                                    </span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="md:hidden absolute inset-0 flex items-center justify-center p-4 text-center pointer-events-none">
                        <h3 className={`text-2xl font-display uppercase text-white/50 transition-opacity duration-300 ${activeId === product.id ? 'opacity-0' : 'opacity-100'}`}>
                            {product.name.split(' ')[0]}
                        </h3>
                    </div>

                </motion.div>
            ))}
        </section>
    );
}
