import { Switch } from "@mui/material"
import { useId } from "react"
import { Controller } from "react-hook-form"

const HFSwitch = ({ control, name, label, disabledHelperText, labelProps, ...props }) => {
  const id = useId()

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={false}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className={!disabledHelperText ? 'mb-1' : ''} >
          <Switch
            id={`switch-${id}`}
            {...props}
            checked={value ?? false}
            onChange={(e, val) => onChange(val)}
          />
          <label htmlFor={`switch-${id}`} {...labelProps}>
            {label}
          </label>
        </div>
      )}
    ></Controller>
  )
}

export default HFSwitch
