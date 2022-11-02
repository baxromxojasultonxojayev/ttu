import RectangleIconButton from "../Buttons/RectangleIconButton"
import { Download, Delete, Visibility } from "@mui/icons-material"
import FileIcon from "../FileIcon"
import { useState } from "react"
import subtaskService from "../../services/subtaskService"
import { biteToKilobite } from "../../utils/biteToKilobite"
import axios from "axios"
import useDownloader from "../../hooks/useDownloader"

const AttachFileRow = ({ subtaskId, file, removeFile, openFile }) => {
  const [loader, setLoader] = useState(false)
  const [download, downloadLoader] = useDownloader()

  const deleteHandler = () => {
    setLoader(true)

    subtaskService
      .deleteAttachFile(subtaskId, file.id)
      .then((res) => {
        removeFile(file.id)
      })
      .catch(() => setLoader(false))
  }

  const downloadHandler = () => {
    console.log("FILE ==>", file)


    download({fileId: file.id, fileName: file.name})

    // const downloadLink =
    //   process.env.REACT_APP_CDN_API_URL + "/file/" + file.id + "/download"

    // axios({
    //   method: 'get',
    //   url: downloadLink,
    //   responseType: 'blob', 
    // }).then((res) => {
    //   const imageObjectURL = URL.createObjectURL(res.data)
    //   console.log(imageObjectURL)
    //   const link = document.createElement('a');
    //   link.href = imageObjectURL;
    //   link.setAttribute('download', file.name); //or any other extension
    //   document.body.appendChild(link);
    //   link.click();

    // })

    // fetch(downloadLink)
    //   .then((response) => response.blob())
      

    // window.open(downloadLink, "_blank")
  }

  const openHandler = () => {
    openFile(file)
  }

  return (
    <div className="AttachFileRow silver-bottom-border">
      <FileIcon />
      <div className="icon"></div>
      <div className="info">
        <p className="name">
          {file.file_name}.{file.file_ext}
        </p>
        <div className="size">{biteToKilobite(file.size)}</div>
      </div>

      <div className="btns-block">
        <RectangleIconButton color="primary" onClick={openHandler}>
          <Visibility color="primary" />
        </RectangleIconButton>
        <RectangleIconButton loader={downloadLoader} color="primary" onClick={downloadHandler}>
          <Download color="primary" />
        </RectangleIconButton>
        <RectangleIconButton
          loader={loader}
          color="error"
          onClick={deleteHandler}
        >
          <Delete color="error" />
        </RectangleIconButton>
      </div>
    </div>
  )
}

export default AttachFileRow
