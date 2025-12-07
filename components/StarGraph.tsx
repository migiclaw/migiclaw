import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, ThreeEvent, ThreeElements } from '@react-three/fiber';
import { OrbitControls, Text, Stars, Html, Line } from '@react-three/drei';
import * as THREE from 'three';
import * as d3 from 'd3-force';
import { CharacterNode, CharacterLink, GraphData } from '../types';

// Fix for missing JSX types in some environments
declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

interface StarGraphProps {
  data: GraphData;
  onNodeHover: (node: CharacterNode | null) => void;
  onNodeClick: (node: CharacterNode) => void;
  selectedNodes: CharacterNode[];
}

interface GraphNodeProps {
  node: CharacterNode;
  onHover: (node: CharacterNode | null) => void;
  onClick: (node: CharacterNode) => void;
  isSelected: boolean;
  isNeighbor: boolean;
}

const GraphNode: React.FC<GraphNodeProps> = ({ 
  node, 
  onHover, 
  onClick, 
  isSelected,
  isNeighbor 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.x = node.x || 0;
      meshRef.current.position.y = node.y || 0;
      meshRef.current.position.z = node.z || 0;
      
      // Pulse effect if selected or hovered
      const scaleTarget = isSelected ? 1.5 : hovered ? 1.3 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(scaleTarget, scaleTarget, scaleTarget), 0.1);
    }
  });

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
    onHover(node);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setHovered(false);
    onHover(null);
    document.body.style.cursor = 'auto';
  };

  const color = useMemo(() => {
    switch(node.group) {
      case 'eto': return '#ef4444';
      case 'trisolaran': return '#e5e7eb';
      case 'other': return '#a855f7';
      default: return '#3b82f6'; // human
    }
  }, [node.group]);

  // Determine visibility priority
  const isPriority = hovered || isSelected || isNeighbor || node.val >= 8;

  return (
    <group>
      <mesh
        ref={meshRef}
        onClick={(e) => { e.stopPropagation(); onClick(node); }}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <sphereGeometry args={[node.val * 0.12, 32, 32]} />
        <meshStandardMaterial 
          color={isSelected ? '#fbbf24' : color} 
          emissive={isSelected ? '#fbbf24' : color}
          emissiveIntensity={hovered || isSelected ? 3 : 1}
          roughness={0.2}
          metalness={0.8}
        />
        {(hovered || isSelected || isNeighbor) && (
            <mesh scale={[1.5, 1.5, 1.5]}>
                <sphereGeometry args={[node.val * 0.12, 16, 16]} />
                <meshBasicMaterial color={isSelected ? '#fbbf24' : color} transparent opacity={0.2} side={THREE.BackSide} />
            </mesh>
        )}
      </mesh>
      
      {/* Label - visible on hover or if selected/neighbor, or if node is "major" */}
      {meshRef.current && (
         <Html 
            position={[meshRef.current.position.x, meshRef.current.position.y + node.val * 0.15 + 0.5, meshRef.current.position.z]} 
            center 
            distanceFactor={5} // Smaller number = larger perceived size at distance
            style={{ 
                pointerEvents: 'none', 
                opacity: isPriority ? 1 : 0.8,
                zIndex: isPriority ? 100 : 0,
                width: '300px',
                textAlign: 'center'
            }}
         >
            <div className={`
              text-lg md:text-xl font-bold tracking-widest px-4 py-2 rounded-md bg-black/70 border border-white/20 whitespace-nowrap backdrop-blur-[2px] transition-all
              ${isSelected ? 'text-yellow-400 border-yellow-400 bg-black/90 scale-110' : 'text-white'}
              ${!isPriority ? 'scale-90 opacity-70' : 'scale-100 opacity-100'}
            `}>
              {node.cnName} 
              <div className={`text-xs uppercase font-light mt-0.5 ${isSelected ? 'text-yellow-200' : 'text-gray-300'}`}>
                  {node.name}
              </div>
            </div>
         </Html>
      )}
    </group>
  );
};

