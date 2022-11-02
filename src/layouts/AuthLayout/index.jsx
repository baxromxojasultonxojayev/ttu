import { Outlet } from "react-router-dom";
import styles from "./style.module.scss";

const AuthLayout = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.leftSide}>
        <div></div>
        <div className={styles.logoBlock}>
          <img src="/logo.png" className={styles.logo} />
          {/* <h1 className={styles.logoTitle}>Soliq</h1>
          <h1 className={styles.logoTitle}>Servis</h1> */}
        </div>

        <div className={styles.subtitleBlock}>
          {/* © Soliq Servis. Все права защищены */}
        </div>
      </div>
      <div className={styles.rightSide}>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
