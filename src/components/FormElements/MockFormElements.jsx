import { TextField } from "@mui/material"

export const MTextField = ({
  control,
  name = "",
  disabledHelperText = false,
  required = false,
  rules = {},
  ...props
}) => {
  return (
    <TextField
      size="small"
      name={name}
      helperText={!disabledHelperText && (" ")}
      {...props}
    />
  )
}
