import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useNavigate } from "react-router-dom"
import "./style.scss"

const BackButton = ({link}) => {
  const navigate = useNavigate()

  return (
    <button type="button" className="BackButton" onClick={() => navigate(link)} >
      <ArrowBackIcon className="icon"  />
    </button>
  )
}

export default BackButton
