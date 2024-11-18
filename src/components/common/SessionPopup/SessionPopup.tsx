import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import SandClockSVG from "./SandClockSVG";
import Divider from "@mui/material/Divider";
import { useEffect, useState } from "react";
import { SESSION_TIMEOUT_TIMER } from "utils/constants";

function SessionPopup() {

 
  const [sessionState, setSessionStatus] = useState<boolean>(false);
  const loader = useSelector((state: RootState) => state.loader);
  
  useEffect(() => {
    if(!loader.isLoading){
      setTimeout(() => {
        setSessionStatus(true);
        }, SESSION_TIMEOUT_TIMER)
    }
  }, []);

  return (
    <div className="loader-lower-content">
      <Dialog open={sessionState}
      >
        
        <DialogContent className="loader-lower-content" dividers>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <div className="margin-top" style={{marginTop:"25px"}}>
              <SandClockSVG />
            </div>
          </Stack>
          <Stack
            className="margin-b"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            direction={"column"}
          >
            <p>Timed Out</p>
            <Divider />
          </Stack>
          
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SessionPopup;
