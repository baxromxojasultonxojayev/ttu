import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"

const CSelect = ({value, onChange = () => {}, width, style, label, options, id, variant, required, error, helperText ,...props}) => {

  return (
    <FormControl fullWidth style={style}  >
      <InputLabel required={required} size="small" id={'CSelect-' + id + '-label'}>{label}</InputLabel>
      <Select
        labelId={'CSelect-' + id + '-label'}
        value={value}
        label={label}
        onChange={onChange}
        variant={variant}
        error={error}
        style={{ width }}
        size="small"
        {...props}
      >
        {
          options?.map((option, index) => (
            <MenuItem style={{justifyContent: "center"}} key={index} value={option.value}>{option.label}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  )
}

export default CSelect
