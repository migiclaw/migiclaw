import React, { useEffect, useState, useRef } from 'react';
import { CharacterNode } from '../types';
import { generateCharacterPortrait, getRelationshipDetails } from '../services/geminiService';
import { X, Sparkles, Loader2, Atom, Languages } from 'lucide-react';

interface OverlayProps {
  hoveredNode: CharacterNode | null;
  selectedNodes: CharacterNode[];
  onClearSelection: () => void;
  updateNodeImage: (id: string, url: string) => void;
}

const CharacterCard = ({ node, updateNodeImage }: { node: CharacterNode; updateNodeImage: (id: string, url: string) => void }) => {
  const [imgUrl, setImgUrl] = useState<string | null>(node.imgUrl || null);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced image generation on hover
  useEffect(() => {
    if (node.imgUrl) {
        setImgUrl(node.imgUrl);
        return;
    }

    setImgUrl(null);
    setLoading(true);

    // Fast response trigger (300ms)
    timerRef.current = setTimeout(async () => {
      if (!node.imgUrl) {
        const url = await generateCharacterPortrait(node.name, node.description);
        if (url) {
          setImgUrl(url);
          updateNodeImage(node.id, url);
        }
      }
      setLoading(false);
    }, 300);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      setLoading(false);
    };
  }, [node, updateNodeImage]);

  return (
    <div className="absolute top-4 right-4 w-96 bg-black/90 border border-blue-500/30 backdrop-blur-xl rounded-lg p-5 text-white shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300 animate-in fade-in slide-in-from-right-10 pointer-events-none select-none z-10">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h2 className="text-3xl font-orbitron text-blue-400 uppercase tracking-widest">{node.name}</h2>
          <h3 className="text-xl text-white font-bold">{node.cnName}</h3>
        </div>
        <div className={`px-2 py-0.5 text-xs font-bold border rounded ${
            node.group === 'eto' ? 'border-red-500 text-red-500' : 
            node.group === 'trisolaran' ? 'border-gray-300 text-gray-300' :
            'border-blue-400 text-blue-400'
        }`}>
            {node.group.toUpperCase()}
        </div>
      </div>

      <div className="relative aspect-square w-full bg-gray-900 rounded border border-gray-700 overflow-hidden mb-4 group">
        {imgUrl ? (
          <img src={imgUrl} alt={node.name} className="w-full h-full object-cover animate-in fade-in duration-500" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 relative">
             {/* Sci-fi scanner visual */}
             <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(59,130,246,0.2)_50%,transparent_100%)] animate-[scan_1.5s_ease-in-out_infinite]" style={{backgroundSize: '100% 200%'}} />
             
             {loading ? (
                 <>
                    <Loader2 className="w-10 h-10 animate-spin text-blue-500 mb-2" />
                    <span className="text-xs font-mono animate-pulse text-blue-400">GENERATING VISUAL DATA...</span>
                    <span className="text-xs font-mono text-blue-500/50 mt-1">图像生成中...</span>
                 </>
             ) : (
                 <span className="text-xs font-mono">WAITING FOR LINK...</span>
             )}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <p className="text-base text-gray-200 leading-relaxed font-bold">
            {node.cnDescription}
        </p>
        <p className="text-sm text-gray-400 leading-relaxed italic border-l-2 border-blue-500/50 pl-2">
            {node.description}
        </p>
      </div>
    </div>
  );
};

