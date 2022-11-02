import { DatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const HFDatePicker = ({
  control,
  className,
  name,
  label,
  width,
  inputProps,
  disabledHelperText,
  placeholder,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className={className}>
          <DatePicker
            inputFormat="dd.MM.yyyy"
            mask="__.__.____"
            toolbarFormat="dd.MM.yyyy"
            value={value}
            name={name}
            onChange={onChange}
            {...props}
            renderInput={(params) => (
              <TextField
                {...params}
                style={{ width }}
                size="small"
                error={error}
                helperText={!disabledHelperText && (error?.message ?? " ")}
                {...inputProps}
                inputProps={{
                  ...params.inputProps,
                  placeholder,
                }}
                required
                label={label}
              />
            )}
          />
        </div>
      )}
    ></Controller>
  );
};

export default HFDatePicker;
