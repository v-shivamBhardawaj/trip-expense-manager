import { createSlice } from "@reduxjs/toolkit";

const leadDataSlice = createSlice({
    name:'leadData',
    initialState:{
        allData:{
            isError: false,
            data:[] as any[]
        } as any,
        leadList:[] as any[],
        filteredList:[] as any[],
        count:{
            TO_BE_PICKED: 0,
            PICKED: 0,
            CONVERTED: 0,
            FAILED: 0,
            TOTAL: 0
        } as any,
    },
    reducers:{
        setAllLeadData(state,action){
            state.allData ={
                isError:false,
                data: action.payload
            };
        },
        setCountAndListData(state,action){
            const {leadList, count} = action.payload;
            state.leadList = leadList;
            state.filteredList = leadList;
            state.count = count
        },
        updateStatusCount(state,action){
            const {from,to} = action.payload;
            state.count[from] = state.count[from]-1;
            state.count[to] = state.count[to]+1;
        },
        setFilteredList(state,action){
            if(action.payload.length >0)
                state.filteredList = action.payload
            else
                state.filteredList.length = 0
        },
        setLeadError(state){
            state.allData.isError = true;
        }
    }
});

export const { setAllLeadData, setCountAndListData,updateStatusCount,setFilteredList,setLeadError } = leadDataSlice.actions;
export const leadDataReducer = leadDataSlice.reducer;
