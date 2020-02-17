import { StatusBar, StatusBarStyle } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';

/**
 * Provide a simple way to change the status bar color
 * when the current screen focus
 */
const useStatusBar = (style: StatusBarStyle, animated = true) => {
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle(style, animated);
    }, []),
  );
};

export default useStatusBar;
