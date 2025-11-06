import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  Sky,
  ContactShadows,
  PerspectiveCamera,
  useTexture
} from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom, DepthOfField, Vignette, SSAO } from '@react-three/postprocessing';
// ==================== MATERIALS ====================
const createWoodMaterial = (color = '#654321') => {
  return new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.8,
    metalness: 0.2,
  });
};

const createFabricMaterial = (color = '#8B4513') => {
  return new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.9,
    metalness: 0.05,
  });
};

const createMetalMaterial = (color = '#C0C0C0') => {
  return new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.3,
    metalness: 0.9,
  });
};

const createGlassMaterial = () => {
  return new THREE.MeshPhysicalMaterial({
    color: '#ffffff',
    transparent: true,
    opacity: 0.3,
    roughness: 0.1,
    metalness: 0.1,
    transmission: 0.9,
    thickness: 0.5,
  });
};

// ==================== ROOM WALLS ====================
function RoomWalls({ wallColor, floorColor, roomType }) {
  const wallHeight = 5;
  const roomDimensions = {
    living: { width: 12, depth: 10 },
    bedroom: { width: 10, depth: 10 },
    kitchen: { width: 8, depth: 8 },
    dining: { width: 10, depth: 8 },
  };

  const { width, depth } = roomDimensions[roomType] || { width: 10, depth: 10 };

  return (
    <group>
      {/* Floor with realistic material */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial
          color={floorColor || '#D2B48C'}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, wallHeight / 2, -depth / 2]} receiveShadow castShadow>
        <boxGeometry args={[width, wallHeight, 0.2]} />
        <meshStandardMaterial
          color={wallColor || '#FFFFFF'}
          roughness={0.9}
          metalness={0.05}
        />
      </mesh>

      {/* Left Wall */}
      <mesh
        position={[-width / 2, wallHeight / 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
        castShadow
      >
        <boxGeometry args={[depth, wallHeight, 0.2]} />
        <meshStandardMaterial
          color={wallColor || '#FFFFFF'}
          roughness={0.9}
          metalness={0.05}
        />
      </mesh>

      {/* Right Wall */}
      <mesh
        position={[width / 2, wallHeight / 2, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        receiveShadow
        castShadow
      >
        <boxGeometry args={[depth, wallHeight, 0.2]} />
        <meshStandardMaterial
          color={wallColor || '#FFFFFF'}
          roughness={0.9}
          metalness={0.05}
        />
      </mesh>

      {/* Window on back wall */}
      <mesh position={[0, 3, -depth / 2 + 0.15]} castShadow>
        <boxGeometry args={[3, 2, 0.1]} />
        <meshPhysicalMaterial
          color="#87CEEB"
          transparent
          opacity={0.3}
          roughness={0.1}
          metalness={0.9}
          transmission={0.8}
        />
      </mesh>

      {/* Window Frame */}
      <mesh position={[0, 3, -depth / 2 + 0.2]} castShadow>
        <boxGeometry args={[3.2, 2.2, 0.05]} />
        <meshStandardMaterial color="#654321" roughness={0.5} metalness={0.2} />
      </mesh>

      {/* Ceiling (optional for better lighting) */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, wallHeight, 0]} receiveShadow>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial color="#FAFAFA" roughness={0.9} metalness={0.05} />
      </mesh>

      {/* Baseboard */}
      <mesh position={[0, 0.1, -depth / 2 + 0.11]} castShadow>
        <boxGeometry args={[width, 0.2, 0.05]} />
        <meshStandardMaterial color="#654321" roughness={0.6} metalness={0.2} />
      </mesh>
    </group>
  );
}

// ==================== FURNITURE COMPONENTS ====================

// Enhanced Sofa
function Sofa({ position, color = '#8B4513' }) {
  return (
    <group position={position}>
      {/* Main seat */}
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 0.5, 1.2]} />
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Back cushions */}
      <mesh position={[0, 0.8, -0.45]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 0.9, 0.3]} />
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Left armrest */}
      <mesh position={[-1.15, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 0.8, 1.2]} />
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Right armrest */}
      <mesh position={[1.15, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 0.8, 1.2]} />
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Seat cushions */}
      {[-0.6, 0, 0.6].map((x, i) => (
        <mesh key={i} position={[x, 0.65, 0]} castShadow>
          <boxGeometry args={[0.7, 0.15, 1]} />
          <meshStandardMaterial color={color} roughness={0.6} metalness={0.1} />
        </mesh>
      ))}

      {/* Legs */}
      {[[-1.1, -0.5], [-1.1, 0.5], [1.1, -0.5], [1.1, 0.5]].map((pos, i) => (
        <mesh key={i} position={[pos[0], 0.1, pos[1]]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.2, 16]} />
          <meshStandardMaterial color="#2C2C2C" roughness={0.4} metalness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

// Coffee Table
function CoffeeTable({ position }) {
  return (
    <group position={position}>
      {/* Table top */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 0.08, 1]} />
        <meshStandardMaterial color="#654321" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Glass inlay */}
      <mesh position={[0, 0.545, 0]} castShadow>
        <boxGeometry args={[1.6, 0.02, 0.8]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.3}
          roughness={0.05}
          metalness={0.9}
          transmission={0.9}
        />
      </mesh>

      {/* Legs */}
      {[[-0.75, -0.75], [-0.75, 0.75], [0.75, -0.75], [0.75, 0.75]].map((pos, i) => (
        <mesh key={i} position={[pos[0], 0.25, pos[1]]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.5, 16]} />
          <meshStandardMaterial color="#4A3728" roughness={0.4} metalness={0.3} />
        </mesh>
      ))}

      {/* Lower shelf */}
      <mesh position={[0, 0.15, 0]} receiveShadow castShadow>
        <boxGeometry args={[1.6, 0.05, 0.9]} />
        <meshStandardMaterial color="#654321" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Decorative items on table */}
      <mesh position={[0.4, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.15, 16]} />
        <meshStandardMaterial color="#8B4513" roughness={0.7} metalness={0.1} />
      </mesh>
    </group>
  );
}

