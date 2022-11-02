import { get } from "lodash-es"
import CAutoComplete from "../CAutoComplete"

const FAutoComplete = ({ requestService, formik, name, ...props }) => {
  
  return (
    <CAutoComplete
      value={get(formik.values, name)}
      requestService={requestService}
      onChange={(_, val) => formik.setFieldValue(name, val)}
      {...props}
    />
  )
}

export default FAutoComplete
