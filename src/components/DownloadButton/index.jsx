import { useState } from "react";
import { WindowSharp } from "@mui/icons-material";
import DownloadIcon from "@mui/icons-material/Download";
import { Button, CircularProgress, InputAdornment } from "@mui/material";
import useDownloader from "../../hooks/useDownloader";
import request from "../../utils/request";
import { format } from "date-fns";
import downloadImage from "./download.png";
import "./style.scss";

const DownloadButton = ({
  title,
  onChange,
  onClick,
  search,
  date,
  offset,
  limit,
  ...props
}) => {
  const [download, loader] = useDownloader();
  const [loading, setLoading] = useState(false);
  const clickHandler = () => {
    setLoading(true);
    request
      .get(`/excel/applications`)
      .then((res) => download(res.url))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="button">
      <Button
        sx={{
          background: "white",
          "&:hover": {
            background: "white",
          },
        }}
        size="small"
        onClick={onClick}
        {...props}
        InputProps={{
          startAdornment: (
            <InputAdornment style={{ marginRight: 10 }}></InputAdornment>
          ),
        }}
      >
        {loading && (
          <CircularProgress size={20} style={{ marginRight: "10px" }} />
        )}
        {/* <DownloadIcon /> */}
        <img
          src={downloadImage}
          style={{ width: "20px", height: "20px" }}
          alt=""
        />
        <span>{title}</span>
      </Button>
    </div>
  );
};

export default DownloadButton;
