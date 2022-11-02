import "./style.scss"
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state"
import { Card, CircularProgress, IconButton, Popover } from "@mui/material"
import { colorList } from "./colorList"

const ColorPicker = ({
  value,
  onChange,
  loading
}) => {
  if (loading)
    return (
      <IconButton color="primary">
        <CircularProgress size={17} />
      </IconButton>
    )

  return (
    <PopupState variant="popover">
      {(popupState) => (
        <div className="ColorPicker" onClick={(e) => e.stopPropagation()}>
          <div
            className="round"
            style={{ backgroundColor: value ?? "#fff" }}
            {...bindTrigger(popupState)}
          ></div>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <Card elevation={12} className="ColorPickerPopup">
              {colorList.map((color, index) => (
                <div
                  className="round"
                  key={index}
                  style={{ backgroundColor: color }}
                  onClick={() => onChange(color)}
                />
              ))}
            </Card>
          </Popover>
        </div>
      )}
    </PopupState>
  )
}

export default ColorPicker
