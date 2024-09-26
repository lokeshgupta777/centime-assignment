import { Rectangle, Layer } from "recharts";

const SankeyNodeWithTitle = (props: any) => {
  const { x, y, width, height, index, payload,containerWidth } = props;
  const isOut = x + width + 6 > containerWidth;
  if (!(payload?.sourceNodes?.length || payload?.targetNodes?.length))
    return null;
  return (
    <Layer key={`SankeyNodeWithTitle${index}`}>
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        fill={payload.color ?? "#5192ca"}
        fillOpacity="1"
      />
      <text
        textAnchor="start"
        x={isOut ? x - 6 : x + width + 6}
        y={y + height / 2}
        fontSize="14"
        stroke="#333"
      >
        {payload.name}
      </text>
      <text
        textAnchor="start"
        x={isOut ? x - 6 : x + width + 6}
        y={y + height / 2 + 13}
        fontSize="12"
        stroke="#333"
        strokeOpacity="0.5"
      >
        {`${payload.value}`}
      </text>
    </Layer>
  );
};

export default SankeyNodeWithTitle;
