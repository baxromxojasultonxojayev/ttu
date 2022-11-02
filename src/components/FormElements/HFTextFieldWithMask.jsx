import { TextField } from "@mui/material"
import { Controller } from "react-hook-form"
import InputMask from "react-input-mask"

const HFTextFieldWithMask = ({
  control,
  name = "",
  disabledHelperText = false,
  required = false,
  rules = {},
  mask,
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
        <InputMask
          mask={mask}
          value={value ?? undefined}
          onChange={e => onChange(e.target.value)}
        >
          {(inputProps) => (
            <TextField
              size="small"
              name={name}
              error={error}
              helperText={!disabledHelperText && (error?.message ?? " ")}
              {...inputProps}
              {...props}
            />
          )}
        </InputMask>
      )}
    ></Controller>
  )
}

export default HFTextFieldWithMask
