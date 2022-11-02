import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";

const SearchInput = ({ value, onChange, ...props }) => {
  console.log(value);
  return (
    <TextField
      value={value}
      size="small"
      placeholder="Поиск..."
      onChange={(e) => onChange(e.target.value)}
      {...props}
      InputProps={{
        startAdornment: (
          <InputAdornment style={{ marginRight: 10 }}>
            <Search />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchInput;
