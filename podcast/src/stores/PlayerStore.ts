import { action, computed, observable, runInAction } from 'mobx';
import RootStore from './RootStore';
import TrackPlayer, {
  State as TrackPlayerState,
  STATE_PAUSED,
  STATE_PLAYING,
} from 'react-native-track-player';

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
          console.log('playerState', state);
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
  public async start(track: ITrack) {
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
  }

  @action
  public async play() {
    await TrackPlayer.play();
  }

  @action
  public async pause() {
    await TrackPlayer.pause();
  }

  @action
  public async seek30() {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position + 30);
  }
}

export default PlayerStore;
