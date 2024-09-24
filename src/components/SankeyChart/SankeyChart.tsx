import { ReactElement } from "react";
import { Sankey } from "recharts";
import { Tooltip } from "recharts";

export interface ISankeyNode {
  name: string;
  color?: string;
  [key: string]: any;
}

export interface ISankeyLink {
  source: number;
  target: number;
  value: number;
  [key: string]: any;
}

export interface ISankeyData {
  nodes: ISankeyNode[];
  links: ISankeyLink[];
}

export interface ISankeyChart {
  width?: number;
  height?: number;
  data: ISankeyData;
  nodeEle?: ReactElement;
  linkEle?: ReactElement;
  onClick?: (data: any) => void;
  onMouseEnter?: () => {};
  onMouseLeave?: () => {};
}

const SankeyChart = (props: ISankeyChart) => {
  const {
    width = 600,
    height = 300,
    data,
    nodeEle,
    linkEle,
    onClick,
    onMouseEnter,
    onMouseLeave,
  } = props;

  return (
    <Sankey
      sort={false}
      data={data}
      width={width}
      height={height}
      node={nodeEle}
      link={linkEle}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      nodePadding={80}
      iterations={1000}
    >
      <Tooltip />
    </Sankey>
  );
};

export default SankeyChart;
