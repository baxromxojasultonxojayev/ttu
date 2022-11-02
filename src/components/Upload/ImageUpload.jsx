import AddCircleOutlineIcon from "@mui/icons-material/Upload";
import { useState } from "react";
import { useRef } from "react";
import ImageViewer from "react-simple-image-viewer";
import { CircularProgress, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import "./Gallery/style.scss";
import uploadService from "../../services/uploadServices";

const ImageUpload = ({ value, onChange, className }) => {
  const inputRef = useRef(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const imageClickHandler = (index) => {
    setPreviewVisible(true);
  };

  const inputChangeHandler = (e) => {
    setLoading(true);
    const file = e.target.files[0];

    const data = new FormData();
    data.append("file", file);

    uploadService
      .uploadImage(data)
      .then((res) => {
        onChange("https://test-cdn.openuni.uz/images/" + res.filename);
      })
      .finally(() => setLoading(false));
  };

  const deleteImage = (id) => {
    onChange(null);
  };

  const closeButtonHandler = (e) => {
    e.stopPropagation();
    deleteImage();
  };

  return (
    <div className={`Gallery ${className}`} style={{ width: "310px" }}>
      {value && (
        <div className="block" onClick={() => imageClickHandler()}>
          <button
            className="close-btn"
            type="button"
            onClick={(e) => closeButtonHandler(e)}
          >
            <CancelIcon />
          </button>
          <img
            src={
              value.includes("cdn")
                ? value
                : `https://test-cdn.openuni.uz/images/${value}`
            }
            alt=""
          />
        </div>
      )}

      {!value && (
        <div
          className="add-block block"
          onClick={() => inputRef.current.click()}
        >
          <div className="add-icon">
            {!loading ? (
              <>
                <AddCircleOutlineIcon style={{ fontSize: "35px" }} />
                <Typography>Перетащите файлы сюда</Typography>
                {/* <p>Max size: 4 MB</p> */}
              </>
            ) : (
              <CircularProgress />
            )}
          </div>

          <input
            type="file"
            className="hidden"
            ref={inputRef}
            onChange={inputChangeHandler}
          />
        </div>
      )}

      {previewVisible && (
        <ImageViewer
          src={[
            value.includes("cdn")
              ? value
              : `https://test-cdn.openuni.uz/images/${value}`,
          ]}
          currentIndex={0}
          disableScroll={true}
          closeOnClickOutside={true}
          onClose={() => setPreviewVisible(false)}
        />
      )}
    </div>
  );
};

export default ImageUpload;
