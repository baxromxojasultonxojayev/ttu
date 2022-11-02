import { Breadcrumbs } from "@mui/material"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import "./style.scss"
import FolderIcon from "@mui/icons-material/Folder"
import { useNavigate } from "react-router-dom"
import { useMemo } from "react"
import BackButton from "../BackButton"

const CBreadcrumbs = ({
  icon,
  withDefautlIcon,
  size,
  className,
  items,
  type = 'element',
}) => {
  const navigate = useNavigate()

  const navigateLink = useMemo(() => {
    if(type !== 'link') return null
    return items[items.length - 2]?.link ?? null
  }, [items, type])


  const navigateHandler = (link, index) => {
    if (index === items?.length - 1) return null
    navigate(link)
  }

  return (
    <div className="CBreadcrumbs-wrapper">
    {navigateLink && <BackButton link={navigateLink} />}
    <Breadcrumbs
      className={`CBreadcrumbs ${size} ${className}`}
      separator={<NavigateNextIcon fontSize="small" />}
    >
      {items?.map((item, index) => (
        <div key={index} className={`breadcrumb-item ${type}`}>
          {icon}
          {withDefautlIcon && <FolderIcon />}
          {type === "link" ? (
            <div
              onClick={() => navigateHandler(item.link, index)}
              className="breadcrumb-label"
            >
              {item.label}
            </div>
          ) : (
            <div className="breadcrumb-label">{item.label}</div>
          )}
        </div>
      ))}
    </Breadcrumbs>
    </div>
  )
}

export default CBreadcrumbs
