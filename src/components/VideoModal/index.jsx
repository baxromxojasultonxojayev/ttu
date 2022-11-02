import { CircularProgress, Modal } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { Player } from "react-tuby"
import "react-tuby/css/main.css"

const VideoModal = ({ src, closeModal}) => {
  const [videoLink, setVideoLink] = useState(null)

  const downloadVideo = async () => {
    try {
      const res = await axios.get(src + '/download', {
        responseType: "blob",
      })

      const videoObjectURL = URL.createObjectURL(res.data)

      setVideoLink(videoObjectURL)
    } catch (error) {}
  }

  useEffect(() => {
    downloadVideo()
  }, [src])

  return (
    <Modal
      open
      className="child-position-center"
      disableAutoFocus
      onClose={closeModal}
    >
      <div
        className="VideoModal child-position-center"
        style={{ width: "70%", height: "70%" }}
      >
        {videoLink ? (
          <Player src={videoLink} primaryColor="#0067F4" />
        ) : (
          <CircularProgress />
        )}
      </div>
    </Modal>
  )
}

export default VideoModal
