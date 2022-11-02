// import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';


// ----------------------------------------------------------------------

export default function Select() {
  return {
    MuiSelect: {
      defaultProps: {
        IconComponent: ExpandMoreRoundedIcon
      },

      styleOverrides: {
        root: {}
      }
    }
  };
}
