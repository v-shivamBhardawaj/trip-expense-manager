import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    show: false,
    message:"",
    type:"success" as 'success'|'warning'|'error'
};
const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState: INITIAL_STATE,
    reducers: {
        showSnackbar: (state, action) => {
            state.show = true;
            state.message = action?.payload.message;
            state.type = action.payload.type;
        },
        hideSnackbar: (state) => {
            state.show = false;
        }
    }
})

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export const snackbarReducer = snackbarSlice.reducer