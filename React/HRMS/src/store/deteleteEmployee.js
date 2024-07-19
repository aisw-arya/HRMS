// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import {deleteEmployee} from '../api/deleteEmployeeApi'

// const initialState = {
//   status: "idle",
//   data: [],
// };

// export const DeleteEmployeeData = createAsyncThunk(
//   "deleteEmployeeApi/deleteEmployee",
//   async (employee_id) => {
//     const response = await deleteEmployee(employee_id);
//     console.log(response,"thunk")
//     return response;
//   }
// );

// const getDeleteEmployeeDataSlice = createSlice({
//   name: "employeeData",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(DeleteEmployeeData.pending, (state) => {
//         state.status = "pending";
//       })
//       .addCase(DeleteEmployeeData.fulfilled, (state) => {
//         state.status = "succeeded";
//         console.log(state.data,"slice")
//       })
//       .addCase(DeleteEmployeeData.rejected, (state) => {
//         state.status = "failed";
//       });
//   },
// });

// export default getDeleteEmployeeDataSlice.reducer;
