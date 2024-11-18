import { Divider, Stack } from "@mui/material"
import DynamicBackground from "components/common/DynamicBackground/DynamicBackground"

const CustomerHelp = (props:{type:string}) => {
  return (
    <DynamicBackground type={props.type} bgType="bg2">
      <Stack alignItems={'center'} className="p-15">
        <Stack>
          <p className="fs-42 fw-600">How we help our customers</p>
        </Stack>
        <Stack className="my-12" flexDirection="row" alignItems={'center'} justifyContent="space-between">
          <Stack alignItems="center" className="p-25 text-center" flexBasis={'28%'}>
            <h3 className="fs-20 mb-2">Self Booking Tool</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a. Lacinia purus ac amet.</p>
          </Stack>
          <Divider orientation="vertical" variant="middle" flexItem/>
          <Stack alignItems="center" className="p-25 text-center" flexBasis={'28%'}>
            <h3 className="fs-20 mb-2">Automated Report</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a. Lacinia purus ac amet.</p>
          </Stack>
          <Divider orientation="vertical" variant="middle" flexItem/>
          <Stack alignItems="center" className="p-25 text-center" flexBasis={'28%'}>
            <h3 className="fs-20 mb-2">Special Fares</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a. Lacinia purus ac amet.</p>
          </Stack>
        </Stack>
      </Stack>
    </DynamicBackground>
  )
}

export default CustomerHelp