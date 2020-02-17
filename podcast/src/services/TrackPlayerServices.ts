import TrackPlayer from 'react-native-track-player';

const TrackPlayerServices = async function() {
  TrackPlayer.addEventListener('remote-play', () => {
    console.log('play');
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());

  TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.destroy());
};

export default TrackPlayerServices;
