import React from 'react';
import { Box, Text } from 'react-native-design-utility';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import TrackPlayer from 'react-native-track-player';

import { theme } from '../../constants/theme';
import { itunesApiServices } from '../../services/ItunesApiServices';
import { IPodcast } from '../../types/Podcast';
import { useNavigation } from '@react-navigation/native';
import { routes } from '../../navigations/routes';
import Header from '../commons/Header';
import useStatusBar from '../../hooks/useStatusBar';
import TrackPlayerServices from '../../services/TrackPlayerServices';

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
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigate(routes.PODCAST, { podcast })}>
      <Box mr="sm" w={150} h={200}>
        <Box
          w={150}
          h={150}
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
            source={{ uri: podcast.artworkUrl600 }}
          />
        </Box>
        <Box f={1} mt="xs">
          <Text size="sm" weight="bold" numberOfLines={1}>
            {podcast.artistName}
          </Text>
        </Box>
      </Box>
    </TouchableOpacity>
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
  useStatusBar('light-content');

  const [podcasts, setPodcasts] = React.useState<IPodcast[]>([]);

  React.useEffect(() => {
    itunesApiServices.searchPodcast('syntax').then(results => {
      setPodcasts(results);
    });
  }, []);

  React.useEffect(() => {
    // Creates the player
    TrackPlayer.setupPlayer()
      .then(async () => {
        console.log('player is setup');

        // // Adds a track to the queue
        // await TrackPlayer.add({
        //   id: 'trackId',
        //   url: 'https://traffic.libsyn.com/secure/syntax/Syntax222.mp3',
        //   title: 'Track Title',
        //   artist: 'Track Artist',
        //   // artwork: require('track.png')
        // });
        //
        // // Starts playing it
        // TrackPlayer.play();
      })
      .catch(e => console.log('error', e));

    TrackPlayer.registerPlaybackService(() => TrackPlayerServices);
  }, []);

  return (
    <Box f={1} bg="white">
      <Header title="Discover" />
      <Box>
        <Box px="sm" my="md">
          <Text weight="bold">Hot Trend</Text>
        </Box>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginLeft: theme.space.sm }}>
          {podcasts.map(podcast => (
            <PodcastCard podcast={podcast} key={podcast.trackId} />
          ))}
        </ScrollView>
      </Box>
    </Box>
  );
};

export default HomeScreen;
