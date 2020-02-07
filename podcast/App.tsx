import React from 'react';
import { Box, UtilityThemeProvider } from 'react-native-design-utility';

import { theme } from './src/constants/theme';

declare var global: {HermesInternal: null | {}};

const App = () => {
  return (
    <UtilityThemeProvider theme={theme}>
      <Box bg="blueDarker" f={1}>

      </Box>
    </UtilityThemeProvider>
  );
};

export default App;
