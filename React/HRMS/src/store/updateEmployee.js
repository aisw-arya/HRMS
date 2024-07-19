import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {UpdateEmployee} from '../api/updateEmployeeApi'

const initialState = {
  status: "idle",
  data: [],
};

export const updateEmployeeData = createAsyncThunk(
  "UpdateEmployeeApi/UpdateEmployeeApi",
  async ({data,successCB,employee_id}) => {
    console.log(employee_id,"thunk")
    const response = await UpdateEmployee({data,successCB,employee_id});
    
    return response;
  }
);

const updateEmployeeDataSlice = createSlice({
  name: "employeeData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateEmployeeData.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateEmployeeData.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updateEmployeeData.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default updateEmployeeDataSlice.reducer;
