import { Stack } from "@mui/material"

const Analytics = (props:{analytics:any[]}) => {
  return (
    <Stack textAlign={'center'} className="my-25">
        <div >
            <p className="fw-600 fs-32">Why Users love us?</p>
            <p className="fs-16 my-8">And let India’s largest brand in Business travel take care of your organisations travel needs!</p>
        </div>
        <Stack flexDirection={'row'} className="my-8">
            {props.analytics && props.analytics.map((data,index)=>{
                return <div className="analytics" key={index}>
                <p className="count">{data.count}</p>
                <p>{data.label}</p>
            </div>
            })}

        </Stack>
    </Stack>
  )
}

export default Analytics