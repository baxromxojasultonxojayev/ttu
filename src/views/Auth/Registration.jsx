import { Checkbox, TextField } from "@mui/material"
import PrimaryButton from "../../components/Buttons/PrimaryButton"
import RectangleIconButton from "../../components/Buttons/RectangleIconButton"
import DownloadIcon from "@mui/icons-material/Download"
import styles from "./style.module.scss"

const Registration = () => {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Регистрация</h1>
      <p className={styles.subtitle}>Регистрация через ЕЦП ключ</p>

      <form className={styles.form}>
        <div className={styles.formArea}>
          <div className={styles.formRow}>
            <p className={styles.label}>Выберите ЕЦП ключ</p>
            {/* <ESPselect /> */}
          </div>

          <div className={styles.formRow}>
            <p className={styles.label}>Пароль</p>
            <TextField fullWidth placeholder="Введите пароль" />
          </div>
          <div className={styles.formRow}>
            <p className={styles.label}>Повторите пароль</p>
            <TextField fullWidth placeholder="Повторите пароль" />
          </div>
          <div className={styles.formRow}>
            <p className={styles.label}>Электронная почта</p>
            <TextField fullWidth placeholder="Введите электронную почту" />
          </div>

          <div className={styles.formRow}>
            <p className={styles.label}>Публичная оферта</p>

            <div className={styles.publickOfferRow}>

              <div className={styles.nameBlock}>
                <p className={styles.fileName}>
                  Публичная оферта IT услуг Soliq Servis.uz
                </p>
                <p className={styles.fileSize}>5.2mb</p>
              </div>

              <RectangleIconButton color="primary">
                <DownloadIcon color="primary" />
              </RectangleIconButton>
            </div>
          </div>

          <div className={styles.formRow}>
            <div>
              <Checkbox
                id={`checkbox`}
                style={{ transform: "translatey(-1px)" }}
              />
              <label htmlFor={`checkbox`} className={styles.checkboxLabel}>
                Я принимаю условия публичной оферты
              </label>
            </div>
          </div>
        </div>

        <div className={styles.buttonsArea}>
          <PrimaryButton>Продолжить</PrimaryButton>
        </div>
      </form>
    </div>
  )
}

export default Registration
