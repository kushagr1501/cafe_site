import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, useTexture, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

// Premium Iced Latte Cup - Matching the reference image
export default function IcedLatteCup() {
    const groupRef = useRef();
    const liquidRef = useRef();
    const { viewport } = useThree();

    // Scale based on viewport for responsiveness
    const scale = Math.min(viewport.width / 8, 1.2);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        const { x, y } = state.pointer;

        if (groupRef.current) {
            // Smooth mouse follow rotation
            groupRef.current.rotation.y = THREE.MathUtils.lerp(
                groupRef.current.rotation.y,
                x * 0.4,
                0.05
            );
            groupRef.current.rotation.x = THREE.MathUtils.lerp(
                groupRef.current.rotation.x,
                -y * 0.15 + 0.1,
                0.05
            );
            // Subtle float
            groupRef.current.position.y = Math.sin(t * 0.8) * 0.08;
        }

        // Animate liquid swirl
        if (liquidRef.current) {
            liquidRef.current.rotation.y = t * 0.3;
        }
    });

    return (
        <Float
            speed={1.5}
            rotationIntensity={0.3}
            floatIntensity={0.5}
        >
            <group ref={groupRef} scale={scale} position={[0, -0.5, 0]}>

                {/* OUTER CUP - Transparent Plastic */}
                <mesh position={[0, 0, 0]}>
                    <cylinderGeometry args={[1.3, 1.0, 3.5, 32, 1, true]} />
                    <meshPhysicalMaterial
                        color="#FFFFFF"
                        transparent
                        opacity={0.15}
                        roughness={0}
                        metalness={0}
                        transmission={0.95}
                        thickness={0.5}
                        ior={1.5}
                        side={THREE.DoubleSide}
                    />
                </mesh>

                {/* COFFEE LAYERS - The Latte Effect */}
                <group ref={liquidRef}>
                    {/* Bottom Layer - Milk (Light Cream) */}
                    <mesh position={[0, -1.2, 0]}>
                        <cylinderGeometry args={[0.95, 0.9, 0.8, 32]} />
                        <meshStandardMaterial
                            color="#FAF5F0"
                            roughness={0.3}
                        />
                    </mesh>

                    {/* Middle Layer - Mixed (Gradient Effect) */}
                    <mesh position={[0, -0.5, 0]}>
                        <cylinderGeometry args={[1.0, 0.95, 1.2, 32]} />
                        <meshStandardMaterial
                            color="#D4A574"
                            roughness={0.4}
                        />
                    </mesh>

                    {/* Top Layer - Espresso (Dark) */}
                    <mesh position={[0, 0.35, 0]}>
                        <cylinderGeometry args={[1.1, 1.0, 1.0, 32]} />
                        <meshStandardMaterial
                            color="#6F4E37"
                            roughness={0.5}
                        />
                    </mesh>

                    {/* Top Surface */}
                    <mesh position={[0, 0.86, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                        <circleGeometry args={[1.1, 32]} />
                        <meshStandardMaterial
                            color="#5D3E2E"
                            roughness={0.6}
                        />
                    </mesh>
                </group>

                {/* ICE CUBES */}
                <IceCubes />

                {/* CUP LID */}
                <mesh position={[0, 1.8, 0]}>
                    <cylinderGeometry args={[1.35, 1.3, 0.15, 32]} />
                    <meshPhysicalMaterial
                        color="#FFFFFF"
                        transparent
                        opacity={0.8}
                        roughness={0.1}
                    />
                </mesh>

                {/* Lid Dome/Top */}
                <mesh position={[0, 1.95, 0]}>
                    <sphereGeometry args={[0.15, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshPhysicalMaterial
                        color="#FFFFFF"
                        transparent
                        opacity={0.8}
                        roughness={0.1}
                    />
                </mesh>

                {/* STRAW */}
                <group position={[0.3, 0, 0]} rotation={[0, 0, -0.15]}>
                    <mesh position={[0, 2.5, 0]}>
                        <cylinderGeometry args={[0.08, 0.08, 3.5, 16]} />
                        <meshStandardMaterial color="#8B3A3A" roughness={0.3} />
                    </mesh>
                </group>

                {/* SLOTH LOGO on Cup */}
                <mesh position={[0, -0.3, 1.15]} rotation={[0, 0, 0]}>
                    <planeGeometry args={[1.2, 1.2]} />
                    <meshStandardMaterial
                        color="#C9A86C"
                        transparent
                        opacity={0.4}
                        side={THREE.DoubleSide}
                    />
                </mesh>

                {/* Cup Bottom */}
                <mesh position={[0, -1.75, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <circleGeometry args={[1.0, 32]} />
                    <meshStandardMaterial color="#FFFFFF" transparent opacity={0.3} />
                </mesh>

            </group>
        </Float>
    );
}

// Ice Cubes Component
function IceCubes() {
    const cubes = useMemo(() => [
        { pos: [-0.3, 0.6, 0.3], rot: [0.3, 0.5, 0.2], scale: 0.35 },
        { pos: [0.4, 0.8, -0.2], rot: [-0.2, 0.3, 0.4], scale: 0.3 },
        { pos: [0, 0.4, -0.4], rot: [0.5, -0.3, 0.1], scale: 0.28 },
        { pos: [-0.2, 1.0, 0], rot: [0.1, 0.2, -0.3], scale: 0.32 },
        { pos: [0.3, 0.2, 0.2], rot: [-0.4, 0.1, 0.5], scale: 0.25 },
    ], []);

    return (
        <group>
            {cubes.map((cube, i) => (
                <mesh key={i} position={cube.pos} rotation={cube.rot} scale={cube.scale}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshPhysicalMaterial
                        color="#FFFFFF"
                        transparent
                        opacity={0.6}
                        roughness={0}
                        metalness={0}
                        transmission={0.8}
                        thickness={0.5}
                        ior={1.3}
                    />
                </mesh>
            ))}
        </group>
    );
}
