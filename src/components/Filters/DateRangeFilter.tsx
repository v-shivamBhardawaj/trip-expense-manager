import { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import "./Filter.scss"
import { Button, Popover, TextField } from '@mui/material';
import { formatDateInDDMMYYYY } from 'utils/helper/dateFormater';

const DateRangeFilter = (props:{onDateChanged:Function}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const INITIAL_RANGE= {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  }
  const [selectionRange, setSelectionRange] = useState(INITIAL_RANGE);

  const [dateString,setDateString] = useState("");

  const handleDateChange = (range:any)=>{
    console.log(range.selection)
    setSelectionRange(range.selection)
  
  }
  const onClickOkay = ()=>{
    let startDate = selectionRange.startDate ;
    let endDate = selectionRange.endDate;
    setDateString(`${formatDateInDDMMYYYY(startDate)} - ${formatDateInDDMMYYYY(endDate)}`)
    setAnchorEl(null);
    props?.onDateChanged(startDate,endDate)
  }
  const resetClickHandler =()=>{
    setDateString("")
    setAnchorEl(null);
    setSelectionRange(INITIAL_RANGE)
    props?.onDateChanged("","")
  }
  

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <TextField  
        size='small'
        fullWidth
        placeholder='Lead Date'
        value={dateString}
        onClick={(event:any)=>setAnchorEl(event.currentTarget)}
        InputProps={{
          readOnly:true,
          sx:{fontSize:'0.875rem',width:'260px',borderRadius:'8px'}
        }}
      />
      <Popover 
       id={id}
       open={open}
       anchorEl={anchorEl}
       onClose={()=>setAnchorEl(null)}
       anchorOrigin={{
        vertical:'bottom',
        horizontal:'left'
       }}
      >
        <DateRangePicker
         onChange={handleDateChange}
         showPreview={true}
         maxDate={new Date()}
         moveRangeOnFirstSelection={false}
         ranges={[selectionRange]}
         direction="horizontal"
         rangeColors={["rgb(240,23, 23,0.3)"]}

      />
      <div className='w-100 flex flex-row'>
        <Button
          variant="contained"
            color="primary"
            fullWidth
            onClick={resetClickHandler}
        >Reset</Button>
        <Button
            variant="contained"
            color="error"
            
            fullWidth
            onClick={onClickOkay}
          >
            Okay
          </Button>
      </div>
      
       

      </Popover>

      
    </div>
  )
}

export default DateRangeFilter