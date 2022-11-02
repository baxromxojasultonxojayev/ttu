import { get } from 'lodash-es'
import ImageUpload from "../Upload/ImageUpload"

const FImageUpload = ({ formik, name, ...props }) => {


  return (
    <ImageUpload
      name={name}
      value={get(formik?.values, name)}
      onChange={val => formik.setFieldValue(name, val)}
      // error={get(formik.touched, name) && Boolean(get(formik.errors, name))}
      {...props}
    />
  )
}

export default FImageUpload
