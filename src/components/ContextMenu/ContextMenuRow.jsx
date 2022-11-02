const ContextMenuRow = ({ title, onClick = () => {}, icon }) => {

  const clickHandler = (e) => {
    e.stopPropagation()
    onClick(e)
  }

  return (
    <div className="ContextMenuRow" onClick={clickHandler} >
      {icon ? icon : ""}

      <p className="title">{title}</p>
    </div>
  )
}

export default ContextMenuRow
