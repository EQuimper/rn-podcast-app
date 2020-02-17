import React from 'react';
import {Box, Text} from 'react-native-design-utility';
import useStatusBar from '../../hooks/useStatusBar';

const DownloadsScreen: React.FC = () => {
  useStatusBar('dark-content');

  return (
    <Box f={1} center>
      <Text>DownloadsScreen</Text>
    </Box>
  );
};

export default DownloadsScreen;