const RelationshipModal = ({ nodes, onClear }: { nodes: CharacterNode[]; onClear: () => void }) => {
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      setLoading(true);
      const text = await getRelationshipDetails(nodes[0].name, nodes[1].name);
      setAnalysis(text);
      setLoading(false);
    };
    fetchAnalysis();
  }, [nodes]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-2xl bg-black border border-blue-500/50 rounded-xl shadow-[0_0_50px_rgba(59,130,246,0.2)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800 bg-gray-900/50">
          <div className="flex items-center space-x-4">
             <div className="flex flex-col">
                <span className="text-xl font-bold font-orbitron text-white">{nodes[0].cnName}</span>
                <span className="text-xs text-gray-400">{nodes[0].name}</span>
             </div>
             <div className="h-px w-12 bg-blue-500"></div>
             <div className="flex flex-col text-right">
                <span className="text-xl font-bold font-orbitron text-white">{nodes[1].cnName}</span>
                <span className="text-xs text-gray-400">{nodes[1].name}</span>
             </div>
          </div>
          <button onClick={onClear} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 min-h-[200px]">
          {loading ? (
             <div className="flex flex-col items-center justify-center h-full space-y-4 text-blue-400">
                <Atom className="w-12 h-12 animate-spin" />
                <span className="font-mono text-sm tracking-widest">ANALYZING CAUSALITY...</span>
                <span className="font-mono text-xs opacity-70">关系演算中...</span>
             </div>
          ) : (
            <div className="prose prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-gray-200 whitespace-pre-line">
                {analysis}
              </p>
              <div className="mt-8 flex items-center space-x-2 text-xs text-blue-400/70 font-mono">
                <Sparkles size={12} />
                <span>AI ANALYSIS COMPLETE / 智能分析完成</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Overlay({ hoveredNode, selectedNodes, onClearSelection, updateNodeImage }: OverlayProps) {
  return (
    <>
      {/* HUD Header */}
      <div className="absolute top-0 left-0 p-6 z-10 pointer-events-none">
        <h1 className="text-4xl md:text-5xl font-orbitron text-white font-bold tracking-tighter drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]">
            THREE BODY <span className="text-2xl ml-2 font-normal text-blue-400">三体</span>
        </h1>
        <p className="text-blue-400 font-mono text-sm mt-1 tracking-[0.3em] uppercase opacity-80 flex items-center gap-2">
            Causal Relation Map <span className="opacity-50">|</span> 人物关系图谱
        </p>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-6 left-6 z-10 pointer-events-none text-gray-400 font-mono text-xs space-y-2 bg-black/50 p-4 rounded border border-white/10 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
            <div className="w-5 h-5 border border-gray-600 rounded flex items-center justify-center text-[10px]">L</div>
            <span className="tracking-wide">DRAG TO ROTATE / 拖拽旋转</span>
        </div>
        <div className="flex items-center space-x-3">
            <div className="w-5 h-5 border border-gray-600 rounded flex items-center justify-center text-[10px]">R</div>
            <span className="tracking-wide">PAN / 平移视角</span>
        </div>
        <div className="flex items-center space-x-3">
            <div className="w-5 h-5 border border-gray-600 rounded flex items-center justify-center text-[10px]">S</div>
            <span className="tracking-wide">SCROLL ZOOM / 滚轮缩放</span>
        </div>
        <div className="flex items-center space-x-3 text-blue-300">
            <div className="w-5 h-5 border border-blue-600 rounded flex items-center justify-center text-[10px]">●</div>
            <span className="tracking-wide">CLICK TWO STARS TO ANALYZE / 点击两人分析关系</span>
        </div>
      </div>

      {/* Hover Card */}
      {hoveredNode && (
        <CharacterCard node={hoveredNode} updateNodeImage={updateNodeImage} />
      )}

      {/* Selection Modal */}
      {selectedNodes.length === 2 && (
        <RelationshipModal nodes={selectedNodes} onClear={onClearSelection} />
      )}
      
      {/* Reset selection button if 1 selected */}
      {selectedNodes.length === 1 && (
        <button 
          onClick={onClearSelection}
          className="absolute bottom-10 right-10 z-10 bg-red-900/80 hover:bg-red-800 text-white px-6 py-2 rounded-full font-mono text-xs border border-red-500/50 backdrop-blur transition-all flex flex-col items-center"
        >
          <span>CANCEL SELECTION / 取消选择</span>
          <span className="text-[10px] opacity-70">({selectedNodes[0].cnName})</span>
        </button>
      )}
    </>
  );
}