// TV Unit with TV
function TVUnit({ position }) {
  return (
    <group position={position}>
      {/* Main cabinet */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.5, 0.7, 0.6]} />
        <meshStandardMaterial color="#654321" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Cabinet doors */}
      {[-1.2, 0, 1.2].map((x, i) => (
        <mesh key={i} position={[x, 0.4, 0.31]} castShadow>
          <boxGeometry args={[0.9, 0.65, 0.02]} />
          <meshStandardMaterial color="#4A3728" roughness={0.4} metalness={0.1} />
        </mesh>
      ))}

      {/* Door handles */}
      {[-1.2, 0, 1.2].map((x, i) => (
        <mesh key={i} position={[x + 0.3, 0.4, 0.33]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.08, 8]} />
          <meshStandardMaterial color="#C0C0C0" roughness={0.2} metalness={0.9} />
        </mesh>
      ))}

      {/* TV Stand */}
      <mesh position={[0, 0.85, 0.1]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 0.1, 0.3]} />
        <meshStandardMaterial color="#2C2C2C" roughness={0.5} metalness={0.5} />
      </mesh>

      {/* TV Screen */}
      <mesh position={[0, 1.5, 0.15]} castShadow>
        <boxGeometry args={[2.5, 1.4, 0.08]} />
        <meshStandardMaterial color="#000000" roughness={0.2} metalness={0.8} emissive="#0a0a0a" emissiveIntensity={0.2} />
      </mesh>

      {/* TV Frame */}
      <mesh position={[0, 1.5, 0.12]} castShadow>
        <boxGeometry args={[2.6, 1.5, 0.02]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* TV Stand */}
      <mesh position={[0, 0.78, 0.15]} castShadow>
        <cylinderGeometry args={[0.08, 0.12, 0.08, 16]} />
        <meshStandardMaterial color="#2C2C2C" roughness={0.4} metalness={0.6} />
      </mesh>
    </group>
  );
}

