import { RemoveRedEyeRounded, VisibilityOffRounded } from "@mui/icons-material"
import { Checkbox, InputAdornment, TextField } from "@mui/material"
import { get } from "lodash-es"
import { useMemo, useState } from "react"

const FPasswordField = ({ formik, name, disabledHelperText, InputProps, ...props }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const computedHelperText = useMemo(() => {
    if (disabledHelperText) return null
    return (get(formik.touched, name) && get(formik.errors, name)) ?? " "
  }, [formik.touched, formik.errors])

  return (
    <TextField
      size="small"
      value={get(formik.values, name)}
      name={name}
      onChange={formik.handleChange}
      error={get(formik.touched, name) && Boolean(get(formik.errors, name))}
      helperText={computedHelperText}
      type={isPasswordVisible ? "text" : "password"}
      InputProps={{
        ...InputProps,
        endAdornment: (
          <InputAdornment position="end">
            <Checkbox 
              icon={<RemoveRedEyeRounded />}
              checkedIcon={<VisibilityOffRounded />}
              checked={isPasswordVisible}
              onChange={(e) => setIsPasswordVisible(e.target.checked)}
            />
          </InputAdornment>
        ),
      }}
      {...props}
      
    />
  )
}

export default FPasswordField
