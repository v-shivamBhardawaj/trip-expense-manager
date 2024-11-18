import { Alert,Snackbar } from "@mui/material"
import { useSelector } from "react-redux"
import { hideSnackbar } from "store/Snackbar/snackbarSlice";
import { RootState, useAppDispatch } from "store/store"

const SnackbarComponent = () => {

  const snackbarData = useSelector((state:RootState)=> state?.snackbar);
  const dispatch = useAppDispatch();

  const handleClose = () => {
   
    dispatch(hideSnackbar())
  };

  return (
    <Snackbar open={snackbarData.show}
      onClose={handleClose}
        anchorOrigin={{vertical:'bottom',horizontal:'right'}}
       autoHideDuration={2000}>
        <Alert
            severity={snackbarData.type}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {snackbarData.message}
        </Alert>
    </Snackbar>
  )
}

export default SnackbarComponent