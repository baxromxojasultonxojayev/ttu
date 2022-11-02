import { DatePicker } from "@mui/lab"
import { TextField } from "@mui/material"
import { get } from 'lodash-es'

const FDatePicker = ({formik, name, label, width, inputProps, ...props}) => {

  return (
    <DatePicker
      inputFormat="dd.MM.yyyy"
      mask="__.__.____"
      toolbarFormat="dd.MM.yyyy"
      value={get(formik.values, name)}
      name={name}
      onChange={value => formik.setFieldValue(name, value)}
      {...props}
      renderInput={(params) => (
        <TextField 
          {...params}
          style={{ width }}
          size="small"
          error={get(formik.touched, name) && Boolean(get(formik.errors, name))}
          helperText={(get(formik.touched, name) && get(formik.errors, name)) ?? " "}
          {...inputProps}
          label={label}
        />
      )}
    />
  )
}

export default FDatePicker
