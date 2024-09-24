import { ISankeyLink } from "../components/SankeyChart/SankeyChart";

let nodesEdges: Record<number, number[]> = {};
let visitedNodes: Record<number, boolean> = {};

const detectCycleInGraph = (sourceNode: number): boolean => {
  const targetNodes = nodesEdges[sourceNode] ?? [];
  let isCyclic = false;

  for (const target of targetNodes) {
    if (visitedNodes[target]) {
      isCyclic = true;
      break;
    }
    visitedNodes[target] = true;
    isCyclic = detectCycleInGraph(target);
    if (isCyclic) break;
    visitedNodes[target] = false;
  }
  return isCyclic;
};

const isSankeyGraphCyclic = (links: ISankeyLink[]) => {
  nodesEdges = {};
  visitedNodes = {};
  links.forEach((link) => {
    const tmpNodeEdges = nodesEdges[link.source] ?? [];
    tmpNodeEdges.push(link.target);
    nodesEdges[link.source] = tmpNodeEdges;
  });
  visitedNodes[0] = true;
  return detectCycleInGraph(0);
};

export default isSankeyGraphCyclic;
