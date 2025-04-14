import { Select, MenuItem, InputLabel, FormControl, SelectChangeEvent, Button } from "@mui/material"
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { FilterKeys, FILTERS_DATA, PlanLabel } from "./filter.type";
import DateRangeFilter from "./DateRangeFilter";
import { useFilter } from "./useFilter";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store/store";
import { setAppliedFilters } from "store/Filter/FilterSlice";
import { formatDateInDDMMYYYY } from "utils/helper/dateFormater";
import RefreshIcon from '@mui/icons-material/Refresh';

const Filters = () => {
    const appliedFilters = useSelector((state:RootState)=>state?.filter?.appliedFilters);
    const dispatch = useAppDispatch();
    console.log(appliedFilters)
    useFilter(appliedFilters,dispatch);

    const handleSelectchange = (event:SelectChangeEvent<any>, filterKey: FilterKeys)=>{
        dispatch(setAppliedFilters({
            ...appliedFilters,
            [filterKey]:event.target.value
        }))
    }

    const dateChangeHandler = (startDate:string,endDate:string,filterKey:FilterKeys)=>{
        console.log(startDate,endDate)
        if(startDate == "" || endDate ==""){
            dispatch(setAppliedFilters({
                ...appliedFilters,
                [filterKey]:''
            }))
            return;
        }
        dispatch(setAppliedFilters({
            ...appliedFilters,
            [filterKey]:{
                startDate:formatDateInDDMMYYYY(new Date(startDate)),
                endDate: formatDateInDDMMYYYY(new Date(endDate))
            }
        }))
    }


  return (
    <div className="w-60 flex flex-col">
        <div className="flex justify-between">
            <label>Filters</label>
            <Button size="small" variant="text" onClick={()=>dispatch(setAppliedFilters({}))} startIcon={<RefreshIcon fontSize="small"/>}>Clear all filters</Button>
        </div>
        <div className="flex flex-row gap-1">
            {
                FILTERS_DATA.map((filter)=>{
                    switch(filter.type){
                        case 'date-range':
                            return (
                               <DateRangeFilter key={filter.filterKey} onDateChanged={(s:string,e:string)=>dateChangeHandler(s,e,filter.filterKey)}/>
                            )
                        case 'select':
                            return (<FormControl size="small" key={filter.filterKey} className="w-100 ">
                            <InputLabel className="fs-14" size="small" id={filter.filterKey}>{filter.placeholder}</InputLabel>
                            <Select 
                                    labelId={filter.filterKey}
                                    size="small"
                                    id={filter.filterKey}

                                    IconComponent={KeyboardArrowDownOutlinedIcon}
                                    className="br-8 fs-14"
                                    label={filter.placeholder}
                                    
                                    onChange={(e)=>handleSelectchange(e,filter.filterKey)}
                                    value={appliedFilters[filter.filterKey]||''}
                                    {
                                        ...(filter.filterKey == FilterKeys.PLAN && {
                                            renderValue:(value:'BASIC'|'PRO'|'ELITE')=> <span>{PlanLabel[value]}</span>
                                        })
                                    }
                                >
                                {
                                    filter.options && filter.options.map((option)=>(
                                        <MenuItem value={option.value} key={option.value}>
                                            <div className="flex flex-col">
                                                <span >{option.label}</span>
                                                {option?.description && <span className="fs-14">{option?.description}</span>}
                                            </div>
                                        </MenuItem>
                                    ))
                                }
                                <MenuItem value="" key="reset" sx={{width:'fit-content', float:'right',  background:'none!important'}}>
                                    <Button size="small" variant="text" startIcon={<RefreshIcon fontSize="small"/>}>Reset</Button>
                                </MenuItem>
                            </Select>
                            </FormControl>)
                    }
                })
            }
             
        </div>
    </div>
  )
}

export default Filters