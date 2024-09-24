import { colorMap } from "../../../constants/colorMap";
import { INodeDetails } from "../../../services/api/getCashFlowApi";
import { ISankeyData } from "../../SankeyChart/SankeyChart";

const formatCashFlowData = (nodeDetails: INodeDetails[]): ISankeyData => {
  const tmpCashFlowSankey: ISankeyData = {
    links: [],
    nodes: [],
  };

  nodeDetails.forEach((node, index) => {
    tmpCashFlowSankey.nodes.push({
      name: node.name,
      color: colorMap[index % 10],
    });
    node.targets.forEach((target) => {
      tmpCashFlowSankey.links.push({
        source: node.id,
        target: target.id,
        value: target.value,
      });
    });
  });
  return tmpCashFlowSankey;
};

export default formatCashFlowData;
