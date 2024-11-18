import { Stack } from "@mui/material"
import './services.scss'
import { Each } from "components/common/Each";
const Services = (props:{type:string}) => {
    let services =[];
    if(props.type.toLowerCase() == 'corporate'){
        services = [
            {title: 'Booking', description: 'Book Flights/Hotels on your negotiated rates'},
            {title: 'SAP', description: 'Real-time HRMS sync, automated data feeds (SAP)'},
            {title: 'Support', description: 'Dedicated, On-Site Travel Desk with 24x7 Support'},
            {title: 'Multiple Products', description: 'All products available to book / request - Flight, Hotel, Train, Bus, Cars, Insurance & VISA'},
            {title: 'Customised Solutions', description: 'Multi-level Policies, Approvals & Configurations with ability of building customised solutions'},
        ]
    }else{
        services = [
            {title: 'Booking', description: 'Do it Yourself (DIY) booking tool on Web & App'},
            {title: 'GST', description: '100% GST compliant'},
            {title: 'Special Fares', description: 'Access to Special Corporate Fares with Free Rescheduling & more'},
            {title: 'Approval', description: 'Option to configure 1 Level Supervisor Approval, Cars, Insurance & VISA'},
            {title: 'Reports', description: 'Detailed, Real-time booking & cancellation Reports'},
        ]
    }

    const getSubHeading = () =>{
        
        return `For ${props.type=='corporate'?'large business':'SMEs'} who undertake
        ${props.type=='corporate'?'MORE':'LESS'} than 1000 trips or spend ${props.type=='corporate'?'MORE':'LESS'} than 2 Crore on travel in a year`;
    }
  return (
    <Stack alignItems={'center'} className="mx-50">
        <Stack alignItems={'center'}>
            <p className="fs-32 fw-500">
               For {props.type.toLowerCase() =='corporate' ? 'Large Corporates': 'Small Business Enterprises'}
            </p>
            <p className="mt-2">{getSubHeading()}</p>
        </Stack>
        <Stack className="service" flexWrap={'wrap'} flexDirection={'row'}>
            {/* {services && services.length && services.map((s,index)=>{
                return <div key={index}>
                    <h3>{s.title}</h3>
                    <p className="mt-2" style={{color: '#667085'}}>{s.description}</p>
                </div> 
            })} */}
            {
                services && services.length && <Each of={services} render={(item:any,_index:any)=>
                    <div>
                    <h3>{item.title}</h3>
                    <p className="mt-5" style={{color: '#667085'}}>{item.description}</p>
                </div>
                }/>
            }
        </Stack>
    </Stack>
  )
}

export default Services