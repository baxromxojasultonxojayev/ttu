import { LinearProgress } from "@mui/material"
import "./style.scss"

const RowLinearLoader = ({ visible }) => {

  if (!visible) return null

  return (
    <div className="RowLinearLoader" >
      <LinearProgress />
    </div>
  )
}

export default RowLinearLoader
