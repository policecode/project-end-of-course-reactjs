import { configureStore } from "@reduxjs/toolkit";
import loadingSlice from "../redux-tolkit/loadingSlice";
import authSlice from "../redux-tolkit/authSlice";

const store = configureStore({
    reducer: {
        loading: loadingSlice.reducer,
        auth: authSlice.reducer
    }
})

export default store;