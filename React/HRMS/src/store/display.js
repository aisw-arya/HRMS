
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getEmployeeDetails} from '../api/employeeListApi'

const initialState = {
  status: "idle",
  data: [],
};

export const getEmployeeData = createAsyncThunk(
  "employeeListApi/getEmployeeDetails",
  async () => {
    const response = await getEmployeeDetails();
    console.log(response,"resssssssss")
    return response;
  }
);

const employeeDataSlice = createSlice({
  name: "employeeData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeData.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getEmployeeData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getEmployeeData.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default employeeDataSlice.reducer;
