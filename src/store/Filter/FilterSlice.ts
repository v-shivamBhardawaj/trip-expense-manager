import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name:'filter',
    initialState:{
        appliedFilters:{} as any,
        sort:'asc'
    },
    reducers:{
        setAppliedFilters(state,action){
           state.appliedFilters = action.payload
        },
        setSort(state,action){
            state.sort = action.payload
        }
    }
})

export const { setAppliedFilters,setSort } = filterSlice.actions;
export const filterReducer = filterSlice.reducer