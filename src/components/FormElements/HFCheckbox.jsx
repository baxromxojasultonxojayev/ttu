import { Checkbox } from "@mui/material"
import { useId } from "react"
import { Controller } from "react-hook-form"

const HFCheckbox = ({ control, name, label, className }) => {
  const id = useId()

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={false}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className={className} >
          <Checkbox
            id={`checkbox-${id}`}
            style={{ transform: "translatey(-1px)" }}
            checked={value ?? false}
            onChange={(_, val) => onChange(val)}
          />
          <label htmlFor={`checkbox-${id}`}>{label}</label>
        </div>
      )}
    ></Controller>
  )
}

export default HFCheckbox
