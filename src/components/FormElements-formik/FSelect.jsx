import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material"
import { get } from 'lodash-es'

const FSelect = ({formik, name, label, width = "100%", options = [], disabledHelperText, onChange=()=>{}, ...props}) => {

  return (
    <FormControl style={{width}} >
      <InputLabel size="small"  >{label}</InputLabel>
      <Select
        value={get(formik.values, name)}
        label={label}
        size="small"
        error={get(formik.touched, name) && Boolean(get(formik.errors, name))}
        fullWidth
        onChange={(e) => {
          formik.setFieldValue(name, e.target.value)
          onChange(e.target.value)
        }}
      >
        {
          options?.map(option => (
            <MenuItem key={option.value} value={option.value} >{option.label}</MenuItem>
          ))
        } 
      </Select>
      {!disabledHelperText && <FormHelperText error>{(get(formik.touched, name) && get(formik.errors, name)) ?? " "}</FormHelperText>}
    </FormControl>
  )
}

export default FSelect
