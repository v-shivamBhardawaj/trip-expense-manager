import Users from "./Users/Users";
import { useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const UserAndControlsComponent = () => {
  const navigate = useNavigate();
  return (
    <>
      <Stack>
        <Button variant="contained" onClick={()=>navigate("/settings/adduser")} style={{width:"10%", marginTop:"10px"}}>Add User</Button>
      </Stack>
      <div>
        <Users />
      </div>
    </>
    
  );
}
export default UserAndControlsComponent;