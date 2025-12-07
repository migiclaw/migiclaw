import React, { useState, useCallback } from 'react';
import StarGraphContainer from './components/StarGraph';
import Overlay from './components/Overlay';
import { INITIAL_DATA } from './constants';
import { CharacterNode, GraphData } from './types';

export default function App() {
  const [graphData, setGraphData] = useState<GraphData>(INITIAL_DATA);
  const [hoveredNode, setHoveredNode] = useState<CharacterNode | null>(null);
  const [selectedNodes, setSelectedNodes] = useState<CharacterNode[]>([]);

  const handleNodeHover = useCallback((node: CharacterNode | null) => {
    setHoveredNode(node);
  }, []);

  const handleNodeClick = useCallback((node: CharacterNode) => {
    setSelectedNodes((prev) => {
      // If already selected, deselect
      if (prev.find(n => n.id === node.id)) {
        return prev.filter(n => n.id !== node.id);
      }
      
      // If we have 2, reset and start new selection
      if (prev.length >= 2) {
        return [node];
      }

      // Add to selection
      return [...prev, node];
    });
  }, []);

  const handleClearSelection = useCallback(() => {
    setSelectedNodes([]);
  }, []);

  const updateNodeImage = useCallback((id: string, url: string) => {
    setGraphData(prev => ({
        ...prev,
        nodes: prev.nodes.map(n => n.id === id ? { ...n, imgUrl: url } : n)
    }));
  }, []);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <StarGraphContainer 
        data={graphData} 
        onNodeHover={handleNodeHover}
        onNodeClick={handleNodeClick}
        selectedNodes={selectedNodes}
      />
      <Overlay 
        hoveredNode={hoveredNode} 
        selectedNodes={selectedNodes}
        onClearSelection={handleClearSelection}
        updateNodeImage={updateNodeImage}
      />
    </div>
  );
}