import { alertActions } from "./alert.slice";

let _id = 1;

export const showAlert =
  (title = "", type = "error") =>
  (dispatch) => {
    let id = _id;
    dispatch(alertActions.addAlert({ title, type, id }));
    setTimeout(() => {
      dispatch(alertActions.deleteAlert(id));
    }, 4000);
    _id++;
  };
