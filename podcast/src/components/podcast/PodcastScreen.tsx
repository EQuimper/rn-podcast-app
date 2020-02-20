import React from 'react';
import { Box, Text } from 'react-native-design-utility';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useRoute, RouteProp } from '@react-navigation/native';
import { ActivityIndicator, Image, ScrollView } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Feed, FeedItem } from 'react-native-rss-parser';
import { observer } from 'mobx-react';
import RNFetchBlob from 'rn-fetch-blob';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { IPodcast } from '../../types/Podcast';
import { feedUrlServices } from '../../services/FeedUrlServices';
import { theme } from '../../constants/theme';
import useStatusBar from '../../hooks/useStatusBar';
import { useRootStore } from '../../contexts/RootStoreContext';
import PlayerStore from '../../stores/PlayerStore';
import { DownloadElement } from '../../stores/DownloadManagerStore';

const PodcastCell: React.FC<{
  item: FeedItem;
  playerStore: PlayerStore;
  artistName: string;
  downloadElement?: DownloadElement;
  onDownloadPress: (feedItem: FeedItem) => void;
}> = observer(
  ({ item, playerStore, artistName, onDownloadPress, downloadElement }) => {
    console.log('downloadElement', downloadElement);
    return (
      <Box>
        <Box px="sm" py="sm" dir="row" align="center" justify="between">
          <Box f={1}>
            <TouchableOpacity
              onPress={async () => {
                await playerStore.start({
                  id: item.id,
                  url: item.links[0].url,
                  title: item.title,
                  artist: artistName,
                  artwork: item.itunes.image,
                  duration: item.itunes.duration,
                });
              }}>
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
            </TouchableOpacity>
          </Box>
          <Box w={50} align="end">
            {downloadElement ? (
              <TouchableOpacity onPress={() => onDownloadPress(item)}>
                <Box
                  circle={30}
                  center
                  style={{
                    borderColor: theme.color.blueLight,
                    borderWidth: 1,
                  }}>
                  <FeatherIcon
                    name="pause"
                    size={12}
                    color={theme.color.blueLight}
                  />
                </Box>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => onDownloadPress(item)}>
                <FeatherIcon
                  name="download-cloud"
                  size={20}
                  color={theme.color.blueLight}
                />
              </TouchableOpacity>
            )}
          </Box>
        </Box>
        <Box h={1} w="100%" bg="greyLightest" />
      </Box>
    );
  },
);

type PodcastScreenRouteProp = RouteProp<
  { Podcast: { podcast: IPodcast } },
  'Podcast'
>;

const PodcastScreen: React.FC = () => {
  useStatusBar('dark-content');
  const { playerStore, downloadManagerStore } = useRootStore();
  const { params } = useRoute<PodcastScreenRouteProp>();
  const [feed, setFeed] = React.useState<Feed | null>(null);

  React.useEffect(() => {
    feedUrlServices.getFeed(params.podcast.feedUrl).then(result => {
      setFeed(result);
    });
  }, []);

  const onDownloadPress = (feedItem: FeedItem) => {
    downloadManagerStore.addToQueue(feedItem.id, feedItem.links[0].url);
  };

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
          <Box dir="row" p="sm" mb="sm">
            <Box h={100} w={100} mr="sm">
              <Image
                source={{ uri: params.podcast.artworkUrl100 }}
                style={{ flex: 1 }}
              />
            </Box>
            <Box f={1}>
              <Text size="sm" color="greyDark">
                {feed?.description}
              </Text>
            </Box>
          </Box>
          {feed?.items.map((item, i) => (
            <PodcastCell
              downloadElement={downloadManagerStore.getDownloadElementById(
                item.id,
              )}
              onDownloadPress={onDownloadPress}
              key={item.id}
              item={item}
              playerStore={playerStore}
              artistName={params.podcast.artistName}
            />
          ))}
        </ScrollView>
      </Box>
    </Box>
  );
};

export default observer(PodcastScreen);
