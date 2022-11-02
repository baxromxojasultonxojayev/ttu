import { useState } from "react";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import SecondaryButton from "../../../components/Buttons/SecondaryButton";
import { authActions } from "../../../store/auth/auth.slice";
import classes from "../style.module.scss";
import {
  ADMIN_LOGIN,
  ADMIN_PASSWORD,
  APPLICATION_LOGIN,
  APPLICATION_PASSWORD,
  CALLCENTER_LOGIN,
  CALLCENTER_PASSWORD,
} from "../../../constants";
import { showAlert } from "../../../store/alert/alert.thunk";

const LoginForm = ({ navigateToRegistrationForm }) => {
  const dispatch = useDispatch();
  const [showPass, setShowPass] = useState(false);
  const [cred, setCred] = useState({
    login: "",
    pass: "",
  });

  const loginRoute = (arg = "") => {
    switch (arg) {
      case "application":
        localStorage.setItem("permissions", "application");
        break;
      case "callCentre":
        localStorage.setItem("permissions", "callCentre");
        break;
      default:
        break;
    }
    localStorage.setItem("isLogged", true);
    dispatch(authActions.login());
    window.location.replace("/applications");
  };

  const onFinish = (e) => {
    e.stopPropagation();
    if (
      (cred.login === ADMIN_LOGIN ||
        cred.login === APPLICATION_LOGIN ||
        cred.login === CALLCENTER_LOGIN) &&
      (cred.pass === APPLICATION_PASSWORD ||
        cred.pass === CALLCENTER_PASSWORD ||
        cred.pass === ADMIN_PASSWORD)
    ) {
      if (cred.login === ADMIN_LOGIN && cred.pass === ADMIN_PASSWORD) {
        localStorage.setItem("isLogged", true);
        localStorage.setItem("permissions", "admin");
        dispatch(authActions.login());
        window.location.replace("/applications");
      }
      if (
        cred.login === APPLICATION_LOGIN &&
        cred.pass === APPLICATION_PASSWORD
      ) {
        localStorage.setItem("isLogged", true);
        localStorage.setItem("permissions", "application");
        dispatch(authActions.login());
        window.location.replace("/enrolled-students");
      }
      if (
        cred.login === CALLCENTER_LOGIN &&
        cred.pass === CALLCENTER_PASSWORD
      ) {
        localStorage.setItem("isLogged", true);
        localStorage.setItem("permissions", "callCentre");
        window.location.replace("/applications");
        dispatch(authActions.login());
      }
    } else {
      dispatch(showAlert("Login yoki parol xato kiritilgan", "error"));
    }
  };

  return (
    <div
      // onSubmit={(e) => {
      //   e.stopPropagation();
      //   onFinish();
      //   // dispatch(authActions.login());
      //   // navigateToRegistrationForm();
      // }}
      className={classes.form}
    >
      <div className={classes.formArea}>
        <div className={classes.formRow}>
          <p className={classes.label}>Введите e-mail *</p>
          <TextField
            onChange={(e) => setCred({ ...cred, login: e.target.value })}
            fullWidth
            placeholder="Введите логин"
          />
        </div>
        <div className={classes.formRow}>
          <p className={classes.label}>Пароль*</p>
          <TextField
            fullWidth
            onChange={(e) => setCred({ ...cred, pass: e.target.value })}
            type={showPass ? "text" : "password"}
            placeholder="Введите пароль"
            InputProps={{
              startAdornment: (
                <InputAdornment
                  sx={{ position: "absolute", right: 12 }}
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? (
                    <Visibility sx={{ cursor: "pointer" }} />
                  ) : (
                    <VisibilityOff sx={{ cursor: "pointer" }} />
                  )}
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className={classes.buttonsArea}>
          <PrimaryButton onClick={onFinish}>Войти</PrimaryButton>
          {/* <SecondaryButton type="button" onClick={navigateToRegistrationForm}>
            Зарегистрироваться
          </SecondaryButton> */}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
