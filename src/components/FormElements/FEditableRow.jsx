import "../FormElements-backup/style.scss"

const FEditableRow = ({
  label,
  onLabelChange,
  children,
  position = "vertical",
  required,
}) => {
  return (
    <div className={`FRow ${position}`}>
      <div className="label">
        {required && <span className="requiredStart">*</span>}
        <input className="labelInput" value={label} type="text" onChange={(e) => onLabelChange(e.target.value)} />
      </div>
      <div className="component">{children}</div>
    </div>
  )
}

export default FEditableRow
