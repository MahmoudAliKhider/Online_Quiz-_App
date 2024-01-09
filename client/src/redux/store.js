import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import loaderSlice from "./loaderSlice";


const store = configureStore({
    reducer:{
        users: userSlice,
        loader: loaderSlice
    }
})

export default store;
