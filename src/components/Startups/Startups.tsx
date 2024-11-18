import { Stack } from "@mui/material"
import webView from '../../assets/images/icons/be.png';
import webView2 from '../../assets/images/icons/web_2.png';
import './startups.scss'
const Startups = (props:{type:string}) => {
  return (
    <Stack>
        <Stack className="wrapper mt-25" alignItems={'center'} justifyContent={'center'}>
            <Stack className={`inner-div ${props.type.toLowerCase()}-before w-100`} >
              <div className="w-40 p-20">
                <h1>Join 4,000+ startups growing with Yatra</h1>
                <ul className="p-5">
                  <li className="p-5">30-day free trial</li>
                  <li className="p-5">30-day free trial</li>
                  <li className="p-5">30-day free trial</li>
                </ul>
              </div>
              <div className="w-60 my-25">
                <img className="w-100" src={webView} />
              </div>
            </Stack>
            
        </Stack>
        <Stack className="wrapper mt-25" alignItems={'center'} justifyContent={'center'}>
            <Stack className={`inner-div ${props.type.toLowerCase()}-after w-100 right`} style={{flexDirection:'row-reverse'}}>
              <div className="w-40 p-50">
                <h1>Join 4,000+ startups growing with Yatra</h1>
                <ul className="p-5">
                  <li className="p-5">30-day free trial</li>
                  <li className="p-5">30-day free trial</li>
                  <li className="p-5">30-day free trial</li>
                </ul>
              </div>
              <div className="w-60 my-25">
                <img className="w-100" src={webView} />
              </div>
            </Stack>
            
        </Stack>
        <Stack className="wrapper mt-25" alignItems={'center'} justifyContent={'center'}>
            <Stack className={`inner-div ${props.type.toLowerCase()}-before w-100`} >
              <div className="w-40 p-50">
                <h1>Join 4,000+ startups growing with Yatra</h1>
                <ul className="p-5">
                  <li className="p-5">30-day free trial</li>
                  <li className="p-5">30-day free trial</li>
                  <li className="p-5">30-day free trial</li>
                </ul>
              </div>
              <div className="w-60 my-25">
                <img className="w-100" src={webView2} />
              </div>
            </Stack>
            
        </Stack>
    </Stack>
  )
}

export default Startups