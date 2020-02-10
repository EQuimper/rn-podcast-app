import React from 'react';
import { Box, Text } from 'react-native-design-utility';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { ActivityIndicator, Image, ScrollView } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Feed } from 'react-native-rss-parser';

import { IPodcast } from '../../types/Podcast';
import { feedUrlServices } from '../../services/FeedUrlServices';
import { theme } from '../../constants/theme';
import useStatusBar from '../hooks/useStatusBar';

type PodcastScreenRouteProp = RouteProp<
  { Podcast: { podcast: IPodcast } },
  'Podcast'
>;

const PodcastScreen: React.FC = () => {
  useStatusBar('dark-content');
  const { params } = useRoute<PodcastScreenRouteProp>();
  const [feed, setFeed] = React.useState<Feed | null>(null);

  React.useEffect(() => {
    feedUrlServices.getFeed(params.podcast.feedUrl).then(result => {
      setFeed(result);
    });
  }, []);

  if (!feed) {
    return (
      <Box f={1} bg="white" center>
        <ActivityIndicator color={theme.color.blueDarker} size="large" />
      </Box>
    );
  }

  return (
    <Box f={1} bg="white">
      <Box>
        <ScrollView>
          <Box dir="row" pr="sm" mb="sm">
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
          <Box px="sm">
            <Text>{feed?.description}</Text>
          </Box>
          {feed?.items.map((item, i) => (
            <Box key={item.id}>
              {console.log('item', item.published)}
              <Box px="sm" py="sm" dir="row" align="center" justify="between">
                <Box f={1}>
                  <Text numberOfLines={1} weight="bold" size="sm">
                    {item.title}
                  </Text>
                  <Box dir="row">
                    <Text color="greyLight" size="xs" weight="bold" mr="sm">
                      {formatDistanceToNow(new Date(item.published), {
                        addSuffix: true,
                      })}
                    </Text>
                    <Text color="greyLight" size="xs">
                      {item.itunes.duration}
                    </Text>
                  </Box>
                </Box>
                <Box w={50} align="end">
                  <FeatherIcon
                    name="download-cloud"
                    size={20}
                    color={theme.color.blueLight}
                  />
                </Box>
              </Box>
              <Box h={1} w="100%" bg="greyLightest" />
            </Box>
          ))}
        </ScrollView>
      </Box>
    </Box>
  );
};

export default PodcastScreen;
