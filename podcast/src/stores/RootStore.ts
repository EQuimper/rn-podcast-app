import PlayerStore from './PlayerStore';

class RootStore {
  playerStore: PlayerStore;

  constructor() {
    this.playerStore = new PlayerStore(this);
  }
}

export const rootStore = new RootStore();

export default RootStore;
