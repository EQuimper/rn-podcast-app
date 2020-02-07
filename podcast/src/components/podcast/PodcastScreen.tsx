import React from 'react';
import { Box, Text } from 'react-native-design-utility';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { IPodcast } from '../../types/Podcast';
import { Image } from 'react-native';
import { feedUrlServices } from '../../services/FeedUrlServices';

type PodcastScreenRouteProp = RouteProp<
  { Podcast: { podcast: IPodcast } },
  'Podcast'
>;

const PodcastScreen: React.FC = () => {
  const { params } = useRoute<PodcastScreenRouteProp>();

  React.useEffect(() => {
    feedUrlServices.getFeed(params.podcast.feedUrl)
      .then(result => {

      })
  }, [])

  return (
    <Box f={1} bg="white">
      <Box dir="row" pr="sm">
        <Box h={100} w={100} mr="xs">
          <Image
            source={{ uri: params.podcast.artworkUrl100 }}
            style={{ flex: 1 }}
          />
        </Box>
        <Box f={1}>
          <Text numberOfLines={1}>{params.podcast.trackName}</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default PodcastScreen;
