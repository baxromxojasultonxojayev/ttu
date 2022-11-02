import "./style.scss";
// import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state"
import {
  Button,
  Card,
  CircularProgress,
  IconButton,
  Popover,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useId, useState } from "react";

const ButtonsPopover = ({
  onEditClick,
  onDeleteClick = () => {},
  activeEyeButton,
  buttonProps,
  loading,
  itemId,
  openModal = () => {},
  orientation = "vertical",
  className,
}) => {
  const id = useId();
  const [anchorEl, setAnchorEl] = useState(null);
  const permission = localStorage.getItem("permissions");
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  if (loading)
    return (
      <IconButton color="primary">
        <CircularProgress size={17} {...buttonProps} />
      </IconButton>
    );

  // return null

  return (
    <div onClick={(e) => e.stopPropagation()} className={className}>
      <IconButton color="primary" {...buttonProps} onClick={handleClick}>
        {orientation === "vertical" ? <MoreVertIcon /> : <MoreHorizIcon />}
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
        }}
      >
        <Card elevation={12} className="ButtonsPopover">
          {activeEyeButton && (
            <IconButton
              color="primary"
              onClick={(e) => {
                handleClose();
                openModal(e, id);
              }}
            >
              <RemoveRedEyeIcon />
            </IconButton>
          )}
          {onEditClick && (
            <Button
              color="success"
              onClick={(e) => {
                handleClose();
                onEditClick(e, itemId);
              }}
            >
              <EditIcon />
              <p style={{ color: "#303940" }}>Редактировать</p>
            </Button>
          )}
          <br></br>
          {permission === "admin" && (
            <Button
              color="error"
              onClick={(e) => {
                handleClose();
                onDeleteClick(e, itemId);
              }}
            >
              <DeleteIcon />
              <p>Удалить</p>
            </Button>
          )}
        </Card>
      </Popover>
    </div>
  );

  // return (
  //   <PopupState variant="popover" >
  //     {(popupState) => (
  //       <div className="ButtonsPopover" onClick={(e) => e.stopPropagation()}>
  // <IconButton color="primary"  {...bindTrigger(popupState)} {...buttonProps} >
  //   {
  //     orientation === 'vertical' ? <MoreVertIcon /> : <MoreHorizIcon />
  //   }
  // </IconButton>
  //         <Popover
  //           {...bindPopover(popupState)}
  //           anchorOrigin={{
  //             vertical: "bottom",
  //             horizontal: "center",
  //           }}
  //           transformOrigin={{
  //             vertical: "top",
  //             horizontal: "center",
  //           }}
  //         >
  // <Card elevation={12} className="ButtonsPopover">
  //   {activeEyeButton && (
  //     <IconButton color="primary" onClick={(e) => openModal(e, id)}>
  //       <RemoveRedEyeIcon />
  //     </IconButton>
  //   )}
  //   {onEditClick && <IconButton color="success" onClick={(e) => onEditClick(e, id)}>
  //     <EditIcon />
  //   </IconButton>}
  //   <IconButton color="error" onClick={(e) => onDeleteClick(e, id)}>
  //     <DeleteIcon />
  //   </IconButton>
  // </Card>
  //         </Popover>
  //       </div>
  //     )}
  //   </PopupState>
  // )
};

export default ButtonsPopover;
