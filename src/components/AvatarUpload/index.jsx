import FileUploadIcon from "@mui/icons-material/FileUpload"
import { useRef, useState } from "react"
import fileService from "../../services/fileService"
import CancelIcon from "@mui/icons-material/Cancel"
import EyeIcon from "@mui/icons-material/RemoveRedEye"
import ImageViewer from "react-simple-image-viewer"

import "./style.scss"
import { CircularProgress, IconButton } from "@mui/material"

const AvatarUpload = ({
  value,
  onChange,
  size="medium",
  ...props
}) => {
  const inputRef = useRef()

  const [previewVisible, setPreviewVisible] = useState(false)
  const [loader, setLoading] = useState(false)

  const onUpload = (e) => {
    setLoading(true)
    const file = e.target.files[0]

    const data = new FormData()
    data.append("file", file)

    fileService
      .uploadImage(data)
      .then((res) => {
        onChange(process.env.REACT_APP_CDN_API_URL + "/file/" + res.id)
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className={`AvatarUpload ${size}`} {...props} >
      {!value ? (
        <div className="round-block" onClick={() => inputRef.current.click()}>
          {loader ? <CircularProgress /> : <FileUploadIcon fontSize="50" />}
        </div>
      ) : (
        <>
          <img
            src={value}
            className="round-block"
            alt="avatart"
            onClick={() => inputRef.current.click()}
          />
          <div className="shape">
            <IconButton
              onClick={() => setPreviewVisible(true)}
              color="secondary"
              className="close-btn"
            >
              <EyeIcon />
            </IconButton>
            <IconButton className="close-btn" onClick={() => onChange('')} >
              <CancelIcon />
            </IconButton>
          </div>
        </>
      )}

      <input
        onChange={onUpload}
        type="file"
        className="hidden-element"
        ref={inputRef}
      />

      {previewVisible && (
        <ImageViewer
          src={[value]}
          currentIndex={0}
          disableScroll={true}
          closeOnClickOutside={true}
          onClose={() => setPreviewVisible(false)}
        />
      )}
    </div>
  )
}

export default AvatarUpload
