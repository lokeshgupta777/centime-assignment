import { Button, Card, Modal } from "@mui/material";
import { ReactElement } from "react";
import styles from "../CashFlow/CashFlowModal.module.css";

interface IConfirmModal {
  openConfirmModal: boolean;
  messsage: string | ReactElement;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({
  openConfirmModal,
  messsage,
  onCancel,
  onConfirm,
}: IConfirmModal) => {
  return (
    <Modal open={openConfirmModal} onClose={() => onCancel()}>
      <Card className={styles.card}>
        <p>{messsage}</p>
        <div className={styles.valueChange}>
          <Button
            variant="contained"
            onClick={() => onCancel()}
            className={styles.button}
          >
            No
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => onConfirm()}
            className={styles.button}
          >
            Yes
          </Button>
        </div>
      </Card>
    </Modal>
  );
};

export default ConfirmModal;
