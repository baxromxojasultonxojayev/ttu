import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const HFTextField = ({
  control,
  name = "",
  disabledHelperText = false,
  required = false,
  rules = {},
  placeholder,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      rules={{
        required: required ? "This is required field" : false,
        ...rules,
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          size="small"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          name={name}
          error={error}
          helperText={!disabledHelperText && (error?.message ?? " ")}
          placeholder={placeholder}
          {...props}
        />
      )}
    ></Controller>
  );
};

export default HFTextField;
