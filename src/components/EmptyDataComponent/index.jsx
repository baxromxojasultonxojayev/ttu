import "./style.scss"
import InboxIcon from '@mui/icons-material/Inbox';
import { experimentalStyled, Typography } from "@mui/material";
import ViewListIcon from '@mui/icons-material/ViewList';

const StyledTitle = experimentalStyled(Typography)(({theme }) => ({
  color: theme.palette.grey[500]
}))

const EmptyDataComponent = ({title = "No data", isVisible}) => {
  if(!isVisible) return null

  return (
    <div className="EmptyDataComponent" >
      <div className="block">
        <div className="icon">
          <ViewListIcon color="disabled" style={{fontSize: "50"}} />
        </div>
        <StyledTitle variant="body1"  >{title}</StyledTitle>
      </div>
    </div>
  )
}

export default EmptyDataComponent
