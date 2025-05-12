import { useNavigate } from "react-router-dom";
import TripCard from "../TripCard/TripCard";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const TripDashboard = () => {
    const navigate = useNavigate();
    return (
        
        <div>
            <Stack>
                <Button variant="contained" onClick={()=>navigate("/addtrip")} style={{width:"10%", marginTop:"10px"}}>Add Trip</Button>
            </Stack>
            <TripCard />
        </div>
    )
}

export default TripDashboard;