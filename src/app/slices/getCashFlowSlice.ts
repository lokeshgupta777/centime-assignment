import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { INodeDetails } from "../../services/api/getCashFlowApi";
import { getCashFlowApi } from "../../services/api/getCashFlowApi";

interface IGetCashFlowSlice {
  nodeDetails: INodeDetails[];
  loading: boolean;
  error: any;
}

const initialState: IGetCashFlowSlice = {
  nodeDetails: [],
  loading: false,
  error: null,
};

export const getCashFlow = createAsyncThunk<INodeDetails[]>(
  "getCashFlow",
  async () => {
    try {
      const res = await getCashFlowApi();
      return res.data;
    } catch (error) {
      throw(error)
    }
  }
);

export const getCashFlowSlice = createSlice({
  name: "getCashFlowSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCashFlow.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.nodeDetails = [];
      })
      .addCase(getCashFlow.fulfilled, (state, action) => {
        state.loading = false;
        state.nodeDetails = action.payload as INodeDetails[];
      })
      .addCase(getCashFlow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error || action.payload;
      });
  },
});

export const selectCashFlow = (state: {
  getCashFlowSlice: IGetCashFlowSlice;
}) => state.getCashFlowSlice.nodeDetails;
export default getCashFlowSlice.reducer;
