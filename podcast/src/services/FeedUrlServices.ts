import * as rssParser from 'react-native-rss-parser';

import { IFeedServices } from 'src/stores/PodcastsStore';

export class FeedUrlServices implements IFeedServices {
  public async getFeed(feedUrl: string) {
    const res = await fetch(feedUrl, { method: 'GET' });
    const resText = await res.text();
    return rssParser.parse(resText);
  }
}

export const feedUrlServices = new FeedUrlServices();
