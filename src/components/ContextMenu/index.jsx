import "./style.scss"
import OutsideClickHandler from "react-outside-click-handler"


const ContextMenu = ({ children, position, visible, closeContextMenu }) => {
  if (!visible) return null

  const style = {
    top: position.y,
    left: position.x,
  }

  const outsideClickHandler = event => {
    if (event.which === 3) return null
    closeContextMenu()
  }

  return (
    
    <div className="ContextMenu" style={style}>
      <OutsideClickHandler onOutsideClick={outsideClickHandler} >
        {children}
      </OutsideClickHandler>
    </div>
  )
}

export default ContextMenu
