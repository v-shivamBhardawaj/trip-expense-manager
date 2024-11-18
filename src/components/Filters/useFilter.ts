import { useEffect } from "react";
import { useSelector } from "react-redux"
import { setFilteredList } from "store/LeadData/LeadDataSlice";
import { RootState } from "store/store"

export const sortData = (filteredData:any,sortType:'asc'|'desc')=>{
    if(sortType == 'asc'){
        return filteredData.slice().sort((a:any,b:any)=>{
            let date1= a.createdOn ? new Date(a.createdOn.replace('IST','GMT+0530')).getTime() : new Date(0).getTime();
            let date2= b.createdOn ? new Date(b.createdOn.replace('IST','GMT+0530')).getTime() : new Date(0).getTime();
            
            return date1 - date2;
          
            }
        )
    }else{
        return filteredData.slice().sort((a:any,b:any)=>{
            let date1= a.createdOn ? new Date(a.createdOn.replace('IST','GMT+0530')).getTime() : new Date(0).getTime();
            let date2= b.createdOn ? new Date(b.createdOn.replace('IST','GMT+0530')).getTime() : new Date(0).getTime();
            
            return date2 - date1;
          
            }
        )
    }
}

function parseDate(dateStr:string) {
    const [day, month, year] = dateStr.split("/").map(Number);
    return new Date(year, month - 1, day); // Month is 0-based in JavaScript
}

function isInDateRange(lead:any, appliedFilters:any){
    let conditon=true;
    if(!appliedFilters.startDate || !appliedFilters.endDate){
        return conditon;
    }
    let start = parseDate(appliedFilters.startDate)
    let end = parseDate(appliedFilters.endDate);

    conditon = parseDate(lead.leadDate) >=start && parseDate(lead.leadDate)<=end;
    return conditon;
}

export const useFilter = (appliedFilters:any,dispatch:any)=>{
    
    const allLeads = useSelector((state:RootState)=> state?.leadData?.leadList);
    const filteredList = useSelector((state:RootState)=>state?.leadData?.filteredList);
    const sortType = useSelector((state:RootState)=> state?.filter?.sort) as 'asc'|'desc';

    const applyFilter = ()=>{
        let filteredData = allLeads.filter((lead:any)=>{
            if(appliedFilters.searchString){
                return ((lead._id && lead._id.includes(appliedFilters['searchString'].trim().toLowerCase())) || (lead.companyName && lead.companyName.trim().toLowerCase().includes(appliedFilters.searchString.trim().toLowerCase())))
            }else{
                
                return Object.keys(appliedFilters)
            .filter((f: string) => appliedFilters[f] !="")
            .reduce((acc: boolean, key: string) => {

                switch (key) {

                    case 'leadDate':
                        return acc && isInDateRange(lead, appliedFilters[key]);
                    default: 
                        return acc && (key in lead && lead[key] === appliedFilters[key]);
                }
            }, true)
                // return Object.keys(appliedFilters).every(key => 
                //     appliedFilters[key] === '' || (key in lead && lead[key] === appliedFilters[key])
                //   )
            }
            
        });
        let sorted = sortData(filteredData,sortType)
        dispatch(setFilteredList(sorted))
    }


    useEffect(()=>{
        applyFilter();
    },[appliedFilters]);

    
    useEffect(()=>{
        console.log(sortType)
        let sorted = sortData(filteredList,sortType)
        dispatch(setFilteredList(sorted));
    },[sortType])
}