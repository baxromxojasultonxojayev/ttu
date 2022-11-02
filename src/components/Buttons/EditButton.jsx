

import LoadingButton from '@mui/lab/LoadingButton';
import EditIcon from "@mui/icons-material/Edit"

const EditButton = ({ children, title = "Edit", ...props }) => {
  return (
    <LoadingButton
      style={{ minWidth: 130 }}
      startIcon={<EditIcon />}
      variant="contained"
      loadingPosition="start"
      {...props}
    >
      {title}
    </LoadingButton>
  )
}

export default EditButton
