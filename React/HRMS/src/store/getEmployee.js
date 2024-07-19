import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getEmployee} from '../api/getEmployeeApi'

const initialState = {
  status: "idle",
  data: [],
};

export const EmployeeData = createAsyncThunk(
  "getEmployeeApi/getEmployee",
  async (employee_id) => {
    const response = await getEmployee(employee_id);
    console.log(response,"thunk")
    return response;
  }
);

const getEmployeeDataSlice = createSlice({
  name: "employeeData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(EmployeeData.pending, (state) => {
        state.status = "pending";
      })
      .addCase(EmployeeData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        console.log(state.data,"slice")
      })
      .addCase(EmployeeData.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default getEmployeeDataSlice.reducer;
