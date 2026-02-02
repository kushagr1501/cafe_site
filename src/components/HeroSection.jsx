import { useRef, useLayoutEffect } from 'react';
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

    const lavenderMaterial = new THREE.MeshPhysicalMaterial({
        color: '#B5A0D9',
        roughness: 0.3,
        metalness: 0.1,
        clearcoat: 0.5,
        flatShading: true
    });

    const blackMaterial = new THREE.MeshStandardMaterial({
        color: '#1a1a1a',
        roughness: 0.8
    });

    const scale = isMobile ? 0.65 : 0.85;
    const position = isMobile ? [0, 0.5, 0] : [0.2, -0.2, 0];

    return (
        <group ref={ref} scale={scale} rotation={[0, -Math.PI / 4, 0]} position={position}>
            <mesh position={[0, -0.8, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.7, 0.9, 1.4, 8]} />
                <primitive object={lavenderMaterial} />
            </mesh>
            <mesh position={[0, -0.05, 0]}>
                <cylinderGeometry args={[0.71, 0.71, 0.1, 8]} />
                <meshStandardMaterial color="#6E5C8F" roughness={0.4} />
            </mesh>
            <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.9, 0.7, 1.4, 8]} />
                <primitive object={lavenderMaterial} />
            </mesh>
            <mesh position={[0, 1.5, 0]}>
                <coneGeometry args={[0.91, 0.4, 8]} />
                <primitive object={lavenderMaterial} />
            </mesh>
            <mesh position={[0, 1.75, 0]}>
                <cylinderGeometry args={[0.15, 0.1, 0.3, 8]} />
                <primitive object={blackMaterial} />
            </mesh>
            <mesh position={[0.7, 1.3, 0]} rotation={[0, 0, -Math.PI / 4]}>
                <coneGeometry args={[0.15, 0.5, 8]} />
                <primitive object={lavenderMaterial} />
            </mesh>
            <group position={[-0.9, 0.5, 0]}>
                <mesh position={[0, -0.4, 0]} rotation={[0, 0, 0.1]}>
                    <boxGeometry args={[0.2, 1.2, 0.15]} />
                    <primitive object={blackMaterial} />
                </mesh>
                <mesh position={[0.25, 0.15, 0]} rotation={[0, 0, 0]}>
                    <boxGeometry args={[0.5, 0.15, 0.15]} />
                    <primitive object={blackMaterial} />
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
            <ambientLight intensity={0.7} />
            <spotLight position={[5, 10, 5]} angle={0.5} penumbra={0.5} intensity={2} color="#fff" castShadow />
            <spotLight position={[-8, 5, -5]} angle={0.5} penumbra={1} intensity={3} color="#D8BFD8" />
            <pointLight position={[0, -2, 4]} intensity={1} color="#fff" />
            <Environment preset="studio" />
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
                <MokaPot isMobile={isMobile} />
            </Float>
            <Sparkles count={25} scale={5} size={4} speed={0.5} opacity={0.5} color="#D8BFD8" />
            <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={3} far={4} color="black" />
        </>
    );
}

export default function HeroSection() {
    const container = useRef(null);
    const textLeft = useRef(null);
    const textRight = useRef(null);

    useLayoutEffect(() => {
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
    }, []);

    return (
        <section ref={container} className="relative h-screen w-full bg-[#111] overflow-hidden flex flex-col items-center justify-center">
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
                <Canvas dpr={[1, 2]} gl={{ antialias: true }} shadows>
                    <SceneContent />
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
