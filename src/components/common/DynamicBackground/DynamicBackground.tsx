import './DyanamicBackground.scss'
const DynamicBackground = (props:{type:string,children?: JSX.Element | JSX.Element[],bgType?:string}) => {
    console.log(props.type)
  return (
   <div className={`${props.type.toLowerCase()}${props.bgType?'-'+props.bgType:''}`}>{props.children}</div>
  )
}

export default DynamicBackground