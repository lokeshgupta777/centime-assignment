import {
  Button,
  Card,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import {
  ISankeyData,
  ISankeyLink,
  ISankeyNode,
} from "../../SankeyChart/SankeyChart";
import styles from "../../CashFlow/CashFlowModal.module.css";
import { useEffect, useState } from "react";
import getValidNodes from "../../../utils/getValidNodes";
import isSankeyGraphCyclic from "../../../utils/isSankeyGraphCyclic";
import { colorMap } from "../../../constants/colorMap";
import isLinkExist from "../../../utils/isLinkExist";
import styles2 from "./AddLinkModal.module.css"

export interface IAddLinkModal {
  openAddModal: boolean;
  setOpenAddModal: React.Dispatch<boolean>;
  cashFlowSankeyData: ISankeyData;
  setCashFlowSankeyData: React.Dispatch<ISankeyData | null>;
}

const AddLink = ({
  cashFlowSankeyData,
  setCashFlowSankeyData,
  setOpenAddModal,
  openAddModal,
}: IAddLinkModal) => {
  const [selectedFromNode, setSelectedFromNode] = useState<number>(-1);
  const [selectedToNode, setSelectedToNode] = useState<number>(-1);
  const [selectedToNodeName, setSelectedToNodeName] = useState("");
  const [linkValue, setLinkValue] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const reset = () => {
    setSelectedFromNode(-1);
    setSelectedToNode(-1);
    setSelectedToNodeName("");
    setLinkValue("");
    setErrMsg("");
  };

  useEffect(() => {
    openAddModal && reset();
  }, [openAddModal]);

  const validNodes = getValidNodes(cashFlowSankeyData?.links ?? []);

  const addLinkHandler = () => {
    const newLink: ISankeyLink = {
      source: selectedFromNode,
      target: selectedToNode,
      value: +linkValue,
    };

    const tmpCashFlowSankeyLinks: ISankeyLink[] = [
      ...cashFlowSankeyData.links,
      newLink,
    ];
    if (isSankeyGraphCyclic(tmpCashFlowSankeyLinks)) {
      setErrMsg("Can't add link. This would create a cycle.");
      return;
    }
    if (isLinkExist(cashFlowSankeyData.links, newLink)) {
      setErrMsg("Can't add link. Link already exists.");
      return;
    }
    const tmpCashFlowSankeyNodes: ISankeyNode[] = [...cashFlowSankeyData.nodes];
    if (selectedToNode === cashFlowSankeyData.nodes.length)
      tmpCashFlowSankeyNodes.push({
        name: selectedToNodeName,
        color: colorMap[selectedToNode % 10],
      });
    setCashFlowSankeyData({
      nodes: tmpCashFlowSankeyNodes,
      links: tmpCashFlowSankeyLinks,
    });
    setOpenAddModal(false);
  };

  return (
    <Card className={styles.card}>
      <div className={styles2.addModalfields}>
        <div className={styles2.addModalfield}>
          <span>From</span>
          <Select
            value={selectedFromNode}
            onChange={(e) => {
              setSelectedFromNode(+e.target.value);
              setErrMsg("");
            }}
            size="small"
            fullWidth
          >
            {cashFlowSankeyData.nodes.map((node, index) => {
              if (!validNodes[index]) return null;
              return <MenuItem value={index}>{node.name}</MenuItem>;
            })}
          </Select>
        </div>
        <div className={styles2.addModalfield}>
          <span>To</span>
          <Select
            value={selectedToNode}
            onChange={(e) => {
              setSelectedToNode(+e.target.value);
              setErrMsg("");
            }}
            size="small"
            fullWidth={selectedToNode !== cashFlowSankeyData.nodes.length}
            disabled={selectedFromNode === -1}
            style={{ overflow: "hidden", minWidth: "100px" }}
          >
            {cashFlowSankeyData.nodes.map((node, index) => {
              if (!validNodes[index]) return null;
              return <MenuItem value={index}>{node.name}</MenuItem>;
            })}
            <MenuItem value={cashFlowSankeyData.nodes.length}>Other</MenuItem>
          </Select>
          {selectedToNode === cashFlowSankeyData.nodes.length && (
            <TextField
              type="text"
              size="small"
              value={selectedToNodeName}
              onChange={(e) => setSelectedToNodeName(e.target.value)}
            />
          )}
        </div>
        <div className={styles2.addModalfield}>
          <span>Value</span>
          <TextField
            disabled={
              selectedToNode === -1 ||
              (selectedToNode === cashFlowSankeyData.nodes.length &&
                !selectedToNodeName)
            }
            value={linkValue}
            onChange={(e) => setLinkValue(e.target.value)}
            size="small"
            fullWidth
          />
        </div>
      </div>
      {errMsg && <p className={styles2.addErrMsg}>{errMsg}</p>}
      <div className={styles2.addActionBtns}>
        <Button
          variant="outlined"
          color="error"
          className={styles.button}
          onClick={() => setOpenAddModal(false)}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          className={styles.button}
          onClick={() => addLinkHandler()}
        >
          Add Link
        </Button>
      </div>
    </Card>
  );
};

const AddLinkModal = (props: IAddLinkModal) => {
  const { openAddModal, setOpenAddModal } = props;

  return (
    <Modal open={openAddModal} onClose={() => setOpenAddModal(false)}>
      <AddLink {...props} />
    </Modal>
  );
};

export default AddLinkModal;
