import { Button, Card, Modal, TextField } from "@mui/material";
import { ISankeyData, ISankeyLink } from "../../SankeyChart/SankeyChart";
import { IEditLinkDetails } from "../CashFlow";
import styles from "../../CashFlow/CashFlowModal.module.css";
import { useEffect, useState } from "react";

export interface IEditLinkModal {
  editLinkDetails: IEditLinkDetails | null;
  setEditLinkDetails: React.Dispatch<IEditLinkDetails | null>;
  cashFlowSankeyData: ISankeyData | null;
  setCashFlowSankeyData: React.Dispatch<ISankeyData | null>;
}

const EditLink = ({
  cashFlowSankeyData,
  setCashFlowSankeyData,
  editLinkDetails,
  setEditLinkDetails,
}: IEditLinkModal) => {
  const [linkValue, setLinkValue] = useState("");

  useEffect(() => {
    editLinkDetails && setLinkValue(editLinkDetails?.value?.toString());
  }, [editLinkDetails]);

  const linkValueChangeHandler = () => {
    const tmpSankeyLinks: ISankeyLink[] =
      cashFlowSankeyData?.links?.map((link, index) => {
        if (index === editLinkDetails?.linkId)
          return { ...link, value: +linkValue };
        return { ...link };
      }) ?? [];
    setCashFlowSankeyData({
      nodes: cashFlowSankeyData?.nodes!,
      links: tmpSankeyLinks,
    });
    setEditLinkDetails(null);
  };

  return (
    <Card className={styles.card}>
      <p>
        Change Value of&nbsp;
        <span className={styles.valueChangeHead}>
          {editLinkDetails?.source + " - " + editLinkDetails?.target}
        </span>
      </p>
      <div className={styles.valueChange}>
        <TextField
          value={linkValue}
          variant="outlined"
          size="small"
          onChange={(e) => setLinkValue(e.target.value)}
        />
        <Button
          variant="outlined"
          color="error"
          className={styles.button}
          size="small"
          onClick={() => setEditLinkDetails(null)}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          className={styles.button}
          size="small"
          onClick={() => linkValueChangeHandler()}
        >
          Change
        </Button>
      </div>
    </Card>
  );
};

const EditLinkModal = (props: IEditLinkModal) => {
  const { editLinkDetails, setEditLinkDetails } = props;
  return (
    <Modal open={!!editLinkDetails} onClose={() => setEditLinkDetails(null)}>
      <EditLink {...props} />
    </Modal>
  );
};

export default EditLinkModal;
