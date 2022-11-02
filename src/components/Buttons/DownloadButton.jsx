import LoadingButton from "@mui/lab/LoadingButton";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const DownloadButton = ({ children, title = "Edit", ...props }) => {
  return (
    <LoadingButton
      style={{ minWidth: 10 }}
      startIcon={<PictureAsPdfIcon />}
      variant="contained"
      loadingPosition="start"
      {...props}
    >
      {title}
    </LoadingButton>
  );
};

export default DownloadButton;
