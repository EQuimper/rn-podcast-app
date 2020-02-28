import PlayerStore from './PlayerStore';
import DownloadManagerStore from './DownloadManagerStore';
import { reaction } from 'mobx';

import PodcastsStore from './PodcastsStore';
import { feedUrlServices } from '../services/FeedUrlServices';
import { itunesApiServices } from '../services/ItunesApiServices';

class RootStore {
  playerStore: PlayerStore;
  podcastsStore: PodcastsStore;
  downloadManagerStore: DownloadManagerStore;

  constructor() {
    this.playerStore = new PlayerStore(this);
    this.downloadManagerStore = new DownloadManagerStore(this);
    this.podcastsStore = new PodcastsStore(
      // this,
      itunesApiServices,
      feedUrlServices,
    );

    reaction(
      () => this.downloadManagerStore.queue.length,
      () => {
        // console.log('queue did update', this.downloadManagerStore.queue);
      },
    );
  }
}

export const rootStore = new RootStore();

export default RootStore;
