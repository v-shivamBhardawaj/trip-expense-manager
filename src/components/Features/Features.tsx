
import './features.scss'
import { Grid, Stack, Typography } from "@mui/material"
const Features = () => {
  return (
    <Stack alignItems={"center"} textAlign={'center'} className="my-30">
        <Grid container spacing={2} textAlign={'center'}>
        <Grid item xs={12} md={6} lg={5} className="px-15" sx={{margin: 'auto'}}>
            <Stack spacing={2}>
            <Typography variant="h4" className="fs-42 fw-600">
                You are in Control!
            </Typography>
            <Typography className="fs-16">
                Granular, detailed reports in downloadable format. And real-time dashboard enables you to be on top of your
                company’s travel spends & trends at any given time.
            </Typography>
            </Stack>
        </Grid>
        </Grid>

        <Stack className="my-25 w-100" justifyContent={'center'} flexDirection={'row'} gap={4}>
                <Stack className="w-36 mt-25" flexDirection={'row'} gap={4}>
                    <Stack justifyContent={'flex-end'} className="w-100" gap={4} alignSelf={'center'}>
                    <div className="card">
                        Sap Integration
                    </div>
                    </Stack>
                    <Stack  className="w-100"  gap={4} justifyContent={'flex-end'} >
                        <div className="card">Sap Integration</div>
                        <div className="card">Sap Integration</div>
                    </Stack>
                </Stack>
                <Stack className="w-36 mb-25" flexDirection={'row'} gap={4}>
                     <Stack className="w-100"  gap={4}>
                        <div className="card">Sap Integration</div>
                        <div className="card">Sap Integration</div>
                    </Stack>
                    <Stack className="w-100" alignSelf={'center'}>
                        <div className="card">Sap Integration</div>
                    </Stack>
                </Stack>
               
            </Stack>
    </Stack>
  )
}

export default Features