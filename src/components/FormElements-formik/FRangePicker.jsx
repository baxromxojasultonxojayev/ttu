import { DateRangePicker } from "@mui/lab"
import { TextField } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react"
import { get } from 'lodash-es'

const FRangePicker = ({formik, name, label, width, inputProps, ...props}) => {

  return (
    <DateRangePicker
      startText="Check-in"
      endText="Check-out"
      value={get(formik.values, name) ?? [null, null]}
      name={name}
      onChange={value => formik.setFieldValue(name, value)}
      {...props}
      renderInput={(startProps, endProps) => (
        <>
          <TextField fullWidth size="small" {...startProps} label={null} InputLabelProps={{shrink: false}} />
            <Box sx={{ mx: 2 }}> - </Box>
          <TextField fullWidth size="small" {...endProps} label={null} InputLabelProps={{shrink: false}} />
        </>
      )}
    />
  )
}

export default FRangePicker
