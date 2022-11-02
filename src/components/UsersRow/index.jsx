import { useMemo } from "react"
import UserAvatar from "../UserAvatar"
import "./style.scss"
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

const UsersRow = ({ size, assigneeUsers=[], onAddButtonClick }) => {

  const computedList = useMemo(() => {
    if(assigneeUsers?.length < 4) return assigneeUsers
    return assigneeUsers?.slice(0, 4)
  }, [assigneeUsers])

  return (
    <div className="UsersRow" >
      {onAddButtonClick && <UserAvatar onClick={onAddButtonClick} innerText={<PersonAddAlt1Icon color="primary" />} className="united" size={size} />}
      {assigneeUsers?.length > 4 && <UserAvatar innerText={`+${assigneeUsers?.length - 4}`} className="united" size={size} />}
      {
        computedList?.map(user => (
          <UserAvatar key={user.id} className="united" user={user} size={size} />
        ))
      }
    </div>
  )
}

export default UsersRow
