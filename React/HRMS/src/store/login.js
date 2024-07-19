import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { loginApi } from "../api/loginApi"

const initialState ={
    data:[],
    status:"idle"
}
export const postLogin = createAsyncThunk(
    "login",
    async({data,successCB,errorCB})=>{
        console.log(data,"data")
        const response = await loginApi(data,successCB,errorCB)
        // console.log(data,"data")
        return response;
    }
)
export const loginSlice=createSlice({
    name:"login",
    initialState,
    reducer:{},

    extraReducers(builder){
        builder
        .addCase(postLogin.pending, (state) => {
            state.status = "pending";
          })
          .addCase(postLogin.fulfilled, (state) => {
            state.status = "succeeded";
          })
          .addCase(postLogin.rejected, (state) => {
            state.status = "failed";
          });
        }
})
export default loginSlice.reducer