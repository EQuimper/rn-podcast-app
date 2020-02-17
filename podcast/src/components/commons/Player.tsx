import React from 'react';
import { Box, Text } from 'react-native-design-utility';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { observer } from 'mobx-react';

import { metrics } from '../../constants/metrics';
import { theme } from '../../constants/theme';
import { useRootStore } from '../../contexts/RootStoreContext';
import { Image } from 'react-native';

const Player: React.FC = () => {
  const { playerStore } = useRootStore();

  if (!playerStore.currentTrack) return null;

  return (
    <Box
      h={70}
      w="100%"
      bg="blueLight"
      dir="row"
      align="center"
      justify="between"
      px="sm">
      <Box dir="row" align="center" f={1} mr="sm">
        <Box w={50} h={50} radius={8} bg="white" mr="sm">
          {playerStore.currentTrack?.artwork && (
            <Image
              source={{ uri: playerStore.currentTrack?.artwork }}
              style={{ flex: 1, borderRadius: 8 }}
            />
          )}
        </Box>
        <Box f={1}>
          <Text color="white" weight="bold" numberOfLines={1}>
            {playerStore.currentTrack?.title}
          </Text>
        </Box>
      </Box>
      <Box dir="row" align="center" justify="end">
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
          <TouchableOpacity
            hitSlop={metrics.makeHitSlop(20)}
            onPress={playerStore.seek30}>
            <FeatherIcon color={theme.color.white} name="rotate-cw" size={25} />
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
};

export default observer(Player);
