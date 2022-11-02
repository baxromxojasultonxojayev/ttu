import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import cls from "./AddedModal.module.scss";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import checkImage from "./check.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: "16px",
  width: "421px",
  textAlign: "center",
  borderRadius: "8px",
  MuiModal: {
    styleOverrides: {
      root: {
        background: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(12px)",
        border: "none",
      },
    },
  },
};
const StudentAddedModal = ({ openModal, handleCloseModal }) => {
  const navigate = useNavigate();

  return (
    <div className={cls.box}>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img src={checkImage} className={cls.image} />
          </div>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            marginTop="4px"
          >
            Заявки добавлены{" "}
          </Typography>
          <Typography marginTop="8px" marginBottom="16px" fontSize="16px">
            Заявки студентов успешно добавлены на зачисленные студенты
          </Typography>
          <div style={{ width: "100%" }}>
            <PrimaryButton
              onClick={() => navigate("/enrolled-students")}
              style={{ width: "100%" }}
            >
              Перейти в зачисленные студенты
            </PrimaryButton>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default StudentAddedModal;
