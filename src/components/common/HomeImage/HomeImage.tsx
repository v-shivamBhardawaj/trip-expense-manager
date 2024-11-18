import manImg from '../../../assets/images/icons/man.png';
import webView from '../../../assets/images/icons/desktop.png';
import mobView from '../../../assets/images/icons/mobile.png';
import womNImg from '../../../assets/images/icons/girl.png';
const HomeImage = () => {
    let thirdImg = [{url:manImg, width: '400px'},{url:womNImg, width: '540px'}][Math.floor(Math.random() * 2)];
  return (
    <div className='my-25 pos-relative'>
        <img src={webView} />
        <img src={mobView} style={{position:'absolute', bottom:0, left:'-80px'}} />
        <img src={thirdImg.url} width={thirdImg.width} style={{position:'absolute', bottom:0, right:'-160px'}}/>
    </div>
  )
}

export default HomeImage