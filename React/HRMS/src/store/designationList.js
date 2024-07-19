
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getDesignationList} from '../api/designationListApi'

const initialState = {
  status: "idle",
  data: [],
};

export const getDesignationListData = createAsyncThunk(
  "updateEmployeeApi/getDesignationList",
  async () => {
    const response = await getDesignationList();
    return response;
  }
);

const getDesignationListSlice = createSlice({
  name: "designationData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDesignationListData.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getDesignationListData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getDesignationListData.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default getDesignationListSlice.reducer;
