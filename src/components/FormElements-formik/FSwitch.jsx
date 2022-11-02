import { Switch } from "@mui/material"
import { get } from 'lodash-es'

const FSwitch = ({ formik, name, label, labelProps, ...props }) => {

  // const randomId = useMemo(() => {
  //   return generateRandomNumber()
  // }, [])

  return (
    <div>
      <Switch
        // id={`switch-${randomId}`}
        id={`switch`}
        {...props}
        checked={get(formik.values,  name)}
        onChange={(e, val) => formik.setFieldValue(name, val)}
      />
      <label
        // htmlFor={`switch-${randomId}`}
        htmlFor={`switch`}
        {...labelProps} >{label}</label>
    </div>
  )
}

export default FSwitch