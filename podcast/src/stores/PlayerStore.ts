import { action, computed, observable, runInAction } from 'mobx';
import TrackPlayer, {
  State as TrackPlayerState,
  STATE_PAUSED,
  STATE_PLAYING,
} from 'react-native-track-player';

import RootStore from './RootStore';

interface ITrack {
  id: string;
  title: string;
  artist: string;
  duration: string;
  url: string;
  artwork?: string;
}

class PlayerStore {
  rootStore: RootStore;

  @observable
  private _playerState: TrackPlayerState | null = null;

  @observable
  public currentTrack: ITrack | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    TrackPlayer.addEventListener(
      'playback-state',
      ({ state }: { state: TrackPlayerState }) => {
        runInAction(() => {
          this._playerState = state;
        });
      },
    );
  }

  @computed
  public get isPlaying() {
    return this._playerState === STATE_PLAYING;
  }

  @computed
  public get isPaused() {
    return this._playerState === STATE_PAUSED;
  }

  @action
  public start = async (track: ITrack) => {
    this.currentTrack = track;
    await TrackPlayer.reset();
    await TrackPlayer.add({
      artist: track.artist,
      title: track.title,
      id: track.id,
      artwork: track.artwork,
      url: track.url,
    });

    this.play();
  };

  public play = async () => {
    await TrackPlayer.play();
  };

  public pause = async () => {
    await TrackPlayer.pause();
  };

  /**
   * Take an incrementer and seek to the current position + this incrementer
   */
  private seekInc = async (inc: number) => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position + inc);
  };

  public seek30 = async () => {
    console.log('this', this);
    await this.seekInc(30);
  };
}

export default PlayerStore;
