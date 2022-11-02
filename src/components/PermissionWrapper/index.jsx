import { useSelector } from "react-redux"

const PermissionWrapper = ({ children, permission = "" }) => {
  const permissions = useSelector((state) => state.auth.permissions)

  if (!permissions[permission]) return null

  return children
}

export default PermissionWrapper
