import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { AddDesgnationApi } from "../api/designationAddApi"

const initialState ={
    data:[],
    status:"idle"
}
export const addDesigntion = createAsyncThunk(
    "addDesigntion",
    async({data})=>{
        console.log(data,"data")
        const response = await AddDesgnationApi(data)
        // console.log(data,"data")
        return response;
    }
)
export const addDesigntionSlice=createSlice({
    name:"addDesigntionslice",
    initialState,
    reducer:{},

    extraReducers(builder){
        builder
        .addCase(addDesigntion.pending, (state) => {
            state.status = "pending";
          })
          .addCase(addDesigntion.fulfilled, (state) => {
            state.status = "succeeded";
          })
          .addCase(addDesigntion.rejected, (state) => {
            state.status = "failed";
          });
        }
})
export default addDesigntionSlice.reducer