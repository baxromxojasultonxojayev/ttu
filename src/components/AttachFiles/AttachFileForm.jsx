import AttachmentIcon from "@mui/icons-material/Attachment"
import { format } from "date-fns/esm"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import fileService from "../../services/fileService"
import subtaskService from "../../services/subtaskService"
import FileUploadButton from "../FileUploadButton"
import RowLinearLoader from "../RowLinearLoader"
import TypographyWithIcon from "../TypographyWithIcon"

const AttachFileForm = ({ subtaskId, addFile }) => {
  const projectInfo = useSelector((state) => state.project.info)
  const [loader, setLoader] = useState(false)

  const onUpload = (file) => {
    subtaskService
      .addAttachFile({
        file,
        subtask_id: subtaskId,
      })
      .then((res) => addFile(file))
      .finally(() => setLoader(false))
  }

  useEffect(() => {
    const onUploadHandler = (file) => {
      setLoader(true)

      const data = new FormData()

      if(file.name === 'image.png') {
        data.append('file', file, `screenshot-${format(new Date(), 'dd.MM.yyyy HH:mm:ss')}.png`)
      }

      else {
        data.append("file", file)
      }


      fileService
        .createFile(projectInfo?.attached_files_folder_id, data)
        .then((res) => {
          onUpload(res)
        })
        .catch(() => setLoader(false))
    }

    const pasteHandler = (event) => {

      console.log("EVENT =====>", event.clipboardData.items.length)

      const items = event.clipboardData.items

      for (let index = 0; index < items.length; index++) {
        const element = items[index];
        
        console.log("ITEM =====>", element.kind, element.getAsFile())

      }

      var item = (event.clipboardData || event.originalEvent.clipboardData)
        .items[0]

      if (item.kind === "file") {
        var blob = item.getAsFile()

        onUploadHandler(blob)
      }
    }

    window.addEventListener("paste", pasteHandler)

    return () => {
      window.removeEventListener("paste", pasteHandler)
    }
  }, [])

  return (
    <div className="AttachFileForm">
      <RowLinearLoader visible={loader} />

      <TypographyWithIcon icon={AttachmentIcon} variant="h6">
        ATTACHEMENTS
      </TypographyWithIcon>

      <FileUploadButton
        folderId={projectInfo?.attached_files_folder_id}
        onChange={onUpload}
      />
    </div>
  )
}

export default AttachFileForm
