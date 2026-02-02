import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Premium Coffee Bean - Interactive
function CoffeeBean({ position, rotation, scale = 1, speed = 1, mouse }) {
    const meshRef = useRef();
    const initialPos = useMemo(() => new THREE.Vector3(...position), [position]);

    // Random phase for organic movement
    const phase = useMemo(() => Math.random() * Math.PI * 2, []);

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.getElapsedTime() * speed;

        // Mouse interaction target
        const targetX = (mouse.current[0] * window.innerWidth) / 50;
        const targetY = (mouse.current[1] * window.innerHeight) / 50;

        // Organic floating
        meshRef.current.position.y = initialPos.y + Math.sin(t + phase) * 0.5 - (mouse.current[1] * 0.5);
        meshRef.current.position.x = initialPos.x + Math.cos(t * 0.5 + phase) * 0.3 - (mouse.current[0] * 0.5);

        // Continuous rotation
        meshRef.current.rotation.x = rotation[0] + t * 0.2;
        meshRef.current.rotation.y = rotation[1] + t * 0.3;
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef} position={position} rotation={rotation} scale={scale} castShadow>
                <capsuleGeometry args={[0.08, 0.18, 8, 16]} />
                <meshStandardMaterial
                    color="#3E2723"
                    roughness={0.4}
                    metalness={0.2}
                    envMapIntensity={1.5}
                />
            </mesh>
        </Float>
    );
}

// Background Scene System
function BeanField({ mouse }) {
    const count = 35; // More beans for richness
    const beans = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 22;
            const y = (Math.random() - 0.5) * 22;
            const z = (Math.random() - 0.5) * 8 - 2;
            temp.push({
                id: i,
                pos: [x, y, z],
                rot: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
                scale: 0.6 + Math.random() * 0.5,
                speed: 0.2 + Math.random() * 0.3
            });
        }
        return temp;
    }, []);

    return (
        <group>
            {beans.map((bean) => (
                <CoffeeBean
                    key={bean.id}
                    position={bean.pos}
                    rotation={bean.rot}
                    scale={bean.scale}
                    speed={bean.speed}
                    mouse={mouse}
                />
            ))}
        </group>
    );
}

export default function Scene3D() {
    const mouse = useRef([0, 0]);

    return (
        <div
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: -1 }}
            onMouseMove={(e) => {
                mouse.current = [
                    (e.clientX / window.innerWidth) * 2 - 1,
                    -(e.clientY / window.innerHeight) * 2 + 1
                ];
            }}
        >
            <Canvas
                camera={{ position: [0, 0, 10], fov: 35 }}
                dpr={[1, 2]} // Optimize for performance
                gl={{ antialias: true, alpha: true }}
            >
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} color="#FFF5E6" />
                <pointLight position={[-5, -5, -5]} intensity={0.8} color="#D4A574" />

                <BeanField mouse={mouse} />
                <Environment preset="city" />
            </Canvas>
        </div>
    );
}
