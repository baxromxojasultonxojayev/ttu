import "./style.scss"

const FiltersBlock = ({ children, extra }) => {
  return (
    <div className="FiltersBlock silver-bottom-border">
      <div className="side">{children}</div>
      <div className="side"> {extra}</div>
    </div>
  )
}

export default FiltersBlock
