import { LocalizationProvider } from "@mui/x-date-pickers";
import ThemeConfig from "../theme/index";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const MaterialUIProvider = ({ children }) => {
  const theme = "light";

  return (
    <div className={theme === "dark" ? "night-mode" : ""}>
      <ThemeConfig>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          {children}
        </LocalizationProvider>
      </ThemeConfig>
    </div>
  );
};

export default MaterialUIProvider;
