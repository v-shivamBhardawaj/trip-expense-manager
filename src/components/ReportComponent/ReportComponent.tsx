import { useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const ReportComponent = () => {
  const navigate = useNavigate();
  return(
    <>
      <div>
        <Stack>
          <Button variant="contained" onClick={()=>navigate("/add-or-upload-report")} style={{width:"10%", marginTop:"10px"}}>Add Or Upload Report</Button>
        </Stack>
      </div>
    </>
  )
}

export default ReportComponent;