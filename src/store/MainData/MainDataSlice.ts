import { createSlice } from "@reduxjs/toolkit";


const mainDataSlice = createSlice({
    name: 'mainData',
    initialState: {
        mainData: {},
        csrfToken: "",
    },
    reducers: {
        setMainData(state, action) {
            state.mainData = action.payload;
        },
        setToken(state, action) {
            state.csrfToken = action.payload;
        },
        updateMainListData(state, action) {
            state.mainData = action.payload
        },
    }
})

export const { setMainData, setToken, updateMainListData } = mainDataSlice.actions;
export const mainDataReducer = mainDataSlice.reducer;
