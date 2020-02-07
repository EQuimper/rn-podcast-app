import React from 'react';
import { Box, Text } from 'react-native-design-utility';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { theme } from '../../constants/theme';
import { itunesApiServices } from '../../services/ItunesApiServices';
import { IPodcast } from '../../types/Podcast';
import { useNavigation } from '@react-navigation/native';
import { routes } from '../../navigations/routes';

const Divider = () => <Box h={1} w="100%" bg="greyLightest" />;

const PodcastTile: React.FC<{ podcast: IPodcast }> = ({ podcast }) => {
  const { navigate } = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigate(routes.PODCAST, { podcast })}>
      <Box dir="row" align="center">
        <Box w={100} h={100} radius="xs" mr="xs">
          <Image
            style={{
              flex: 1,
            }}
            source={{ uri: podcast.artworkUrl100 }}
          />
        </Box>

        <Box f={1}>
          <Text size="sm" weight="bold" numberOfLines={1}>
            {podcast.trackName}
          </Text>
        </Box>
      </Box>
      <Divider />
    </TouchableOpacity>
  );
};

const PodcastCard: React.FC<{ podcast: IPodcast }> = ({ podcast }) => {
  return (
    <Box mr="sm" h={102}>
      <Box
        w={100}
        h={100}
        radius="xs"
        style={{
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.2,
          shadowColor: 'black',
          shadowRadius: 2,
        }}>
        <Image
          style={{
            flex: 1,
            borderRadius: theme.radius.xs,
          }}
          source={{ uri: podcast.artworkUrl100 }}
        />
      </Box>
    </Box>
  );
};

const Category: React.FC<{ color: string; icon: string }> = ({
  color,
  icon,
}) => {
  const bg = `${color}50`;

  return (
    <Box center w={75} mr="sm">
      <Box circle={75} bg={bg} center mb="2xs">
        <FeatherIcon name={icon} size={25} color={color} />
      </Box>
      <Box>
        <Text size="xs">Education</Text>
      </Box>
    </Box>
  );
};

const HomeScreen: React.FC = () => {
  const [podcasts, setPodcasts] = React.useState<IPodcast[]>([]);

  React.useEffect(() => {
    itunesApiServices.searchPodcast('syntax').then(results => {
      setPodcasts(results);
    });
  }, []);

  return (
    <Box f={1} bg="white">
      <Box>
        <ScrollView>
          {podcasts.map(podcast => (
            <PodcastTile podcast={podcast} key={podcast.trackId} />
          ))}
        </ScrollView>
      </Box>
    </Box>
  );
};

export default HomeScreen;
