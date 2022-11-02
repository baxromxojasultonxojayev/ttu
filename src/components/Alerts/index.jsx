import { Alert } from "@mui/material";
import { useSelector } from "react-redux";
import "./style.scss";

// Alert severity = [error, warning, info, success]

const Alerts = () => {
  const alerts = useSelector((state) => state.alert.alerts);
  console.log("alerts", alerts);
  return (
    <div className="Alerts">
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          className="alert shake-animation"
          severity={alert.type}
        >
          {alert.title}
        </Alert>
      ))}
    </div>
  );
};

export default Alerts;
