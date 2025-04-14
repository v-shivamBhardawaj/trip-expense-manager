import { Dialog, DialogContent, IconButton } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';

export enum DialogAction {
    UPDATE="UPDATE",
    CLOSE="CLOSE",
    SUBMIT="SUBMIT"
}

const CustomDialog = (props:{open:boolean,actions?:any,title:string,triggerAction:any,content?:any}) => {

    
  return (
    <Dialog open={props.open} fullWidth maxWidth={'sm'} PaperProps={{
        sx:{
            borderRadius:'8px'
        }
    }}>
        <div className="flex flex-row justify-between align-center background-primary p-8">
            <span className="fs-22 fw-600">{props.title}</span>
            <IconButton onClick={()=>props.triggerAction(DialogAction.CLOSE)}>
                <CloseIcon />
            </IconButton>
        </div>
        <DialogContent>
            {
                props.content
            }
        </DialogContent>

        {/* <DialogActions className="justify-start px-20 pb-10">
            {
                props?.actions?.map((action: string) => (
                    <Button key={action} color="error" variant="contained" onClick={()=>props.triggerAction(action)}>{action}</Button>
                ))
            }
        </DialogActions> */}
    </Dialog>
  )
}

export default CustomDialog