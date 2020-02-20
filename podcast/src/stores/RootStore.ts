import PlayerStore from './PlayerStore';
import DownloadManagerStore from './DownloadManagerStore';
import { autorun, reaction } from 'mobx';

class RootStore {
  playerStore: PlayerStore;
  downloadManagerStore: DownloadManagerStore;

  constructor() {
    this.playerStore = new PlayerStore(this);
    this.downloadManagerStore = new DownloadManagerStore(this);

    reaction(
      () => this.downloadManagerStore.queue.length,
      () => {
        console.log('queue did update', this.downloadManagerStore.queue);
      },
    );
  }
}

export const rootStore = new RootStore();

export default RootStore;
