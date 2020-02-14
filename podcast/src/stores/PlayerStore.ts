import { action, observable } from 'mobx';
import RootStore from './RootStore';

class PlayerStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable
  public isPlaying = false;

  @action
  public play() {}
}

export default PlayerStore;
