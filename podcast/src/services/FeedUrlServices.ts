import * as rssParser from 'react-native-rss-parser';

class FeedUrlServices {
  public async getFeed(feedUrl: string) {
    const res = await fetch(feedUrl, { method: 'GET' });
    const resText = await res.text();
    return rssParser.parse(resText);
  }
}

export const feedUrlServices = new FeedUrlServices();
