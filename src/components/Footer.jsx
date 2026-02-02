

const footerLinks = [
    {
        title: "Menu",
        links: ['Signature Espresso', 'Pour Over', 'Cold Brew', 'Artisan Tea', 'Seasonal Pastries']
    },
    {
        title: "Company",
        links: ['Our Story', 'Roastery', 'Wholesale', 'Careers', 'Contact']
    },
    {
        title: "Social",
        links: ['Instagram', 'Twitter', 'TikTok', 'LinkedIn', 'Spotify']
    },
    {
        title: "Legal",
        links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Sitemap']
    }
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-[#050505] text-[#f5f5f5] pt-24 pb-8 overflow-hidden relative">

            <div className="max-w-7xl mx-auto px-6 md:px-12 mb-24 relative z-10">

                <div className="flex justify-between items-start mb-20">
                    <div className="max-w-md">
                        <h3 className="text-2xl font-serif italic text-white/60 mb-6">
                            "Refining the culture of coffee, one cup at a time."
                        </h3>
                    </div>

                    <button
                        onClick={scrollToTop}
                        className="group w-16 h-16 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                    >
                        <span className="text-xl transform group-hover:-translate-y-1 transition-transform">↑</span>
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
                    {footerLinks.map((column, idx) => (
                        <div key={idx}>
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37] mb-8">
                                {column.title}
                            </h4>
                            <ul className="space-y-4">
                                {column.links.map((link) => (
                                    <li key={link}>
                                        <a href="#" className="block text-sm md:text-base text-white/60 hover:text-white transition-colors duration-300 relative group w-max">
                                            {link}
                                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

            </div>

            <div className="relative border-t border-white/10 pt-12 md:pt-0 pb-12 md:pb-0">
                <h1 className="text-[25vw] leading-[0.7] font-display font-bold text-center text-transparent bg-clip-text bg-gradient-to-b from-white/80 to-white/20 tracking-widest select-none pointer-events-none">
                    KOBIE
                </h1>

                <div className="relative md:absolute mt-16 md:mt-0 md:bottom-6 w-full flex flex-col md:flex-row justify-between items-center px-6 md:px-12 text-[10px] font-mono text-white/50 uppercase tracking-widest gap-2">
                    <span>© {currentYear} Kobie Coffee Co.</span>
                    <span className="hidden md:block w-1 h-1 bg-white/20 rounded-full"></span>
                    <span>Batam, Indonesia</span>
                    <span className="hidden md:block w-1 h-1 bg-white/20 rounded-full"></span>
                    <span>All Rights Reserved</span>
                </div>
            </div>

        </footer>
    );
}
