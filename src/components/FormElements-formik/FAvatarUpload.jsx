import { get } from "lodash-es"
import AvatarUpload from "../AvatarUpload"

const FAvatarUpload = ({
  formik,
  name,
  ...props
}) => {

  return (
    <AvatarUpload
      size="small"
      value={get(formik.values, name)}
      name={name}
      onChange={(val) => formik.setFieldValue(name, val)}
      error={get(formik.touched, name) && Boolean(get(formik.errors, name))}
      {...props}
    />
  )
}

export default FAvatarUpload
