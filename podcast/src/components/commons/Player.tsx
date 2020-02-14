import React from 'react';
import { Box, Text } from 'react-native-design-utility';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { observer } from 'mobx-react';

import { metrics } from '../../constants/metrics';
import { theme } from '../../constants/theme';
import { useRootStore } from '../../contexts/RootStoreContext';

const Player: React.FC = () => {
  const { playerStore } = useRootStore();

  return (
    <Box
      h={70}
      w="100%"
      bg="blueLight"
      dir="row"
      align="center"
      justify="between"
      px="sm">
      <Box dir="row" align="center">
        <Box w={50} h={50} radius={8} bg="white" mr="sm" />
        <Text color="white" weight="bold">
          Learn React-Native...
        </Text>
      </Box>
      <Box dir="row" f={1} align="center" justify="end">
        <Box mr="sm">
          {playerStore.isPlaying ? (
            <TouchableOpacity
              hitSlop={metrics.makeHitSlop(20)}
              onPress={playerStore.pause}>
              <FeatherIcon color={theme.color.white} name="pause" size={25} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              hitSlop={metrics.makeHitSlop(20)}
              onPress={playerStore.play}>
              <FeatherIcon color={theme.color.white} name="play" size={25} />
            </TouchableOpacity>
          )}
        </Box>
        <Box>
          <TouchableOpacity hitSlop={metrics.makeHitSlop(20)}>
            <FeatherIcon color={theme.color.white} name="rotate-cw" size={25} />
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
};

export default observer(Player);
