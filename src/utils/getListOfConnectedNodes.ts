import { ISankeyLink } from "../components/SankeyChart/SankeyChart";

const getListofConnectedNodesAndLinks = (
  links: ISankeyLink[],
  nodeToDelete: number
) => {
  const nodeQueue = [0];
  const connectedNodeIds = [0];
  const connectedLinks: ISankeyLink[] = [];
  while (nodeQueue.length) {
    const sourceNode = nodeQueue.shift();
    links.forEach((link) => {
      if (link.source === sourceNode && link.target !== nodeToDelete) {
        nodeQueue.push(link.target);
        connectedNodeIds.push(link.target);
        connectedLinks.push(link);
      }
    });
  }
  return {
    connectedNodeIds,
    connectedLinks,
  };
};

export default getListofConnectedNodesAndLinks;
