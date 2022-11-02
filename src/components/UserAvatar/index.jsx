import "./style.scss"
import CheckIcon from "@mui/icons-material/Check"
import { Tooltip } from "@mui/material"

const UserAvatar = ({
  innerText,
  className = "",
  size = "",
  user,
  isSelected,
  disableTooltip = false, 
  ...props
}) => {
  if (innerText)
    return (
      <div className={`UserAvatar ${className} ${size} `} {...props}>
        {innerText}
      </div>
    )

  if (!user?.photo_url)
    return (
      <Tooltip title={user?.name ?? user?.email ?? ''} color="primary" disableHoverListener={disableTooltip} >
        <div className={`UserAvatar ${className} ${size}`} {...props}>
          {user?.name?.[0] ?? user?.email?.[0]}
          {isSelected && (
            <div className="avatar-check-icon">
              <CheckIcon fontSize="12" />
            </div>
          )}
        </div>
      </Tooltip>
    )

  return (
    <Tooltip title={user?.name ?? user?.email} disableHoverListener={disableTooltip} >
      <div style={{ position: "relative" }}>
        <img
          src={user?.photo_url}
          alt="avatar"
          className={`UserAvatar ${className} ${size}`}
          {...props}
        ></img>
        {isSelected && (
          <div className="avatar-check-icon">
            <CheckIcon fontSize="12" />
          </div>
        )}
      </div>
    </Tooltip>
  )
}

export default UserAvatar
