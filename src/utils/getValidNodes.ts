import { ISankeyLink } from "../components/SankeyChart/SankeyChart";

const getValidNodes = (links: ISankeyLink[]) => {
  const validNodes: Record<number, true> = {};
  links.forEach((link) => {
    validNodes[link.source] = true;
    validNodes[link.target] = true;
  });
  return validNodes;
};

export default getValidNodes;
