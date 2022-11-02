import PropTypes from 'prop-types';
import { useMemo } from 'react';
// material
// import { CssBaseline } from '@material-ui/core';
// import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// import StyledEngineProvider from '@material-ui/core/StyledEngineProvider';
// hooks
// import useSettings from '../hooks/useSettings';
//
import shape from './shape';
import palette from './palette';
import typography from './typography';
import breakpoints from './breakpoints';
import GlobalStyles from './globalStyles';
import componentsOverride from './overrides';
import shadows, { customShadows } from './shadows';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import { ruRU } from '@mui/material/locale'

ThemeConfig.propTypes = {
  children: PropTypes.node
};

export default function ThemeConfig({ children }) {
  const isLight = true

  const themeOptions = useMemo(
    () => (
      {
        palette: isLight
          ? { ...palette.light, mode: 'light' }
          : { ...palette.dark, mode: 'dark' },
        shape,
        typography,
        breakpoints,
        direction: 'left',
        shadows: isLight ? shadows.light : shadows.dark,
        customShadows: isLight ? customShadows.light : customShadows.dark
      }
    ),
    [isLight]
  );

  const theme = createTheme(themeOptions, ruRU);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
