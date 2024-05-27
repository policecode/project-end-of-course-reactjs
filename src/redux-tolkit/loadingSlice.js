import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
    name: 'loading',
    initialState: false,
    reducers: {
        loadingShow: () => {
            return true;
        },
        loadingHidden: () => {
            return false;
        }
    }
})

export default loadingSlice;