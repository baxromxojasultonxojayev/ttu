import { Add, Delete } from "@mui/icons-material"
import { useFieldArray } from "react-hook-form"
import RectangleIconButton from "../Buttons/RectangleIconButton"
import HFTextField from "../FormElements/HFTextField"
import styles from "./style.module.scss"

const SelectOptionsCreator = ({ control, name }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  })
  
  return (
    <div>
      <div className={styles.block}>
        {fields.map((field, index) => (
          <div className={styles.row} key={field.id}>
            <HFTextField autoFocus placeholder={`Option ${index + 1}`} disabledHelperText size="small" fullWidth control={control} name={`${name}[${index}]`} className={styles.input} />
            <RectangleIconButton color="error" onClick={() => remove(index)} >
              <Delete color="error" />
            </RectangleIconButton>
          </div>
        ))}
      </div>

      <div className={styles.createButton} onClick={() => append('')} >
        <Add />
        Add Options
      </div>
    </div>
  )
}

export default SelectOptionsCreator
