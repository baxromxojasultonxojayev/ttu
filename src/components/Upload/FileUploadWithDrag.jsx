import { useCallback, useRef, useState } from "react"
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox"
import { useDropzone } from "react-dropzone"
import { CircularProgress } from "@mui/material"
import "./style.scss"
import RingLoader from "../Loaders/RingLoader"

const FileUploadWithDrag = ({ onUpload, loader }) => {
  const inputRef = useRef(null)



  const onDrop = useCallback((files) => {
    const file = files[0]
    const data = new FormData()

    data.append('file', file)

    onUpload(data)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })


  return (
    <div className="FileUploadWithDrag">
      <div
        {...getRootProps()}
        className="dropzone"
        ref={inputRef}
        style={{ height: 164 }}
      >
        <input {...getInputProps()} />
        {!loader ? (
            <>
              <MoveToInboxIcon className="dropzone-icon" />
              <p className="dropzone-title">
                Upload file
              </p>
            </>
          ) : (
            <RingLoader />
          )}
      </div>
    </div>
  )
}

export default FileUploadWithDrag
