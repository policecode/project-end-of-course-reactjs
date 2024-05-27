import { createSlice } from "@reduxjs/toolkit";
import LocalStorageHelper from "../utils/LocalStorageHelper";

const authSlice = createSlice({
    name: 'auth',
    initialState:  LocalStorageHelper.getStorage("authentication", {}),
    reducers: {
        login: (state, action) => {
            LocalStorageHelper.setStorage("authentication", action.payload);
            return action.payload;
        },
        logout: () => {
            LocalStorageHelper.setStorage("authentication", {});
            return {};
        }, 
        update: (state, action) => {
            LocalStorageHelper.setStorage("authentication", action.payload);
            return action.payload;
        }
    }
})

export default authSlice;