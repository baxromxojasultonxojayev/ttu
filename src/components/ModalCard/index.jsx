import { Close } from "@mui/icons-material";
import { Card, IconButton, Modal } from "@mui/material";
import PrimaryButton from "../Buttons/PrimaryButton";
import SecondaryButton from "../Buttons/SecondaryButton";
import styles from "./style.module.scss";

const ModalCard = ({ title, children, onClose, onSaveButtonClick }) => {
  return (
    <div>
      <Modal open className={styles.modal} onClose={onClose}>
        <Card className={styles.card}>
          <div className={styles.header}>
            <div></div>
            <div className={styles.cardTitle}>{title}</div>
            <IconButton className={styles.closeButton} onClick={onClose}>
              <Close className={styles.closeIcon} />
            </IconButton>
          </div>

          <div className={styles.body}>{children}</div>

          <dir className={styles.footer}>
            <SecondaryButton className={styles.button} onClick={onClose}>
              Отменить
            </SecondaryButton>
            <PrimaryButton
              className={styles.button}
              onClick={onSaveButtonClick}
            >
              Сохранить
            </PrimaryButton>
          </dir>
        </Card>
      </Modal>
    </div>
  );
};

export default ModalCard;
