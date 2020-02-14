import React from 'react';
import { Box, UtilityThemeProvider } from 'react-native-design-utility';

import { theme } from './src/constants/theme';
import MainNavigation from './src/navigations/MainNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  RootStoreContext,
  RootStoreProvider,
} from './src/contexts/RootStoreContext';
import { rootStore } from './src/stores/RootStore';

// declare var global: {HermesInternal: null | {}};

const App = () => {
  return (
    <RootStoreProvider rootStore={rootStore}>
      <UtilityThemeProvider theme={theme}>
        <SafeAreaProvider>
          <MainNavigation />
        </SafeAreaProvider>
      </UtilityThemeProvider>
    </RootStoreProvider>
  );
};

export default App;
