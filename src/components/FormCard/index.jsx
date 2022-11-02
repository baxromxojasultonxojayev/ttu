import { Typography } from "@mui/material"
import "./style.scss"

const FormCard = ({ visible = true, children, title, className, extra, maxWidth = 700, ...props }) => {
  if(!visible) return null

  return (
    <div className={`FormCard ${className}`} style={{ maxWidth }} >
      <div className="card" {...props} >
          {title && <div className="header">
           <Typography variant="h4" className="title" >{ title }</Typography>
           <div className="extra">{extra}</div>
          </div>}
          <div className="content">
            { children }
          </div>
      </div>
    </div>
  )
}

export default FormCard