// King Bed
function Bed({ position }) {
  return (
    <group position={position}>
      {/* Bed frame base */}
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.8, 0.4, 3.2]} />
        <meshStandardMaterial color="#4A3728" roughness={0.5} metalness={0.2} />
      </mesh>

      {/* Mattress */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.6, 0.3, 3]} />
        <meshStandardMaterial color="#F5F5F5" roughness={0.8} metalness={0.05} />
      </mesh>

      {/* Headboard */}
      <mesh position={[0, 1.2, -1.55]} castShadow receiveShadow>
        <boxGeometry args={[2.8, 1.8, 0.15]} />
        <meshStandardMaterial color="#654321" roughness={0.4} metalness={0.2} />
      </mesh>

      {/* Headboard padding */}
      <mesh position={[0, 1.2, -1.48]} castShadow>
        <boxGeometry args={[2.4, 1.4, 0.1]} />
        <meshStandardMaterial color="#8B7355" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Pillows */}
      {[-0.7, 0.7].map((x, i) => (
        <mesh key={i} position={[x, 0.75, -1]} castShadow>
          <boxGeometry args={[0.6, 0.2, 0.4]} />
          <meshStandardMaterial color="#FFE4B5" roughness={0.9} metalness={0.05} />
        </mesh>
      ))}

      {/* Blanket */}
      <mesh position={[0, 0.7, 0.5]} castShadow>
        <boxGeometry args={[2.4, 0.15, 2]} />
        <meshStandardMaterial color="#4169E1" roughness={0.8} metalness={0.05} />
      </mesh>

      {/* Bed legs */}
      {[[-1.3, -1.5], [-1.3, 1.5], [1.3, -1.5], [1.3, 1.5]].map((pos, i) => (
        <mesh key={i} position={[pos[0], 0.1, pos[1]]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.2, 16]} />
          <meshStandardMaterial color="#2C2C2C" roughness={0.4} metalness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

// Wardrobe
function Wardrobe({ position }) {
  return (
    <group position={position}>
      {/* Main body */}
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 3, 0.8]} />
        <meshStandardMaterial color="#654321" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Doors */}
      {[-0.55, 0.55].map((x, i) => (
        <mesh key={i} position={[x, 1.5, 0.41]} castShadow>
          <boxGeometry args={[1, 2.8, 0.03]} />
          <meshStandardMaterial color="#4A3728" roughness={0.4} metalness={0.1} />
        </mesh>
      ))}

      {/* Handles */}
      {[-0.55, 0.55].map((x, i) => (
        <mesh key={i} position={[x + (i === 0 ? 0.3 : -0.3), 1.5, 0.43]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.4, 16]} />
          <meshStandardMaterial color="#C0C0C0" roughness={0.2} metalness={0.9} />
        </mesh>
      ))}

      {/* Top detail */}
      <mesh position={[0, 3.05, 0]} castShadow>
        <boxGeometry args={[2.3, 0.1, 0.85]} />
        <meshStandardMaterial color="#4A3728" roughness={0.4} metalness={0.2} />
      </mesh>
    </group>
  );
}

