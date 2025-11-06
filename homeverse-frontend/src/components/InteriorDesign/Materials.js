import * as THREE from 'three';

// Create realistic materials
export const createWoodMaterial = (color = '#654321') => {
  return new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.8,
    metalness: 0.2,
    bumpScale: 0.002,
  });
};

export const createFabricMaterial = (color = '#8B4513') => {
  return new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.9,
    metalness: 0.05,
  });
};

export const createMetalMaterial = (color = '#C0C0C0') => {
  return new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.3,
    metalness: 0.9,
  });
};

export const createGlassMaterial = () => {
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

export const createMarbleMaterial = () => {
  return new THREE.MeshStandardMaterial({
    color: '#F5F5DC',
    roughness: 0.2,
    metalness: 0.6,
  });
};

// Flooring materials with realistic appearance
export const flooringMaterials = {
  wood: {
    color: '#8B4513',
    roughness: 0.7,
    metalness: 0.1,
  },
  tile: {
    color: '#E8E8E8',
    roughness: 0.3,
    metalness: 0.2,
  },
  marble: {
    color: '#F5F5DC',
    roughness: 0.2,
    metalness: 0.6,
  },
  carpet: {
    color: '#CD853F',
    roughness: 1.0,
    metalness: 0.0,
  },
  vinyl: {
    color: '#D3D3D3',
    roughness: 0.5,
    metalness: 0.1,
  }
};