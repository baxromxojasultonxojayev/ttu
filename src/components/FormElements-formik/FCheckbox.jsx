import { Checkbox } from "@mui/material"
import { get } from 'lodash-es'

const FCheckbox = ({ formik, name, label }) => {
  return (
    <div>
      <Checkbox
        id={`checkbox`}
        style={{ transform: 'translatey(-1px)' }}
        checked={get(formik.values,  name)}
        onChange={(e, val) => formik.setFieldValue(name, val)}
      />
      <label htmlFor={`checkbox`}>{label}</label>
    </div>
  )
}

export default FCheckbox
