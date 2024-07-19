import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {updateLeave} from '../api/updateLeaveApi'

const initialState = {
  status: "idle",
  data: [],
};

export const updateLeaveData = createAsyncThunk(
  "updateLeaveApi/updateLeave",
  async ({data,successCB,errorCB,employee_id}) => {
    console.log(data,"thunk")
    const response = await updateLeave({data,successCB,errorCB,employee_id});
    
    return response;
  }
);

const updateLeaveDataSlice = createSlice({
  name: "employeeData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateLeaveData.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateLeaveData.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updateLeaveData.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default updateLeaveDataSlice.reducer;
