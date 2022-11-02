import { useState } from "react"
import AttachFileForm from "./AttachFileForm"
import AttachFileRow from "./AttachFileRow"
import ImageViewer from "react-simple-image-viewer"
import "./style.scss"
import VideoModal from "../VideoModal"
import { Player } from "react-tuby"
import "react-tuby/css/main.css"

const AttachFiles = ({ subtaskId, data }) => {
  const [files, setFiles] = useState(data?.files ?? [])
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedVideo, setSelectedVideo] = useState(null)

  const addFile = (file) => {
    setFiles((prev) => [...prev, file])
  }

  const removeFile = (id) => {
    setFiles((prev) => prev.filter((el) => el.id !== id))
  }

  const openGallery = (file) => {
    setSelectedImage(process.env.REACT_APP_CDN_API_URL + "/file/" + file.id)
  }

  const openPlayer = (file) => {
    setSelectedVideo(process.env.REACT_APP_CDN_API_URL + "/file/" + file.id)
  }

  const openFile = (file) => {
    if (file.type === "image") return openGallery(file)
    if (file.type === "video") return openPlayer(file)
    if (file.type === "pdf") return window.open(file.link, "_blank")

    // saveAs(selectedFile.link, selectedFile.name)
  }

  return (
    <div className="AttachFiles">
      <AttachFileForm subtaskId={subtaskId} addFile={addFile} />

      <div className="files-area">
        {files.map((file) => (
          <AttachFileRow
            key={file.id}
            subtaskId={subtaskId}
            file={file}
            removeFile={removeFile}
            openFile={openFile}
          />
        ))}
      </div>

      {selectedImage && (
        <ImageViewer
          src={[selectedImage]}
          currentIndex={0}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={() => setSelectedImage(null)}
        />
      )}

      {selectedVideo && (
        <VideoModal
          src={selectedVideo}
          closeModal={() => setSelectedVideo(null)}
        />
      )}
    </div>
  )
}

export default AttachFiles
