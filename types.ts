import { SimulationNodeDatum, SimulationLinkDatum } from 'd3-force';

export interface CharacterNode extends SimulationNodeDatum {
  id: string;
  name: string; // English/Pinyin
  cnName: string; // Chinese
  description: string; // English description
  cnDescription: string; // Chinese description
  group: 'human' | 'eto' | 'trisolaran' | 'other';
  val: number; // Importance/Size
  imgUrl?: string; // Generated image
  isGeneratingImage?: boolean;
  x?: number;
  y?: number;
  z?: number;
}

export interface CharacterLink extends SimulationLinkDatum<CharacterNode> {
  source: string | CharacterNode;
  target: string | CharacterNode;
  value: number; // 1 (distant) to 10 (close). Used for distance calc.
}

export interface GraphData {
  nodes: CharacterNode[];
  links: CharacterLink[];
}

export interface RelationshipResponse {
  summary: string;
}