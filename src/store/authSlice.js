import { createSlice } from "@reduxjs/toolkit";

const intialState={
    status:false,
    userDate:null
}

const authSlice=createSlice({
    name:"auth",
    intialState,
    reducers:{

        login:(state,action)=>{
            state.status=true;
            state.userDate=action.payload.userDate;
        },
        logout:(state)=>{
            state.status=false;
            state.userDate=null
        }

    }
})

export const {login,logout}=authSlice.actions;

export default authSlice.reducer;