import  BudgetCard  from "./BudgetCard/BudgetCard";
import { useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const BudgetControl = () => {
  const navigate = useNavigate();
  return (
    <>
      <Stack>
        <Button variant="contained" onClick={()=>navigate("/addbudget")} style={{width:"10%", marginTop:"10px"}}>Add Budget</Button>
      </Stack>
      <div>
        <BudgetCard />
      </div>
    </>
    
  );
}
export default BudgetControl;