import Mobile from '../../assets/images/icons/Phone.png';
import IOSQR from '../../assets/images/icons/IOS_QR.png';
import ANDROIDQR from '../../assets/images/icons/ANDROID_QR.png';
import AppStore from '../../assets/images/icons/App Store.png'
import PlayStore from '../../assets/images/icons/Play Store.png'
import { Stack } from '@mui/material';

const DownloadApp = (props:{type:string}) => {

  const svgFile = ()=>{
    let c1= '#877CFF';
    let c2 = '#4086D8';
    switch(props.type.toLowerCase()){
        case 'corporate':
            c1= '#877CFF';
            c2 = '#4086D8';
            break;
        case 'sme':
            c1= '#FECE9E';
            c2 = '#FEF8DB'
            break;
        case 'travel_agent':
            c1= '#C9E4DE';
            c2 = '#FAEDCB'
            break;
    }
    return <svg width="423" height="497" viewBox="0 0 423 497" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.3" d="M306.361 -193.301C357.398 -186.065 407.659 -152.074 419.591 -101.937C434.979 -37.2273 384.144 24.1807 330.646 63.7023C277.149 103.224 214.014 137.14 185.869 197.399C161.001 250.609 169.398 313.455 186.579 369.631C203.76 425.807 229.273 479.857 237.988 537.956C246.702 596.054 234.955 661.937 189.629 699.324C132.872 746.156 48.2176 731.629 -20.8238 706.058C-86.1671 681.829 -152.584 646.283 -185.239 584.766C-221.524 516.432 -207.694 432.824 -185.832 358.615C-125.192 153.026 37.6169 -231.336 306.343 -193.27L306.361 -193.301Z" fill="url(#paint0_linear_1_3137)"/>
        <defs>
        <linearGradient id="paint0_linear_1_3137" x1="283.01" y1="553.119" x2="-172.284" y2="290.255" gradientUnits="userSpaceOnUse">
        <stop stop-color={c1}/>
        <stop offset="1" stop-color={c2}/>
        </linearGradient>
        </defs>
        </svg>;
  }
  return (
    <div style={{overflow:'hidden',display:'flex'}}>
        <div className="d-flex">{svgFile()}
            <div style={{position:'relative'}}>
                <img style={{position:'absolute', left:'-13rem'}} src={Mobile}/>
            </div>
        </div>
        <Stack className="w-60" flexDirection="column" alignSelf={'center'} alignItems={'end'} >
            <div>
                <p className='fs-24'>TRY ON MOBILE</p>
                <p className='fs-60 mt-10'>Download our app for free</p>
            </div>
            <Stack className='my-10' flexDirection="row" gap="30px" alignItems={"center"}>
                <div className='d-contents'>
                    <img src={AppStore} />
                    <img width={'100px'} src={IOSQR} />
                </div>
                <div className='d-contents'>
                    <img src={PlayStore}/>
                    <img width={'100px'} src={ANDROIDQR} />
                </div>
                
            </Stack>

        </Stack>
         
    </div>
  )
}

export default DownloadApp