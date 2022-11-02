import ReactDatePicker, { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import icon from "./icon.png";

import "./style.scss";
import { TextField, InputAdornment } from "@mui/material";
import { forwardRef } from "react";
import { CalendarMonth } from "@mui/icons-material";

registerLocale("ru", ru);

const ExampleCustomInput = forwardRef((props, ref) => (
  <TextField
    inputRef={ref}
    {...props}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <CalendarMonth />
        </InputAdornment>
      ),
    }}
    placeholder="Bыберите период"
  />
));

const CRangePicker = ({ value = [null, null], onChange }) => {
  return (
    <ReactDatePicker
      selected={value[0]}
      onChange={onChange}
      startDate={value[0]}
      endDate={value[1]}
      selectsRange
      showPopperArrow={false}
      dateFormat="dd.MM.yyyy"
      locale="ru"
      customInput={<ExampleCustomInput />}
    />
  );
};

export default CRangePicker;