// Dining Table
function DiningTable({ position }) {
  return (
    <group position={position}>
      {/* Table top */}
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 0.08, 1.5]} />
        <meshStandardMaterial color="#654321" roughness={0.2} metalness={0.3} />
      </mesh>

      {/* Table top finish */}
      <mesh position={[0, 0.79, 0]} castShadow>
        <boxGeometry args={[2.45, 0.01, 1.45]} />
        <meshStandardMaterial color="#8B6914" roughness={0.1} metalness={0.5} />
      </mesh>

      {/* Legs */}
      {[[-1, -0.6], [-1, 0.6], [1, -0.6], [1, 0.6]].map((pos, i) => (
        <mesh key={i} position={[pos[0], 0.38, pos[1]]} castShadow>
          <cylinderGeometry args={[0.06, 0.08, 0.75, 16]} />
          <meshStandardMaterial color="#4A3728" roughness={0.4} metalness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

// Dining Chair
function DiningChair({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Seat */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 0.08, 0.5]} />
        <meshStandardMaterial color="#654321" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Backrest */}
      <mesh position={[0, 0.85, -0.22]} castShadow>
        <boxGeometry args={[0.5, 0.7, 0.06]} />
        <meshStandardMaterial color="#654321" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Legs */}
      {[[-0.18, -0.18], [-0.18, 0.18], [0.18, -0.18], [0.18, 0.18]].map((pos, i) => (
        <mesh key={i} position={[pos[0], 0.25, pos[1]]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.5, 16]} />
          <meshStandardMaterial color="#4A3728" roughness={0.4} metalness={0.3} />
        </mesh>
      ))}

      {/* Seat cushion */}
      <mesh position={[0, 0.545, 0]} castShadow>
        <boxGeometry args={[0.45, 0.05, 0.45]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} metalness={0.05} />
      </mesh>
    </group>
  );
}

// Kitchen Cabinet
function KitchenCabinet({ position }) {
  return (
    <group position={position}>
      {/* Lower cabinets */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 1, 0.7]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.4} metalness={0.3} />
      </mesh>

      {/* Countertop */}
      <mesh position={[0, 1.02, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.05, 0.75]} />
        <meshStandardMaterial color="#2C2C2C" roughness={0.2} metalness={0.5} />
      </mesh>

      {/* Upper cabinets */}
      <mesh position={[0, 2.2, -0.2]} castShadow receiveShadow>
        <boxGeometry args={[3, 1.2, 0.5]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.4} metalness={0.3} />
      </mesh>

      {/* Cabinet doors lower */}
      {[-1, 0, 1].map((x, i) => (
        <mesh key={i} position={[x, 0.5, 0.36]} castShadow>
          <boxGeometry args={[0.85, 0.9, 0.02]} />
          <meshStandardMaterial color="#F5F5F5" roughness={0.5} metalness={0.2} />
        </mesh>
      ))}

      {/* Cabinet doors upper */}
      {[-1, 0, 1].map((x, i) => (
        <mesh key={i} position={[x, 2.2, -0.19]} castShadow>
          <boxGeometry args={[0.85, 1.1, 0.02]} />
          <meshStandardMaterial color="#F5F5F5" roughness={0.5} metalness={0.2} />
        </mesh>
      ))}

      {/* Handles lower */}
      {[-1, 0, 1].map((x, i) => (
        <mesh key={i} position={[x + 0.3, 0.5, 0.38]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.08, 8]} />
          <meshStandardMaterial color="#C0C0C0" roughness={0.2} metalness={0.9} />
        </mesh>
      ))}

      {/* Backsplash */}
      <mesh position={[0, 1.5, -0.34]} castShadow>
        <boxGeometry args={[3.2, 0.8, 0.02]} />
        <meshStandardMaterial color="#E8E8E8" roughness={0.3} metalness={0.3} />
      </mesh>
    </group>
  );
}

// Plant decoration
function Plant({ position }) {
  return (
    <group position={position}>
      {/* Pot */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.12, 0.3, 16]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Plant stem */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
        <meshStandardMaterial color="#228B22" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Leaves */}
      {[0, 0.15, 0.3, 0.45].map((y, i) => (
        <React.Fragment key={i}>
          <mesh position={[0.1, 0.5 + y, 0]} rotation={[0, 0, Math.PI / 4 + (i * 0.2)]} castShadow>
            <boxGeometry args={[0.15, 0.02, 0.2]} />
            <meshStandardMaterial color="#228B22" roughness={0.6} metalness={0.1} />
          </mesh>
          <mesh position={[-0.1, 0.5 + y, 0]} rotation={[0, 0, -Math.PI / 4 - (i * 0.2)]} castShadow>
            <boxGeometry args={[0.15, 0.02, 0.2]} />
            <meshStandardMaterial color="#228B22" roughness={0.6} metalness={0.1} />
          </mesh>
        </React.Fragment>
      ))}
    </group>
  );
}

