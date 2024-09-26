import { Button, Card, Modal } from "@mui/material";
import { ISelectedNodeInfo } from "../CashFlow";
import styles from "../../CashFlow/CashFlowModal.module.css";
import React, { useState } from "react";
import { ISankeyData } from "../../SankeyChart/SankeyChart";
import getListofConnectedNodesAndLinks from "../../../utils/getListOfConnectedNodes";
import getValidNodes from "../../../utils/getValidNodes";
import ConfirmModal from "../../ConfirmModal/ConfirmModal";

export interface IDeleteNodeModal {
  selectedNodeInfo: ISelectedNodeInfo | null;
  setSelectedNodeInfo: React.Dispatch<ISelectedNodeInfo | null>;
  cashFlowSankeyData: ISankeyData | null;
  setCashFlowSankeyData: React.Dispatch<ISankeyData | null>;
}

//TODO : Very thin links on adding any link after deleting the first link(Income - salary)
const DeleteNode = ({
  selectedNodeInfo,
  setSelectedNodeInfo,
  cashFlowSankeyData,
  setCashFlowSankeyData,
}: IDeleteNodeModal) => {
  const [newCashFlowSankeyData, setNewCashFlowSankeyData] =
    useState<ISankeyData | null>(null);
  const [extraNodesToDelete, setExtraNodesToDelete] = useState<string[]>([]);

  const reset = () => {
    setExtraNodesToDelete([]);
    setSelectedNodeInfo(null);
    setNewCashFlowSankeyData(null);
  };

  const validNodes = getValidNodes(cashFlowSankeyData?.links ?? []);

  const nodeDeleteHandler = () => {
    const { connectedLinks, connectedNodeIds } =
      getListofConnectedNodesAndLinks(
        cashFlowSankeyData?.links!,
        selectedNodeInfo?.index!
      );

    const tmpExtraNodesToDelete: string[] = [];

    cashFlowSankeyData?.nodes?.forEach((node, index) => {
      if (
        index !== selectedNodeInfo?.index &&
        !connectedNodeIds.includes(index) &&
        validNodes[index]
      )
        tmpExtraNodesToDelete.push(node.name);
    });

    if (tmpExtraNodesToDelete?.length) {
      setExtraNodesToDelete(tmpExtraNodesToDelete);
      setNewCashFlowSankeyData({
        nodes: cashFlowSankeyData?.nodes!,
        links: connectedLinks,
      });
    } else {
      setCashFlowSankeyData({
        nodes: cashFlowSankeyData?.nodes!,
        links: connectedLinks,
      });
      setSelectedNodeInfo(null);
    }
  };

  const confirmDeleteHandler = () => {
    setCashFlowSankeyData(newCashFlowSankeyData);
    reset();
  };

  return (
    <>
      <Card className={styles.card}>
        {selectedNodeInfo?.index === 0 ? (
          <p>{selectedNodeInfo?.name}(Root Node) cannot be deleted.</p>
        ) : (
          <p>
            You have Selected{" "}
            <span className={styles.valueChangeHead}>
              {selectedNodeInfo?.name}
            </span>{" "}
            that has a value of{" "}
            <span className={styles.valueChangeHead}>
              {selectedNodeInfo?.value}
            </span>
            . Do you wish to delete it?
          </p>
        )}
        <div className={styles.valueChange}>
          <Button
            variant="contained"
            onClick={() => setSelectedNodeInfo(null)}
            className={styles.button}
          >
            {selectedNodeInfo?.index === 0 ? "OK" : "Cancel"}
          </Button>
          {selectedNodeInfo?.index !== 0 && (
            <Button
              variant="outlined"
              color="error"
              onClick={() => nodeDeleteHandler()}
              className={styles.button}
            >
              Delete
            </Button>
          )}
        </div>
      </Card>ctric Bill will be delet
      <ConfirmModal
        openConfirmModal={!!extraNodesToDelete?.length}
        messsage={
          <>
            The following other nodes&nbsp;
            <span className={styles.valueChangeHead}>
              {extraNodesToDelete?.join(", ")}
            </span>
            &nbsp;will also be deleted. Do you wish to proceed?
          </>
        }
        onCancel={reset}
        onConfirm={confirmDeleteHandler}
      />
    </>
  );
};

const DeleteNodeModal = (props: IDeleteNodeModal) => {
  const { selectedNodeInfo, setSelectedNodeInfo } = props;

  return (
    <Modal open={!!selectedNodeInfo} onClose={() => setSelectedNodeInfo(null)}>
      <DeleteNode {...props} />
    </Modal>
  );
};

export default DeleteNodeModal;
