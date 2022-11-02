import { FormHelperText } from "@mui/material";
import { Controller } from "react-hook-form";
import ImageUpload from "../Upload/ImageUpload";

const HFImageUpload = ({
  control,
  name,
  required,
  rules,
  disabledHelperText = false,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      rules={{
        required: required ? "This is required field" : false,
        ...rules,
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <ImageUpload
            name={name}
            value={value}
            onChange={onChange}
            // error={get(formik.touched, name) && Boolean(get(formik.errors, name))}
            {...props}
          />
          {!disabledHelperText && (
            <FormHelperText error>{error?.message ?? " "}</FormHelperText>
          )}
        </>
      )}
    ></Controller>
  );
};

export default HFImageUpload;
