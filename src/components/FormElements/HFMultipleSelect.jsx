import {
  Box,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { useId, useMemo } from "react";
import { Controller } from "react-hook-form";
import { listToMap } from "../../utils/listToMap";
import styles from "./style.module.scss";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const HFMultipleSelect = ({
  control,
  name,
  label,
  width = "100%",
  options = [],
  disabledHelperText,
  placeholder,
  required = false,
  rules = {},
  ...props
}) => {
  const id = useId();

  const optionsMap = useMemo(() => {
    return listToMap(options, "value");
  }, [options]);

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[]}
      rules={{
        required: required ? "This is required field" : false,
        ...rules,
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl style={{ width }}>
          <InputLabel size="small">{label}</InputLabel>
          <Select
            labelId={`multiselect-${id}-label`}
            id={`multiselect-${id}`}
            multiple
            displayEmpty
            value={Array.isArray(value) ? value : []}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            input={
              <OutlinedInput
                error={error}
                size="small"
                id={`multiselect-${id}`}
              />
            }
            renderValue={(selected) => {
              if (!selected?.length) {
                return (
                  <span className={styles.placeholder}>{placeholder}</span>
                );
              }

              return (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected?.map((value) => (
                    <div key={value} className={styles.tag}>
                      {optionsMap[value]?.label ?? value}
                    </div>
                  ))}
                </Box>
              );
            }}
            MenuProps={MenuProps}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>

          {!disabledHelperText && (
            <FormHelperText error>{error?.message}</FormHelperText>
          )}
        </FormControl>
      )}
    ></Controller>
  );
};

export default HFMultipleSelect;
