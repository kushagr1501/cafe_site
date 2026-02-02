import { useRef, useLayoutEffect, Suspense} from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, ContactShadows, Sparkles, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
function MokaPot({ isMobile }) {
    const ref = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (ref.current) {
            ref.current.rotation.y = Math.sin(t * 0.3) * 0.2;
            ref.current.position.y = Math.sin(t * 1) * 0.1;
        }
    });

    const detail = isMobile ? 32 : 64;
    const shadowEnabled = !isMobile;


    const glassConfig = {
        color: '#ffffff',
        transmission: 1.0,      
        thickness: 0.5,        
        roughness: 0.05,        
        ior: 1.5,
        clearcoat: 1.0,
        attenuationTint: '#ffffff',
        attenuationDistance: 0.5,
        envMapIntensity: 1.0,
        transparent: true,
        side: THREE.DoubleSide  
    };

    const coffeeConfig = {
        color: '#1a0f00',       
        roughness: 0.4,
        metalness: 0.0,
    };

    const chromeConfig = {
        color: '#ffffff',
        roughness: 0.1,
        metalness: 1.0,
        envMapIntensity: 1.5
    };

    const blackConfig = {
        color: '#050505',
        roughness: 0.5,
        metalness: 0.1
    };

    const scale = isMobile ? 0.55 : 0.75;
    const position = isMobile ? [0, 0.5, 0] : [0.2, -0.2, 0];

    return (
        <group ref={ref} scale={scale} rotation={[0, -Math.PI / 4, 0]} position={position}>

            <group position={[0, -0.8, 0]}>
                <mesh castShadow={shadowEnabled} receiveShadow={shadowEnabled}>
                    <cylinderGeometry args={[0.7, 0.9, 1.4, detail]} />
                    <meshPhysicalMaterial {...glassConfig} />
                </mesh>
                <mesh scale={[0.94, 0.95, 0.94]}>
                    <cylinderGeometry args={[0.7, 0.9, 1.3, detail]} />
                    <meshStandardMaterial {...coffeeConfig} />
                </mesh>
            </group>

            <mesh position={[0, -0.05, 0]}>
                <cylinderGeometry args={[0.72, 0.72, 0.15, detail]} />
                <meshPhysicalMaterial {...chromeConfig} />
            </mesh>

            <mesh position={[0, 0.1, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 0.4, 16]} />
                <meshStandardMaterial color="#888888" roughness={0.2} metalness={1.0} />
            </mesh>

            <group position={[0, 0.7, 0]}>
                <mesh castShadow={shadowEnabled} receiveShadow={shadowEnabled}>
                    <cylinderGeometry args={[0.9, 0.7, 1.4, detail]} />
                    <meshPhysicalMaterial {...glassConfig} />
                </mesh>
                <mesh scale={[0.94, 0.6, 0.94]} position={[0, -0.25, 0]}>
                    <cylinderGeometry args={[0.9, 0.7, 1.4, detail]} />
                    <meshStandardMaterial {...coffeeConfig} />
                </mesh>
            </group>

            <group position={[0, 1.5, 0]}>
                <mesh>
                    <cylinderGeometry args={[0.91, 0.4, 0.2, detail]} />
                    <meshPhysicalMaterial {...glassConfig} />
                </mesh>
                <mesh position={[0, 0.2, 0]}>
                    <coneGeometry args={[0.91, 0.4, detail]} />
                    <meshPhysicalMaterial {...glassConfig} />
                </mesh>
            </group>

            <mesh position={[0, 2.0, 0]}>
                <cylinderGeometry args={[0.15, 0.1, 0.35, detail]} />
                <meshStandardMaterial {...blackConfig} />
            </mesh>
            <mesh position={[0, 2.2, 0]}>
                <sphereGeometry args={[0.12, detail, detail]} />
                <meshStandardMaterial {...blackConfig} />
            </mesh>
            <mesh position={[0.65, 1.3, 0]} rotation={[0, 0, -Math.PI / 6]}>
                <cylinderGeometry args={[0.15, 0.25, 0.6, detail]} />
                <meshPhysicalMaterial {...glassConfig} />
            </mesh>

            <group position={[-0.95, 0.5, 0]}>
                <mesh position={[0, -0.4, 0]} rotation={[0, 0, 0.05]}>
                    <capsuleGeometry args={[0.12, 1.2, 8, 16]} />
                    <meshStandardMaterial {...blackConfig} />
                </mesh>
                <mesh position={[0.3, 0.3, 0]} rotation={[0, 0, -Math.PI / 2]}>
                    <capsuleGeometry args={[0.1, 0.4, 8, 16]} />
                    <meshStandardMaterial {...blackConfig} />
                </mesh>
            </group>
        </group>
    );
}

