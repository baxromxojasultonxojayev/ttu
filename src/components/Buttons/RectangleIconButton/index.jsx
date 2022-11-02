import { CircularProgress } from "@mui/material"
import "./style.scss"

const RectangleIconButton = ({
  color,
  children,
  loader,
  className,
  onClick = () => {},
  ...props
}) => {
  return (
    <div
      className={`RectangleIconButton ${color} ${className}`}
      onClick={(e) => {
        e.stopPropagation()
        onClick(e)
      }}
      {...props}
    >
      {loader ? <CircularProgress size={14} /> : children}
    </div>
  )
}

export default RectangleIconButton
