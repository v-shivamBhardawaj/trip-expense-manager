import './halftone.scss'
const Halftone = (props:{top:string,right:string,left:string,bottom:string,color:string}) => {
    if(props.color)
        document.documentElement.style.setProperty('--halftone-color', props.color);
    
  return (
    <div style={{position: 'absolute',right: props.right,top: props.top,left:props.left,bottom:props.bottom}}>
        <div className="halftone"></div>
    </div>
    
  )
}

export default Halftone