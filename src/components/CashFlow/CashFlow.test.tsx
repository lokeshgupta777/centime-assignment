import { IAddLinkModal } from "./AddLinkModal/AddLinkModal";
import { IDeleteNodeModal } from "./DeleteNodeModal/DeleteNodeModal";
import { IEditLinkModal } from "./EditLinkModal/EditLinkModal";
import TestComponentWrapper from "../../testUtils/TestComponentWrapper";
import { ISankeyChart } from "../SankeyChart/SankeyChart";
import { fireEvent, render, screen } from "@testing-library/react";
import CashFlow from "./CashFlow";

jest.mock("../SankeyChart/SankeyChart", () => ({
  __esModule: true,
  default: ({ nodeEle, onClick, data }: ISankeyChart) => {
    return (
      <div>
        <p>SankeyChart Rendered</p>
        <button
          data-testid="select-link"
          onClick={() =>
            onClick?.({
              payload: { source: { name: "Node1" }, target: { name: "Node1" } },
              index: 0,
            })
          }
        />
        <button
          data-testid="select-node"
          onClick={() => {
            onClick?.({
              payload: { name: "Node1", value: 1000 },
              index: 0,
            });
          }}
        />
        {nodeEle}
      </div>
    );
  },
}));

jest.mock("./AddLinkModal/AddLinkModal", () => ({
  __esModule: true,
  default: ({ openAddModal }: IAddLinkModal) => {
    return <div>{openAddModal && <p>AddLinkModal Rendered</p>}</div>;
  },
}));

jest.mock("./DeleteNodeModal/DeleteNodeModal", () => ({
  __esModule: true,
  default: ({ selectedNodeInfo }: IDeleteNodeModal) => {
    return <div>{!!selectedNodeInfo && <p>DeleteNodeModal Rendered</p>}</div>;
  },
}));

jest.mock("./EditLinkModal/EditLinkModal", () => ({
  __esModule: true,
  default: ({ editLinkDetails }: IEditLinkModal) => {
    return <div>{!!editLinkDetails && <p>EditLinkModal Rendered</p>}</div>;
  },
}));

jest.mock("./SankeyNodeWithTitle/SankeyNodeWithTitle", () => ({
  __esModule: true,
  default: () => <div>SankeyNodeWithTitle Rendered</div>,
}));

describe("CashFlow", () => {
  it("renders the component properly", async () => {
    render(
      <TestComponentWrapper>
        <CashFlow />
      </TestComponentWrapper>
    );
    expect(await screen.findByText("SankeyChart Rendered")).toBeInTheDocument();
    expect(
      await screen.findByText("SankeyNodeWithTitle Rendered")
    ).toBeInTheDocument();
  });

  it("selects a node", async () => {
    render(
      <TestComponentWrapper>
        <CashFlow />
      </TestComponentWrapper>
    );
    fireEvent.click(await screen.findByTestId("select-node"));
    expect(screen.getByText("DeleteNodeModal Rendered")).toBeInTheDocument();
  });

  it("selects a link", async () => {
    render(
      <TestComponentWrapper>
        <CashFlow />
      </TestComponentWrapper>
    );
    fireEvent.click(await screen.findByTestId("select-link"));
    expect(screen.getByText("EditLinkModal Rendered")).toBeInTheDocument();
  });

  it("adds a link", async () => {
    render(
      <TestComponentWrapper>
        <CashFlow />
      </TestComponentWrapper>
    );
    fireEvent.click(await screen.findByTestId("button-add-link"));
    expect(screen.getByText("AddLinkModal Rendered")).toBeInTheDocument();
  });
});
