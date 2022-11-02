import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";

const Redactor = ({ value, onChange }) => {
  const [initialValue, setInitialValue] = useState(value);

  const handleEditorChange = (e) => {
    console.log("Content was updated:", e.target.getContent());
    onChange(e.target.getContent());
  };

  const uploader = (blobInfo, success, failure, progress) => {
    var xhr, formData;

    xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.open("POST", "https://api.admin.ekadastr.udevs.io/v1/image-upload");

    xhr.upload.onprogress = function (e) {
      progress((e.loaded / e.total) * 100);
    };

    xhr.onload = function () {
      var json;

      if (xhr.status === 403) {
        failure("HTTP Error: " + xhr.status, { remove: true });
        return;
      }

      if (xhr.status < 200 || xhr.status >= 300) {
        failure("HTTP Error: " + xhr.status);
        return;
      }

      json = JSON.parse(xhr.responseText);
      console.log("json", json);
      console.log("xhr.responseText", xhr.responseText);

      if (!json || typeof json.file_path !== "string") {
        failure("Invalid JSON: " + xhr.responseText);
        return;
      }

      success(`${process.env.REACT_APP_CDN}${json.file_path}`);
    };

    xhr.onerror = function () {
      failure(
        "Image upload failed due to a XHR Transport error. Code: " + xhr.status
      );
    };

    formData = new FormData();
    formData.append("image", blobInfo.blob(), blobInfo.filename());

    console.log("formData", formData);
    xhr.send(formData);
  };

  return (
    <div>
      <Editor
        initialValue={initialValue}
        apiKey="11eq61tpuuh16ikc79586bk6vfbvcq85m4cceirvehb80cfm"
        init={{
          height: `calc(100vh - 280px)`,
          menubar: "",
          plugins: [
            "image",
            "advlist autolink lists link image",
            "charmap print preview anchor help",
            "searchreplace visualblocks code",
            "insertdatetime media table paste wordcount",
            "imagetools",
          ],
          automatic_uploads: true,
          images_upload_handler: uploader,
          file_picker_types: "image",
          toolbar:
            "undo redo | formatselect | bold italic | image |  alignleft aligncenter alignright | \bullist numlist outdent indent | help",
        }}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default Redactor;
