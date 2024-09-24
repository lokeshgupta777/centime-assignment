import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCashFlow, selectCashFlow } from "../../app/slices/getCashFlowSlice";
import SankeyChart, { ISankeyData } from "../SankeyChart/SankeyChart";
import formatCashFlowData from "./utils/formatCashFlowData";
import { Button } from "@mui/material";
import styles from "./CashFlow.module.css";
import AddLinkModal from "./AddLinkModal/AddLinkModal";
import DeleteNodeModal from "./DeleteNodeModal/DeleteNodeModal";
import EditLinkModal from "./EditLinkModal/EditLinkModal";
import SankeyNodeWithTitle from "./SankeyNodeWithTitle/SankeyNodeWithTitle";
import { useTranslation } from "react-i18next";

export interface IEditLinkDetails {
  source: string;
  target: string;
  linkId: number;
  value: number;
}

export interface ISelectedNodeInfo {
  name: string;
  value: number;
  index: number;
}

const CashFlow = () => {
  const dispatch: any = useDispatch();
  const cashFlowData = useSelector(selectCashFlow);
  const { t } = useTranslation();
  const [cashFlowSankeyData, setCashFlowSankeyData] =
    useState<ISankeyData | null>(null);
  const [editLinkDetails, setEditLinkDetails] =
    useState<IEditLinkDetails | null>(null);
  const [selectedNodeInfo, setSelectedNodeInfo] =
    useState<ISelectedNodeInfo | null>(null);
  const [openAddModal, setOpenAddModal] = useState(false);

  useEffect(() => {
    dispatch(getCashFlow());
  }, [dispatch]);

  useEffect(() => {
    if (cashFlowData?.length && !cashFlowSankeyData) {
      const tmpCashFlowSankeyData = formatCashFlowData(cashFlowData);
      setCashFlowSankeyData(tmpCashFlowSankeyData);
    }
  }, [cashFlowData, cashFlowSankeyData]);

  const graphClickHandler = (data: any) => {
    if (data?.payload?.source && data?.payload?.target) {
      setEditLinkDetails({
        source: data?.payload?.source?.name,
        target: data?.payload?.target?.name,
        linkId: data?.index,
        value: data?.payload?.value,
      });
    } else {
      setSelectedNodeInfo({
        name: data?.payload?.name,
        value: data?.payload?.value,
        index: data?.index,
      });
    }
  };

  if (!cashFlowSankeyData?.nodes.length) return null;
  return (
    <>
      <div className={styles.cont}>
        <ul>
          <li>{t("editLink")}</li>
          <li>{t("deleteNode")}</li>
          <li>{t("addLink")}</li>
        </ul>
        <Button
          onClick={() => setOpenAddModal(true)}
          size="small"
          variant="contained"
          className={styles.addButton}
          data-testid="button-add-link"
        >
          Add Link
        </Button>
        <div className={styles.chart}>
          <SankeyChart
            data={cashFlowSankeyData}
            onClick={graphClickHandler}
            nodeEle={<SankeyNodeWithTitle />}
          />
        </div>
      </div>
      <EditLinkModal
        cashFlowSankeyData={cashFlowSankeyData}
        setCashFlowSankeyData={setCashFlowSankeyData}
        editLinkDetails={editLinkDetails}
        setEditLinkDetails={setEditLinkDetails}
      />
      <DeleteNodeModal
        cashFlowSankeyData={cashFlowSankeyData}
        setCashFlowSankeyData={setCashFlowSankeyData}
        selectedNodeInfo={selectedNodeInfo}
        setSelectedNodeInfo={setSelectedNodeInfo}
      />
      <AddLinkModal
        openAddModal={openAddModal}
        setOpenAddModal={setOpenAddModal}
        cashFlowSankeyData={cashFlowSankeyData}
        setCashFlowSankeyData={setCashFlowSankeyData}
      />
    </>
  );
};

export default CashFlow;
