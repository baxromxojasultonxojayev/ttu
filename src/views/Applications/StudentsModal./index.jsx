import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import icon from "./deleteIcon.svg";
import cls from "./StudentModal.module.scss";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  width: "1032px",
  p: "16px",
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

const StudentsModal = ({ openModal, openAddedModal, handleCloseModal }) => {
  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Выбранные заявки
          </Typography>
          <ul className={cls.list}>
            <li>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  width="156px"
                  sx={{ display: "flex", columnGap: "4px" }}
                >
                  <span>1.</span> <span>Саидахмадов Санжарбек</span>
                </Typography>
                <img src={icon} alt="" />
              </Box>
            </li>
            <li>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  width="156px"
                  sx={{ display: "flex", columnGap: "4px" }}
                >
                  <span>1.</span> <span>Саидахмадов Санжарбек</span>
                </Typography>
                <img src={icon} alt="" />
              </Box>
            </li>
            <li>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  width="156px"
                  sx={{ display: "flex", columnGap: "4px" }}
                >
                  <span>1.</span> <span>Саидахмадов Санжарбек</span>
                </Typography>
                <img src={icon} alt="" />
              </Box>
            </li>
            <li>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  width="156px"
                  sx={{ display: "flex", columnGap: "4px" }}
                >
                  <span>1.</span> <span>Саидахмадов Санжарбек</span>
                </Typography>
                <img src={icon} alt="" />
              </Box>
            </li>
            <li>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  width="156px"
                  sx={{ display: "flex", columnGap: "4px" }}
                >
                  <span>1.</span> <span>Саидахмадов Санжарбек</span>
                </Typography>
                <img src={icon} alt="" />
              </Box>
            </li>
            <li>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  width="156px"
                  sx={{ display: "flex", columnGap: "4px" }}
                >
                  <span>1.</span> <span>Саидахмадов Санжарбек</span>
                </Typography>
                <img src={icon} alt="" />
              </Box>
            </li>
            <li>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  width="156px"
                  sx={{ display: "flex", columnGap: "4px" }}
                >
                  <span>1.</span> <span>Саидахмадов Санжарбек</span>
                </Typography>
                <img src={icon} alt="" />
              </Box>
            </li>
            <li>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  width="156px"
                  sx={{ display: "flex", columnGap: "4px" }}
                >
                  <span>1.</span> <span>Саидахмадов Санжарбек</span>
                </Typography>
                <img src={icon} alt="" />
              </Box>
            </li>
            <li>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  width="156px"
                  sx={{ display: "flex", columnGap: "4px" }}
                >
                  <span>1.</span> <span>Саидахмадов Санжарбек</span>
                </Typography>
                <img src={icon} alt="" />
              </Box>
            </li>{" "}
            <li>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  width="156px"
                  sx={{ display: "flex", columnGap: "4px" }}
                >
                  <span>1.</span> <span>Саидахмадов Санжарбек</span>
                </Typography>
                <img src={icon} alt="" />
              </Box>
            </li>
            <li>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  width="156px"
                  sx={{ display: "flex", columnGap: "4px" }}
                >
                  <span>1.</span> <span>Саидахмадов Санжарбек</span>
                </Typography>
                <img src={icon} alt="" />
              </Box>
            </li>
            <li>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  width="156px"
                  sx={{ display: "flex", columnGap: "4px" }}
                >
                  <span>1.</span> <span>Саидахмадов Санжарбек</span>
                </Typography>
                <img src={icon} alt="" />
              </Box>
            </li>
            <li>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  width="156px"
                  sx={{ display: "flex", columnGap: "4px" }}
                >
                  <span>1.</span> <span>Саидахмадов Санжарбек</span>
                </Typography>
                <img src={icon} alt="" />
              </Box>
            </li>
            <li>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  width="156px"
                  sx={{ display: "flex", columnGap: "4px" }}
                >
                  <span>1.</span> <span>Саидахмадов Санжарбек</span>
                </Typography>
                <img src={icon} alt="" />
              </Box>
            </li>
            <li>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  width="156px"
                  sx={{ display: "flex", columnGap: "4px" }}
                >
                  <span>1.</span> <span>Саидахмадов Санжарбек</span>
                </Typography>
                <img src={icon} alt="" />
              </Box>
            </li>
            <li>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  width="156px"
                  sx={{ display: "flex", columnGap: "4px" }}
                >
                  <span>1.</span> <span>Саидахмадов Санжарбек</span>
                </Typography>
                <img src={icon} alt="" />
              </Box>
            </li>
            <li>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  width="156px"
                  sx={{ display: "flex", columnGap: "4px" }}
                >
                  <span>1.</span> <span>Саидахмадов Санжарбек</span>
                </Typography>
                <img src={icon} alt="" />
              </Box>
            </li>
            <li>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  width="156px"
                  sx={{ display: "flex", columnGap: "4px" }}
                >
                  <span>1.</span> <span>Саидахмадов Санжарбек</span>
                </Typography>
                <img src={icon} alt="" />
              </Box>
            </li>
            <li>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  width="156px"
                  sx={{ display: "flex", columnGap: "4px" }}
                >
                  <span>1.</span> <span>Саидахмадов Санжарбек</span>
                </Typography>
                <img src={icon} alt="" />
              </Box>
            </li>
            <li>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  width="156px"
                  sx={{ display: "flex", columnGap: "4px" }}
                >
                  <span>1.</span> <span>Саидахмадов Санжарбек</span>
                </Typography>
                <img src={icon} alt="" />
              </Box>
            </li>
            <li>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  width="156px"
                  sx={{ display: "flex", columnGap: "4px" }}
                >
                  <span>1.</span> <span>Саидахмадов Санжарбек</span>
                </Typography>
                <img src={icon} alt="" />
              </Box>
            </li>
            <li>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  width="156px"
                  sx={{ display: "flex", columnGap: "4px" }}
                >
                  <span>1.</span> <span>Саидахмадов Санжарбек</span>
                </Typography>
                <img src={icon} alt="" />
              </Box>
            </li>
            <li>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  width="156px"
                  sx={{ display: "flex", columnGap: "4px" }}
                >
                  <span>1.</span> <span>Саидахмадов Санжарбек</span>
                </Typography>
                <img src={icon} alt="" />
              </Box>
            </li>
            <li>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  width="156px"
                  sx={{ display: "flex", columnGap: "4px" }}
                >
                  <span>1.</span> <span>Саидахмадов Санжарбек</span>
                </Typography>
                <img src={icon} alt="" />
              </Box>
            </li>
            <li>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  width="156px"
                  sx={{ display: "flex", columnGap: "4px" }}
                >
                  <span>1.</span> <span>Саидахмадов Санжарбек</span>
                </Typography>
                <img src={icon} alt="" />
              </Box>
            </li>
            <li>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  width="156px"
                  sx={{ display: "flex", columnGap: "4px" }}
                >
                  <span>1.</span> <span>Саидахмадов Санжарбек</span>
                </Typography>
                <img src={icon} alt="" />
              </Box>
            </li>
            <li>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  width="156px"
                  sx={{ display: "flex", columnGap: "4px" }}
                >
                  <span>1.</span> <span>Саидахмадов Санжарбек</span>
                </Typography>
                <img src={icon} alt="" />
              </Box>
            </li>
            <li>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  width="156px"
                  sx={{ display: "flex", columnGap: "4px" }}
                >
                  <span>1.</span> <span>Саидахмадов Санжарбек</span>
                </Typography>
                <img src={icon} alt="" />
              </Box>
            </li>
            <li>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  width="156px"
                  sx={{ display: "flex", columnGap: "4px" }}
                >
                  <span>1.</span> <span>Саидахмадов Санжарбек</span>
                </Typography>
                <img src={icon} alt="" />
              </Box>
            </li>
            <li>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  width="156px"
                  sx={{ display: "flex", columnGap: "4px" }}
                >
                  <span>1.</span> <span>Саидахмадов Санжарбек</span>
                </Typography>
                <img src={icon} alt="" />
              </Box>
            </li>
            <li>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  width="156px"
                  sx={{ display: "flex", columnGap: "4px" }}
                >
                  <span>1.</span> <span>Саидахмадов Санжарбек</span>
                </Typography>
                <img src={icon} alt="" />
              </Box>
            </li>
            <li>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  width="156px"
                  sx={{ display: "flex", columnGap: "4px" }}
                >
                  <span>1.</span> <span>Саидахмадов Санжарбек</span>
                </Typography>
                <img src={icon} alt="" />
              </Box>
            </li>
            <li>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  width="156px"
                  sx={{ display: "flex", columnGap: "4px" }}
                >
                  <span>1.</span> <span>Саидахмадов Санжарбек</span>
                </Typography>
                <img src={icon} alt="" />
              </Box>
            </li>
            <li>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  width="156px"
                  sx={{ display: "flex", columnGap: "4px" }}
                >
                  <span>1.</span> <span>Саидахмадов Санжарбек</span>
                </Typography>
                <img src={icon} alt="" />
              </Box>
            </li>
            <li>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  width="156px"
                  sx={{ display: "flex", columnGap: "4px" }}
                >
                  <span>1.</span> <span>Саидахмадов Санжарбек</span>
                </Typography>
                <img src={icon} alt="" />
              </Box>
            </li>
            <li>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  width="156px"
                  sx={{ display: "flex", columnGap: "4px" }}
                >
                  <span>1.</span> <span>Саидахмадов Санжарбек</span>
                </Typography>
                <img src={icon} alt="" />
              </Box>
            </li>
            <li>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  width="156px"
                  sx={{ display: "flex", columnGap: "4px" }}
                >
                  <span>1.</span> <span>Саидахмадов Санжарбек</span>
                </Typography>
                <img src={icon} alt="" />
              </Box>
            </li>
            <li>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  width="156px"
                  sx={{ display: "flex", columnGap: "4px" }}
                >
                  <span>1.</span> <span>Саидахмадов Санжарбек</span>
                </Typography>
                <img src={icon} alt="" />
              </Box>
            </li>
          </ul>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "10px",
              marginTop: "16px",
            }}
          >
            <PrimaryButton
              onClick={() => {
                openAddedModal(), handleCloseModal();
              }}
              sx={{
                color: "white",
                fontSize: "14px",
              }}
            >
              Добавить к зачислённым
            </PrimaryButton>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default StudentsModal;