const Links = ({ links }: { links: CharacterLink[] }) => {
  return (
    <group>
        {links.map((link, i) => {
             const source = link.source as unknown as CharacterNode;
             const target = link.target as unknown as CharacterNode;
             
             if (!source || !target || typeof source !== 'object') return null;

             // Relationship Strength. 
             // Value 1 = Very close. Value 10 = Distant.
             // Line Thickness: Increase base thickness for better visibility
             const thickness = Math.max(1, 6 - (link.value * 0.5)); 
             const opacity = Math.max(0.3, 0.9 - (link.value * 0.08));

             return (
                 <Line
                    key={i}
                    points={[
                        [source.x || 0, source.y || 0, source.z || 0],
                        [target.x || 0, target.y || 0, target.z || 0]
                    ]}
                    color={link.value < 3 ? "#ffffff" : "#88ccff"}
                    lineWidth={thickness} 
                    transparent
                    opacity={opacity}
                    dashed={false}
                 />
             );
        })}
    </group>
  );
};

const ForceGraph = ({ data, onNodeHover, onNodeClick, selectedNodes }: StarGraphProps) => {
  const nodes = useMemo(() => data.nodes.map(n => ({ ...n })), [data]);
  const links = useMemo(() => data.links.map(l => ({ ...l })), [data]);

  const simulation = useRef<d3.Simulation<CharacterNode, CharacterLink> | null>(null);

  useEffect(() => {
    // Initialize Z depth closer to 0 for a flatter, more viewable map
    nodes.forEach((node) => {
        node.z = (Math.random() - 0.5) * 5; // Significantly reduced spread (was 12-20)
    });

    simulation.current = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance((d: any) => d.value * 1.5)) // Reduced distance (was 2.5) to compact graph
      .force('charge', d3.forceManyBody().strength(-15)) // Reduced repulsion (was -25) to keep nodes closer
      .force('center', d3.forceCenter(0, 0))
      .force('collide', d3.forceCollide().radius((d: any) => d.val * 0.5));

    return () => {
      simulation.current?.stop();
    };
  }, [nodes, links]);

  // Identify neighbors
  const neighborIds = useMemo(() => {
    const ids = new Set<string>();
    if (selectedNodes.length === 0) return ids;
    links.forEach((l: CharacterLink) => {
        const sId = typeof l.source === 'object' ? l.source.id : l.source;
        const tId = typeof l.target === 'object' ? l.target.id : l.target;
        
        if (selectedNodes.some(n => n.id === sId)) ids.add(String(tId));
        if (selectedNodes.some(n => n.id === tId)) ids.add(String(sId));
    });
    return ids;
  }, [selectedNodes, links]);

  return (
    <group>
      <Links links={links} />
      {nodes.map((node) => (
        <GraphNode 
            key={node.id} 
            node={node} 
            onHover={onNodeHover} 
            onClick={onNodeClick} 
            isSelected={selectedNodes.some(n => n.id === node.id)}
            isNeighbor={neighborIds.has(node.id)}
        />
      ))}
    </group>
  );
};

export default function StarGraphContainer(props: StarGraphProps) {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas camera={{ position: [0, 0, 25], fov: 45 }}>
        <fog attach="fog" args={['#000000', 10, 60]} />
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#aaaaff" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#ffaa00" />
        
        <Stars radius={60} depth={20} count={5000} factor={4} saturation={0} fade speed={0.5} />
        
        <ForceGraph {...props} />
        
        <OrbitControls 
            enablePan={true} 
            enableZoom={true} 
            enableRotate={true} 
            maxDistance={50}
            minDistance={5}
            zoomSpeed={1.2}
            rotateSpeed={0.8}
            dampingFactor={0.1}
        />
      </Canvas>
    </div>
  );
}