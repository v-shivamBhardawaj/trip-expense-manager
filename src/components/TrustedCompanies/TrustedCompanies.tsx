import { Stack } from "@mui/material"

const TrustedCompanies = (props:{companies:any[]}) => {
  return (
    <Stack textAlign={'center'}>
        <p className="fs-24">Trusted by fast-growing companies worldwide</p>
        <Stack flexDirection={'row'} justifyContent={'center'}>
            {props.companies && props.companies.length && props.companies.map((company,index)=>{
                return  <img key={index} className="trusted-companies" src={company.logo}/>
                
            })}
        </Stack>
    </Stack>
  )
}

export default TrustedCompanies