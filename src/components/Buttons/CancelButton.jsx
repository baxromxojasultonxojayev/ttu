import { Button } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

const CancelButton = ({ children, title = "Cancel", ...props }) => {
  return (
    <Button
      style={{
        minWidth: 130,
        background: "white",
        color: "#F76659",
        border: "1px solid #DDE2E4",
        borderRadius: "6px",
        boxShadow: "none",
      }}
      // startIcon={<CancelIcon />}
      variant="contained"
      // color="warning"
      {...props}
    >
      {title}
    </Button>
  );
};

export default CancelButton;
