import { Feed } from 'react-native-rss-parser';
import { observable, runInAction } from 'mobx';

import { IPodcast } from '../types/Podcast';

export interface IFeedServices {
  getFeed(feedUrl: string): Promise<Feed>;
}

export interface ISearchPodcastServices {
  searchPodcast(term: string): Promise<IPodcast[]>;
}

class PodcastsStore {
  // private rootStore: RootStore;

  private feedServices: IFeedServices;
  private searchServices: ISearchPodcastServices;

  @observable
  public podcasts: Map<number, IPodcast> = new Map();

  @observable
  public feeds: Map<number, Feed> = new Map();

  @observable
  public searchs: Map<string, number[]> = new Map();

  constructor(
    // rootStore: RootStore,
    searchServices: ISearchPodcastServices,
    feedServices: IFeedServices,
  ) {
    // this.rootStore = rootStore;
    this.searchServices = searchServices;
    this.feedServices = feedServices;
  }

  public async searchPodcast(term: string): Promise<IPodcast[]> {
    if (this.searchs.has(term)) {
      const podcasts: IPodcast[] = [];
      const podcastIds = this.searchs.get(term)!;

      for (let i = 0; i < podcastIds.length; i++) {
        podcasts.push(this.podcasts.get(podcastIds[i])!);
      }

      return podcasts;
    }

    const podcasts = await this.searchServices.searchPodcast(term);

    for (let i = 0; i < podcasts.length; i++) {
      const podcast = podcasts[i];

      runInAction(() => {
        this.podcasts.set(podcast.trackId, podcast);
      });
    }

    runInAction(() => {
      this.searchs.set(
        term,
        podcasts.map(p => p.trackId),
      );
    });

    return podcasts;
  }

  public async fetchFeed(podcast: IPodcast): Promise<Feed> {
    if (this.feeds.has(podcast.trackId)) {
      return this.feeds.get(podcast.trackId)!;
    }

    const feed = await this.feedServices.getFeed(podcast.feedUrl);

    runInAction(() => {
      this.feeds.set(podcast.trackId, feed);
    });

    return feed;
  }
}

export default PodcastsStore;
