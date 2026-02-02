import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function CappuccinoCup() {
    const groupRef = useRef();

    // Create heart shape once, not every frame
    const heartShape = useMemo(() => {
        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.bezierCurveTo(1, 1, 2, -1, 0, -2);
        shape.bezierCurveTo(-2, -1, -1, 1, 0, 0);
        return shape;
    }, []);

    useFrame((state) => {
        const { x, y } = state.pointer;
        if (groupRef.current) {
            // Gentle sway based on mouse
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.5 + 0.5, 0.1); // Add slight offset
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.2, 0.1);
        }
    });

    return (
        <Float
            speed={2}
            rotationIntensity={0.5}
            floatIntensity={1}
            floatingRange={[-0.1, 0.1]}
        >
            <group ref={groupRef} position={[0, -1, 0]} rotation={[0.2, 0, 0]}>

                {/* DEBUG MESH - If you see this red box, the canvas is working */}
                {/* <mesh position={[0,2,0]}>
            <boxGeometry />
            <meshBasicMaterial color="red" />
        </mesh> */}

                {/* CUP BODY - Ceramic */}
                <mesh position={[0, 0, 0]}>
                    <cylinderGeometry args={[1.2, 0.9, 1.8, 32]} />
                    <meshStandardMaterial
                        color="#FFFFFF"
                        roughness={0.1}
                        metalness={0.1}
                    />
                </mesh>

                {/* CUP HANDLE */}
                <mesh position={[1.0, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <torusGeometry args={[0.5, 0.15, 16, 32, Math.PI]} />
                    <meshStandardMaterial
                        color="#FFFFFF"
                        roughness={0.1}
                        metalness={0.1}
                    />
                </mesh>

                {/* COFFEE LIQUID SURFACE */}
                <mesh position={[0, 0.72, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <circleGeometry args={[1.0, 32]} />
                    <MeshDistortMaterial
                        color="#4B2E2A" // Deep coffee
                        distort={0.2}
                        speed={2}
                        roughness={0.5}
                    />
                </mesh>

                {/* LATTE ART GROUP */}
                <group position={[0, 0.73, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    {/* Foam circle */}
                    <mesh position={[0, 0.1, 0]}>
                        <circleGeometry args={[0.5, 32]} />
                        <meshStandardMaterial color="#E6C8B0" roughness={0.8} />
                    </mesh>
                    {/* Heart detail */}
                    <mesh position={[0, 0.1, 0.01]} scale={[0.15, 0.15, 0.15]} rotation={[0, 0, Math.PI]}>
                        <shapeGeometry args={[heartShape]} />
                        <meshStandardMaterial color="#FFFFFF" />
                    </mesh>
                </group>

                {/* SAUCER */}
                <mesh position={[0, -1, 0]}>
                    <cylinderGeometry args={[1.6, 1.8, 0.15, 32]} />
                    <meshStandardMaterial
                        color="#FFFFFF"
                        roughness={0.1}
                    />
                </mesh>

                {/* STEAM PARTICLES */}
                <Steam />

            </group>
        </Float>
    );
}

function Steam() {
    return (
        <group position={[0, 1, 0]}>
            {[...Array(3)].map((_, i) => (
                <SteamParticle key={i} delay={i * 2} />
            ))}
        </group>
    );
}

function SteamParticle({ delay }) {
    const ref = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        const cycle = (t + delay) % 3; // 0 to 3s cycle

        if (ref.current) {
            // Rise up
            ref.current.position.y = cycle * 1.5;
            // Wiggle
            ref.current.position.x = Math.sin(t * 2 + delay) * 0.2;
            // Fade out and scale up
            const opacity = 1 - (cycle / 3);
            ref.current.scale.setScalar(0.5 + cycle * 0.5);
            ref.current.material.opacity = Math.max(0, opacity * 0.3);
        }
    });

    return (
        <mesh ref={ref}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshBasicMaterial color="#FFFFFF" transparent opacity={0.3} depthWrite={false} />
        </mesh>
    );
}