function SceneContent() {
    const cameraRef = useRef();
    const { camera, viewport } = useThree();
    const isMobile = viewport.width < 5;

    useLayoutEffect(() => {
        camera.position.set(0, 0, 10);
        const tl = gsap.timeline();
        tl.fromTo(camera.position,
            { z: 12, y: 1 },
            { z: 7.5, y: 0, duration: 2.5, ease: "power3.out" }
        );
    }, [camera]);

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 7.5]} fov={30} ref={cameraRef} />

            <ambientLight intensity={0.2} color="#ffffff" />

            <spotLight
                position={[5, 10, 5]}
                angle={0.5}
                penumbra={1}
                intensity={0.7}
                color="#ffffff"
                castShadow={!isMobile}
            />

            <spotLight
                position={[-5, 5, -5]}
                angle={0.5}
                penumbra={1}
                intensity={1.0}
                color="#dcd0ff"
            />

            <spotLight
                position={[0, -5, 5]}
                intensity={0.5}
                color="#8B4513"
            />

            <Environment preset="city" blur={1} />

            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
                <MokaPot isMobile={isMobile} />
            </Float>

            <Sparkles
                count={isMobile ? 15 : 25}
                scale={5}
                size={3}
                speed={0.4}
                opacity={0.3}
                color="#D8BFD8"
            />

            <ContactShadows
                position={[0, -2.5, 0]}
                opacity={0.4}
                scale={10}
                blur={2.5}
                far={4}
                color="#000000"
            />
        </>
    );
}
export default function HeroSection({ startAnimation = true }) {
    const container = useRef(null);
    const textLeft = useRef(null);
    const textRight = useRef(null);

    useLayoutEffect(() => {
        if (!startAnimation) return;

        let ctx = gsap.context(() => {
            const tl = gsap.timeline();
            tl.fromTo([textLeft.current, textRight.current],
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.5, ease: "power4.out", stagger: 0.2, delay: 0.5 }
            );

            gsap.to(textLeft.current, {
                x: -100,
                scrollTrigger: {
                    trigger: container.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1
                }
            });

            gsap.to(textRight.current, {
                x: 100,
                scrollTrigger: {
                    trigger: container.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1
                }
            });

        }, container);

        return () => ctx.revert();
    }, [startAnimation]);

    return (
        <section ref={container} className="relative h-screen w-full bg-[#050505] overflow-hidden flex flex-col items-center justify-center">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[20%] w-[60%] h-[60%] bg-[#B5A0D9]/10 blur-[150px] rounded-full" />
            </div>

            <div className="absolute inset-0 z-0 flex flex-col justify-center md:grid md:grid-cols-2 items-center pointer-events-none select-none w-full h-full">
                <div className="flex justify-center md:justify-end items-center md:items-center md:pr-[12vw] pb-0 md:pb-0">
                    <h1
                        ref={textLeft}
                        className="text-[30vw] md:text-[20vw] leading-none font-display font-bold text-white tracking-[0.1em] mix-blend-overlay"
                    >
                        KO
                    </h1>
                </div>

                <div className="flex justify-center md:justify-start items-center md:items-center md:pl-[12vw] pt-0 md:pt-0">
                    <h1
                        ref={textRight}
                        className="text-[30vw] md:text-[20vw] leading-none font-display font-bold text-white tracking-[0.1em] mix-blend-overlay"
                    >
                        BIE
                    </h1>
                </div>
            </div>

            <div className="absolute inset-0 z-10 w-full h-full md:-translate-x-[2vw] hidden md:block">
                <Canvas dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: "high-performance" }} shadows>
                    <Suspense fallback={null}>
                        <SceneContent />
                    </Suspense>
                </Canvas>
            </div>

            <div className="absolute bottom-8 md:bottom-12 z-20 flex flex-col items-center gap-4 pointer-events-none px-4 text-center">
                <button
                    onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                    className="pointer-events-auto px-6 py-3 md:px-8 md:py-4 bg-white text-black text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-[#B5A0D9] hover:text-white transition-all duration-300 rounded-full"
                >
                    Shop Collection
                </button>
            </div>
        </section>
    );
}
