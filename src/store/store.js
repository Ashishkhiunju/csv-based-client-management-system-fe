import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import clientReducer from "./clientSlice";

export const store = configureStore({
    reducer:{
        auth: authReducer,
        clients: clientReducer,
    },
})