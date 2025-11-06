import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Create realistic floor with texture-like appearance
export function RealisticFloor({ floorType, dimensions }) {
  const getFloorMaterial = () => {
    const materials = {
      wood: {
        color: '#8B4513',
        roughness: 0.7,
        metalness: 0.1,
      },
      tile: {
        color: '#E8E8E8',
        roughness: 0.2,
        metalness: 0.3,
      },
      marble: {
        color: '#F5F5DC',
        roughness: 0.1,
        metalness: 0.7,
      },
      carpet: {
        color: '#CD853F',
        roughness: 1.0,
        metalness: 0.0,
      },
      vinyl: {
        color: '#D3D3D3',
        roughness: 0.4,
        metalness: 0.2,
      }
    };

    return materials[floorType] || materials.wood;
  };

  const material = getFloorMaterial();

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[dimensions.width, dimensions.depth]} />
      <meshStandardMaterial 
        {...material}
        envMapIntensity={0.5}
      />
    </mesh>
  );
}

// Realistic wall with bump mapping simulation
export function RealisticWall({ position, rotation, dimensions, color }) {
  return (
    <mesh position={position} rotation={rotation} receiveShadow castShadow>
      <boxGeometry args={dimensions} />
      <meshStandardMaterial 
        color={color}
        roughness={0.95}
        metalness={0.05}
        envMapIntensity={0.2}
      />
    </mesh>
  );
}