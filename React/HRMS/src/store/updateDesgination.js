import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {updatedesignation} from '../api/updateDesignationApi'

const initialState = {
  status: "idle",
  data: [],
};

export const UpdateData = createAsyncThunk(
  "UpdateEmployeeApi/UpdateEmployeeApi",
  async ({data,successCB,designation_id}) => {
    console.log(designation_id,"thunk")
    const response = await updatedesignation({data,successCB,designation_id});
    
    return response;
  }
);

const updateDesignationDataSlice = createSlice({
  name: "employeeData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(UpdateData.pending, (state) => {
        state.status = "pending";
      })
      .addCase(UpdateData.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(UpdateData.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default updateDesignationDataSlice.reducer;