// Side Table
function SideTable({ position }) {
  return (
    <group position={position}>
      {/* Table top */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.25, 0.25, 0.05, 32]} />
        <meshStandardMaterial color="#654321" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Drawer */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.23, 0.23, 0.15, 32]} />
        <meshStandardMaterial color="#4A3728" roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Handle */}
      <mesh position={[0, 0.4, 0.24]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.06, 8]} />
        <meshStandardMaterial color="#C0C0C0" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Legs */}
      {[0, Math.PI / 2, Math.PI, -Math.PI / 2].map((angle, i) => (
        <mesh key={i} position={[Math.cos(angle) * 0.18, 0.15, Math.sin(angle) * 0.18]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.3, 16]} />
          <meshStandardMaterial color="#4A3728" roughness={0.4} metalness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

// Bookshelf
function Bookshelf({ position }) {
  return (
    <group position={position}>
      {/* Main frame */}
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 3, 0.4]} />
        <meshStandardMaterial color="#654321" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Shelves */}
      {[0.5, 1, 1.5, 2, 2.5].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.4, 0.03, 0.38]} />
          <meshStandardMaterial color="#8B6914" roughness={0.2} metalness={0.3} />
        </mesh>
      ))}

      {/* Books (decorative) */}
      {[0.65, 1.15, 1.65, 2.15].map((y, i) => (
        <React.Fragment key={i}>
          <mesh position={[-0.5, y, 0]} castShadow>
            <boxGeometry args={[0.3, 0.2, 0.35]} />
            <meshStandardMaterial color={['#8B0000', '#00008B', '#006400', '#8B4513'][i]} roughness={0.7} metalness={0.1} />
          </mesh>
          <mesh position={[-0.15, y, 0]} castShadow>
            <boxGeometry args={[0.25, 0.2, 0.35]} />
            <meshStandardMaterial color={['#4B0082', '#FF8C00', '#2F4F4F', '#800000'][i]} roughness={0.7} metalness={0.1} />
          </mesh>
        </React.Fragment>
      ))}
    </group>
  );
}

