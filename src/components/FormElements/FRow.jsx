import "../FormElements-formik/style.scss"


const FRow = ({ label, children, position="vertical", required }) => {
  return (
    <div className={`FRow ${position}`} >
      <div className="label"> {required && <span className="requiredStart">*</span>} {label}:</div>
      <div className="component">{children}</div>
    </div>  
  )
}



export default FRow
