import { action, computed, observable, runInAction } from 'mobx';
import RootStore from './RootStore';
import TrackPlayer, {
  State as TrackPlayerState,
  STATE_PAUSED,
  STATE_PLAYING,
} from 'react-native-track-player';

class PlayerStore {
  rootStore: RootStore;

  @observable
  private _playerState: TrackPlayerState | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    TrackPlayer.addEventListener(
      'playback-state',
      ({ state }: { state: TrackPlayerState }) => {
        runInAction(() => {
          console.log('playerState', state);
          this._playerState = state;
        });
      },
    );
  }

  @action
  public async play() {
    await TrackPlayer.play();
  }

  @action
  public async pause() {
    await TrackPlayer.pause();
  }

  @computed
  public get isPlaying() {
    return this._playerState === STATE_PLAYING;
  }

  @computed
  public get isPaused() {
    return this._playerState === STATE_PAUSED;
  }
}

export default PlayerStore;
