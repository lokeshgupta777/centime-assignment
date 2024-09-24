const mockData = [
  {
    id: 0,
    name: "Incomes",
    targets: [
      {
        id: 1,
        value: 5000,
      },
    ],
  },
  {
    id: 1,
    name: "Salary",
    targets: [
      {
        id: 2,
        value: 3000,
      },
    ],
  },
  {
    id: 2,
    name: "Bills",
    targets: [
      {
        id: 3,
        value: 2000,
      },
      {
        id: 4,
        value: 1000,
      },
    ],
  },
  {
    id: 3,
    name: "Mobile Bill",
    value: 2000,
    targets: [],
  },
  {
    id: 4,
    name: "Electric Bill",
    value: 1000,
    targets: [],
  },
];

interface ITargetNodeDetails {
  id: number;
  value: number;
}

export interface INodeDetails {
  id: number;
  name: string;
  targets: ITargetNodeDetails[];
}

export interface GetCashFlowResponse {
  data: INodeDetails[];
}

export const getCashFlowApi = (): Promise<GetCashFlowResponse> => {
  return new Promise((res) => setTimeout(() => res({ data: mockData }), 500));
};
