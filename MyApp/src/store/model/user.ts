import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name:'user',
    initialState:{
        loading:false,
        userInfo:null,
    },
    reducers:{},

})

export default userSlice.reducer