// ==================== ROOM CONFIGURATIONS ====================
const roomConfigurations = {
  living: {
    name: 'Living Room',
    icon: '🛋️',
    dimensions: { width: 12, depth: 10 },
    camera: [10, 7, 10],
    furniture: {
      'sofa-3seat': { component: Sofa, position: [0, 0, 3], props: { color: '#8B4513' } },
      'sofa-2seat': { component: Sofa, position: [-3, 0, 3], props: { color: '#A0522D' } },
      'coffee-table': { component: CoffeeTable, position: [0, 0, 1] },
      'tv-unit': { component: TVUnit, position: [0, 0, -4.5] },
      'side-table': { component: CoffeeTable, position: [3, 0, 3] },
    },
  },
  bedroom: {
    name: 'Bedroom',
    icon: '🛏️',
    dimensions: { width: 10, depth: 10 },
    camera: [9, 6, 9],
    furniture: {
      'king-bed': { component: Bed, position: [0, 0, -1] },
      'queen-bed': { component: Bed, position: [0, 0, -1] },
      'wardrobe': { component: Wardrobe, position: [-3.5, 0, -3] },
      'bedside-table': { component: CoffeeTable, position: [2, 0, -1] },
      'dresser': { component: Wardrobe, position: [3.5, 0, 2] },
    },
  },
  dining: {
    name: 'Dining Room',
    icon: '🍽️',
    dimensions: { width: 10, depth: 8 },
    camera: [8, 6, 8],
    furniture: {
      'dining-table-6': { component: DiningTable, position: [0, 0, 0] },
      'dining-table-4': { component: DiningTable, position: [0, 0, 0] },
      'dining-chairs': {
        component: () => (
          <>
            <DiningChair position={[0, 0, -1.2]} rotation={[0, 0, 0]} />
            <DiningChair position={[0, 0, 1.2]} rotation={[0, Math.PI, 0]} />
            <DiningChair position={[-1.5, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
            <DiningChair position={[1.5, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
          </>
        ),
      },
    },
  },
  kitchen: {
    name: 'Kitchen',
    icon: '🍳',
    dimensions: { width: 8, depth: 8 },
    camera: [7, 5, 7],
    furniture: {
      'modular-basic': { component: KitchenCabinet, position: [0, 0, -3.5] },
      'modular-premium': { component: KitchenCabinet, position: [0, 0, -3.5] },
      'kitchen-island': { component: DiningTable, position: [0, 0, 0] },
    },
  },
};

// ==================== MAIN 3D SCENE ====================
export default function Room3DScene({ wallColor = '#FFFFFF', floorColor = '#D2B48C', furniture = [], currentRoom }) {
  // Controls & UI state
  const [autoRotate, setAutoRotate] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(currentRoom || 'living');

  // New lighting + dimensions states (added per your request)
  const [lightingMode, setLightingMode] = useState('day'); // 'day' | 'evening' | 'night'
  const [showDimensions, setShowDimensions] = useState(true);

  const roomConfig = roomConfigurations[selectedRoom];
  const furnitureIds = furniture || [];

  // Lighting configuration helper
  const getLightingConfig = () => {
    switch (lightingMode) {
      case 'day':
        return {
          ambientIntensity: 0.6,
          sunIntensity: 1.2,
          sunPosition: [10, 15, 5],
          skyTurbidity: 2,
          skyRayleigh: 0.5,
        };
      case 'evening':
        return {
          ambientIntensity: 0.4,
          sunIntensity: 0.6,
          sunPosition: [5, 5, 10],
          skyTurbidity: 5,
          skyRayleigh: 2,
        };
      case 'night':
        return {
          ambientIntensity: 0.2,
          sunIntensity: 0.3,
          sunPosition: [-10, -5, -10],
          skyTurbidity: 10,
          skyRayleigh: 0,
        };
      default:
        return {
          ambientIntensity: 0.6,
          sunIntensity: 1.2,
          sunPosition: [10, 15, 5],
          skyTurbidity: 2,
          skyRayleigh: 0.5,
        };
    }
  };

  const lightConfig = getLightingConfig();

  return (
    <div className="space-y-4">
      {/* Room Selector */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {Object.entries(roomConfigurations).map(([key, config]) => (
          <button
            key={key}
            onClick={() => setSelectedRoom(key)}
            className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
              selectedRoom === key
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-indigo-300 hover:shadow-md'
            }`}
          >
            <span className="text-2xl">{config.icon}</span>
            <span>{config.name}</span>
          </button>
        ))}
      </div>

      {/* 3D Canvas */}
      <div className="relative w-full h-[600px] rounded-2xl overflow-hidden border-4 border-indigo-200 shadow-2xl bg-gradient-to-b from-sky-200 to-sky-100">
        <Canvas camera={{ position: roomConfig.camera, fov: 60 }} shadows dpr={[1, 2]}>
          {/* Dynamic Lighting based on mode */}
          <ambientLight intensity={lightConfig.ambientIntensity} />
          <directionalLight
            position={lightConfig.sunPosition}
            intensity={lightConfig.sunIntensity}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />

          {/* Indoor lights (more prominent at night) */}
          <pointLight
            position={[0, 4.5, 0]}
            intensity={lightingMode === 'night' ? 1.5 : 0.3}
            color="#FFF8DC"
            castShadow
          />
          <pointLight
            position={[-3, 4, -3]}
            intensity={lightingMode === 'night' ? 1.0 : 0.2}
            color="#FFF8DC"
          />
          <pointLight
            position={[3, 4, 3]}
            intensity={lightingMode === 'night' ? 1.0 : 0.2}
            color="#FFF8DC"
          />

          {/* Enhanced Sky */}
          <Sky
            distance={450000}
            sunPosition={lightConfig.sunPosition}
            inclination={0.6}
            azimuth={0.25}
            turbidity={lightConfig.skyTurbidity}
            rayleigh={lightConfig.skyRayleigh}
          />

          {/* Environment reflections */}
          <Environment preset="apartment" />

          {/* Room */}
          <RoomWalls wallColor={wallColor} floorColor={floorColor} roomType={selectedRoom} />

          {/* Furniture based on selection */}
          {furnitureIds.map((furnitureId) => {
            const furnitureData = roomConfig.furniture[furnitureId];
            if (!furnitureData) return null;

            const FurnitureComponent = furnitureData.component;
            return (
              <FurnitureComponent
                key={furnitureId}
                position={furnitureData.position}
                {...(furnitureData.props || {})}
              />
            );
          })}

          {/* Optional dimension overlays (simple red lines) */}
          {showDimensions && (
            <>
              <mesh position={[0, 1.5, roomConfig.dimensions.depth / 2 + 0.02]}>
                <boxGeometry args={[roomConfig.dimensions.width, 0.02, 0.02]} />
                <meshBasicMaterial color="red" />
              </mesh>
              <mesh position={[roomConfig.dimensions.width / 2 + 0.02, 1, 0]}>
                <boxGeometry args={[0.02, roomConfig.dimensions.height || 2, 0.02]} />
                <meshBasicMaterial color="red" />
              </mesh>
            </>
          )}

          {/* Decorative plants */}
          <Plant position={[-4, 0, -3]} />
          <Plant position={[4, 0, 3]} />

          {/* Contact Shadows for realism */}
          <ContactShadows position={[0, 0, 0]} opacity={0.5} scale={15} blur={2} far={4} />
{/* Post-processing effects for realism */}
<EffectComposer>
  <Bloom 
    intensity={0.3} 
    luminanceThreshold={0.9} 
    luminanceSmoothing={0.9}
  />
  <DepthOfField 
    focusDistance={0.01} 
    focalLength={0.05} 
    bokehScale={2}
  />
  <Vignette 
    offset={0.5} 
    darkness={0.5}
  />
  <SSAO 
    samples={31}
    radius={5}
    intensity={30}
  />
</EffectComposer>
          {/* Controls */}
          <OrbitControls
            enableZoom={true}
            autoRotate={autoRotate}
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2.2}
            minDistance={6}
            maxDistance={20}
            enablePan={false}
          />
          
        </Canvas>

        {/* Enhanced Control Panel */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-xl flex items-center gap-3">
          {/* Lighting Mode Toggle */}
          <div className="flex gap-2">
            {[
              { mode: 'day', icon: '☀️', label: 'Day' },
              { mode: 'evening', icon: '🌅', label: 'Evening' },
              { mode: 'night', icon: '🌙', label: 'Night' },
            ].map(({ mode, icon, label }) => (
              <button
                key={mode}
                onClick={() => setLightingMode(mode)}
                className={`px-3 py-2 rounded-full font-semibold transition-all text-sm ${
                  lightingMode === mode
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                title={label}
              >
                {icon}
              </button>
            ))}
          </div>

          <div className="w-px h-6 bg-gray-300" />

          {/* Auto Rotate */}
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-4 py-2 rounded-full font-semibold transition-all ${
              autoRotate ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {autoRotate ? '⏸️' : '▶️'}
          </button>

          <div className="w-px h-6 bg-gray-300" />

          {/* Dimensions Toggle */}
          <button
            onClick={() => setShowDimensions(!showDimensions)}
            className={`px-4 py-2 rounded-full font-semibold transition-all ${
              showDimensions ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            📐
          </button>

          <span className="text-sm text-gray-600 hidden lg:inline">🖱️ Drag • 🔍 Scroll</span>
        </div>

        {/* Room Info Badge */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
          🏠 {roomConfig.name}
        </div>

        {/* Furniture Count Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold shadow-lg">
          <span className="text-indigo-600">{furnitureIds.length}</span> items placed
        </div>
      </div>
    </div>
  );
}