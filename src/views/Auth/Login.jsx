import { useNavigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import styles from "./style.module.scss";

const Login = () => {
  const navigate = useNavigate();

  const navigateToRegistrationForm = () => {
    navigate("/applications");
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Вход в систему</h1>
      <p className={styles.subtitle}>Заполните данные для входа в аккаунт</p>

      {/* <div className={styles.typeSwitchRow}>
        <div
          className={`${styles.typeSwitchButton} ${
            loginType === "ESP" ? styles.active : ""
          }`} 
          onClick={onESPFormSelected}
        >
          <div className={styles.typeSwitchButtonLabel}>ЕЦП ключ</div>
          <KeyOutlined />
        </div>
        <div
          className={`${styles.typeSwitchButton} ${
            loginType === "LOGIN" ? styles.active : ""
          }`}
          onClick={onLoginFormSelected}
        >
          <div className={styles.typeSwitchButtonLabel}>Логин</div>
          <KeyOutlined />
        </div>
      </div> */}

      <LoginForm navigateToRegistrationForm={navigateToRegistrationForm} />
    </div>
  );
};

export default Login;
