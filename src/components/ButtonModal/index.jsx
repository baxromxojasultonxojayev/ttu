import { useState } from "react";
import { Button, CircularProgress, InputAdornment } from "@mui/material";
import useDownloader from "../../hooks/useDownloader";
import request from "../../utils/request";
import { format } from "date-fns";
import EyeImage from "./eye.svg";
import "./style.scss";

const ModalButton = ({
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
        className="customButton"
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
        <img src={EyeImage} alt="" />
        <span>{title}</span>
      </Button>
    </div>
  );
};

export default ModalButton;
