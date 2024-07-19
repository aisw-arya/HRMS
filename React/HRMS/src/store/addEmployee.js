import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { AddEmployeeApi } from "../api/employeeAddApi"

const initialState ={
    data:[],
    status:"idle"
}
export const addEmployee = createAsyncThunk(
    "addEmployee",
    async({data,successCB,errorCB})=>{
        console.log(data,"data")
        const response = await AddEmployeeApi(data,successCB,errorCB)
        // console.log(data,"data")
        return response;
    }
)
export const addEmployeeSlice=createSlice({
    name:"addEmployee",
    initialState,
    reducer:{},

    extraReducers(builder){
        builder
        .addCase(addEmployee.pending, (state) => {
            state.status = "pending";
          })
          .addCase(addEmployee.fulfilled, (state) => {
            state.status = "succeeded";
          })
          .addCase(addEmployee.rejected, (state) => {
            state.status = "failed";
          });
        }
})
export default addEmployeeSlice.reducer