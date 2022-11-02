import "./style.scss"
import { Card, CircularProgress, IconButton, Popover } from "@mui/material"
import { iconsList } from "./iconsList"
import { memo, useState } from "react"
import IconGenerator from "./IconGenerator"

const IconPicker = ({ value = "", onChange, error, loading, ...props }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined

  if (loading)
    return (
      <IconButton color="primary">
        <CircularProgress size={17} />
      </IconButton>
    )

  return (
    <div className="IconPicker" onClick={(e) => e.stopPropagation()} {...props}>
      <div
        className={`icon-wrapper ${error ? "error" : ""}`}
        style={{ backgroundColor: value ?? "#fff" }}
        aria-describedby={id}
        onClick={handleClick}
      >
        <IconGenerator icon={value} />
      </div>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Card elevation={12} className="IconPickerPopup">
          {iconsList.map((icon, index) => (
            <div
              className="icon-wrapper"
              key={index}
              onClick={() => onChange(icon.name)}
            >
              <icon.component />
            </div>
          ))}
        </Card>
      </Popover>
    </div>
  )
}

export default memo(IconPicker)
