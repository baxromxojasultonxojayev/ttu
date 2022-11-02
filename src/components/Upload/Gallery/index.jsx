import AddCircleOutlineIcon from "@mui/icons-material/Upload";
import { useState } from "react";
import { useRef } from "react";
import ImageViewer from "react-simple-image-viewer";
import { useMemo } from "react";
import { CircularProgress } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import "./style.scss";
import fileService from "../../../services/fileService";

const Gallery = ({ gallery, setGallery, notEditable }) => {
  const inputRef = useRef(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const [loading, setLoading] = useState(false);

  const addNewImage = (image) => {
    setGallery((prev) => [...prev, image]);
  };

  const imageClickHandler = (index) => {
    setSelectedImageIndex(index);
    setPreviewVisible(true);
  };

  const inputChangeHandler = (e) => {
    setLoading(true);
    const file = e.target.files[0];

    const data = new FormData();
    data.append("file", file);

    fileService
      .uploadImage(data)
      .then((res) => {
        addNewImage("https://" + res.link);
      })
      .finally(() => setLoading(false));
  };

  const deleteImage = (id) => {
    setGallery((prev) =>
      prev.filter((galleryImageId) => galleryImageId !== id)
    );
  };

  const closeButtonHandler = (e, link) => {
    e.stopPropagation();
    deleteImage(link.replace(process.env.REACT_APP_CDN, ""));
  };

  return (
    <div className="Gallery">
      {gallery?.map((link, index) => (
        <div className="block" onClick={() => imageClickHandler(index)}>
          {!notEditable && (
            <button
              className="close-btn"
              onClick={(e) => closeButtonHandler(e, link)}
            >
              <CancelIcon />
            </button>
          )}
          <img src={link} alt="" />
        </div>
      ))}

      {!notEditable && (
        <div
          className="add-block block"
          onClick={() => inputRef.current.click()}
        >
          <div className="add-icon">
            {!loading ? (
              <>
                <AddCircleOutlineIcon style={{ fontSize: "35px" }} />
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
          backgroundStyle={{ zIndex: 5 }}
          src={gallery}
          currentIndex={selectedImageIndex}
          disableScroll={true}
          onClose={() => setPreviewVisible(false)}
        />
      )}
    </div>
  );
};

export default Gallery;
