// GLBViewer.tsx - With position control added
import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Html } from '@react-three/drei';

interface ModelProps {
  url: string;
  position?: [number, number, number];
  scale?: number;
}

function Model({ url, position = [0, 0, 0], scale = 1 }: ModelProps) {
  const { scene } = useGLTF(url);
  const groupRef = useRef(null);

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <primitive object={scene} dispose={null} />
    </group>
  );
}

function LoaderFallback() {
  return (
    <Html center>
      <div className="bg-white bg-opacity-80 px-4 py-2 rounded-lg shadow">
        <p className="text-gray-800 font-medium">Loading model...</p>
      </div>
    </Html>
  )
}

interface GLBViewerProps {
  glbPath: string;
  cameraFov?: number;
  cameraPosition?: [number, number, number];
  modelPosition?: [number, number, number]; // Added model position control
  modelScale?: number; // Added scale control
  ambientLightIntensity?: number;
  directionalLightIntensity?: number;
  directionalLightPosition?: [number, number, number];
  enableShadows?: boolean;
  environmentPreset?: 'sunset' | 'dawn' | 'night' | 'warehouse' | 'forest' | 'apartment' | 'studio' | 'city' | 'park' | 'lobby' | null;
  backgroundColor?: string;
  height?: string; // Added height control
  width?: string; // Added width control
}

const GLBViewer: React.FC<GLBViewerProps> = ({
  glbPath,
  cameraFov = 50,
  cameraPosition = [0, 0, 2],
  modelPosition = [5, 0, 0], // Default center position for model
  modelScale = 1,
  ambientLightIntensity = 0.5,
  directionalLightIntensity = 1.0,
  directionalLightPosition = [5, 5, 5],
  enableShadows = true,
  environmentPreset = 'sunset',
  backgroundColor = '#f0f0f0',
  height = '100%',
  width = '100%',
}) => {

  return (
    <Canvas
      shadows={enableShadows}
      camera={{ position: cameraPosition, fov: cameraFov }}
      style={{ height, width, background: backgroundColor }}
    >
      <ambientLight intensity={ambientLightIntensity} />
      <directionalLight
        position={directionalLightPosition}
        intensity={directionalLightIntensity}
        castShadow={enableShadows}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      {environmentPreset && <Environment preset={environmentPreset} />}

      <Suspense fallback={<LoaderFallback />}>
        <Model 
          url={glbPath} 
          position={modelPosition} 
          scale={modelScale} 
        />
        {enableShadows && (
          <mesh 
            rotation={[-Math.PI / 2, 0, 0]} 
            position={[0, modelPosition[1] - 10, 0]} // Adjust shadow position relative to model
            receiveShadow
          >
            <planeGeometry args={[10, 10]} />
            <shadowMaterial opacity={0.3} />
          </mesh>
        )}
      </Suspense>

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        enableDamping={true}
        dampingFactor={0.1}
        target={[modelPosition[0], modelPosition[1], modelPosition[2]]} // Set orbit target to model position
      />
    </Canvas>
  );
};

export default GLBViewer;