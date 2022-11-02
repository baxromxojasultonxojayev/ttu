import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import LogoutIcon from "@mui/icons-material/Logout";
import { Collapse, Modal, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../../../public/sideBar/logo.svg";
import useSidebarElements from "../../hooks/useSidebarElements";
import { authActions } from "../../store/auth/auth.slice";
import CancelButton from "../Buttons/CancelButton";
import SaveButton from "../Buttons/SaveButton";
import IconGenerator from "../IconPicker/IconGenerator";
import styles from "./style.module.scss";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "12px",
  boxShadow:
    "0px 0px 1px rgba(26, 32, 36, 0.32), 0px 40px 64px rgba(91, 104, 113, 0.24);",
  p: 4,
  border: "none",
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
const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { elements } = useSidebarElements();

  const [rightBlockVisible, setRightBlockVisible] = useState(true);

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const selectedMenuItem = useMemo(() => {
    const activeElement = elements.find((el) => {
      if (location.pathname.includes(el.path)) return true;
      return el.children?.some((child) =>
        location.pathname.includes(child.path)
      );
    });

    return activeElement;
  }, [location.pathname]);

  const logout = () => {
    dispatch(authActions.logout());
    window.location.reload();
    // window.location.href = "/login";
  };

  useEffect(() => {
    if (selectedMenuItem?.children) setRightBlockVisible(true);
  }, [selectedMenuItem]);

  return (
    <div className={styles.sidebar}>
      <div className={styles.leftSide}>
        <div
          className={styles.header}
          onClick={() => setRightBlockVisible((prev) => !prev)}
        >
          <img className={styles.logo} src={Logo} alt="logo" />
        </div>

        <div className={styles.menuItemsBlock}>
          {elements.map((element) => (
            <Tooltip
              placement="right"
              followCursor
              key={element.id}
              title={element.title}
            >
              <NavLink
                key={element.id}
                to={element.path ?? element.children?.[0]?.path}
                className={`${styles.menuItem} ${
                  selectedMenuItem?.id === element.id ? styles.active : ""
                }`}
              >
                {typeof element.icon === "string" ? (
                  <IconGenerator icon={element.icon} />
                ) : (
                  <element.icon />
                )}
              </NavLink>
            </Tooltip>
          ))}
        </div>

        <div className={styles.footer}>
          <Modal open={openModal}>
            <Box sx={style}>
              <div style={{ alignItems: "center", paddingLeft: "70px" }}>
                <Typography color="#252C32" fontWeight="600">
                  Вы уверены что хотите выйти?
                </Typography>
              </div>
              <div style={{ display: "flex", marginTop: "20px" }}>
                <div style={{ marginLeft: "20px" }}>
                  <CancelButton title="Да" onClick={logout} />{" "}
                </div>
                <div style={{ marginLeft: "20px" }}>
                  <SaveButton
                    title="Нет"
                    type="submit"
                    onClick={handleCloseModal}
                  />
                </div>
              </div>
            </Box>
          </Modal>

          <div className={styles.menuItem} onClick={handleOpenModal}>
            <LogoutIcon />
          </div>
          {/* <div className={styles.menuItem}>
            <NotificationsIcon />
          </div>

          <div className={styles.menuItem}>
            <SettingsIcon />
          </div>

          <UserAvatar disableTooltip /> */}
        </div>
      </div>

      <Collapse
        in={rightBlockVisible && selectedMenuItem?.children}
        orientation="horizontal"
        unmountOnExit
      >
        <div className={styles.rightSide}>
          <div className={styles.header}>
            <Typography className={styles.title} variant="h4">
              {selectedMenuItem?.title}
            </Typography>
            <div
              className={styles.closeButton}
              onClick={() => setRightBlockVisible(false)}
            >
              <KeyboardDoubleArrowLeftIcon />
            </div>
          </div>

          <div className={styles.menuItemsBlock}>
            {selectedMenuItem?.children?.map((childMenuItem) => (
              <NavLink
                to={childMenuItem.path}
                key={childMenuItem.key}
                className={({ isActive }) =>
                  `${styles.menuItem} ${isActive ? styles.active : ""}`
                }
              >
                {childMenuItem.title}
              </NavLink>
            ))}
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default Sidebar;
