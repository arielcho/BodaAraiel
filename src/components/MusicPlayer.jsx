import { useCallback, useEffect, useRef, useState } from 'react';

const tracks = [
  { title: 'Donde nadie pueda ir', src: 'musica/donde nadie pueda ir.mp3' },
  { title: 'Serenata', src: 'musica/serenata.mp3' },
];

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const shouldContinueRef = useRef(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    shouldContinueRef.current = true;
    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = 0.45;
  }, []);

  useEffect(() => {
    const startMusic = () => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.currentTime = 0;
      play();
    };
    window.addEventListener('wedding:open', startMusic);
    return () => window.removeEventListener('wedding:open', startMusic);
  }, [play]);

  useEffect(() => {
    if (!shouldContinueRef.current) return;
    audioRef.current?.load();
    play();
  }, [trackIndex, play]);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      play();
    } else {
      shouldContinueRef.current = false;
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleEnded = () => {
    shouldContinueRef.current = true;
    setTrackIndex((current) => (current + 1) % tracks.length);
  };

  const track = tracks[trackIndex];
  const source = `${import.meta.env.BASE_URL}${track.src.split('/').map(encodeURIComponent).join('/')}`;

  return (
    <div className="music-control">
      <audio ref={audioRef} src={source} preload="auto" onEnded={handleEnded} />
      <span className="music-control-label" aria-hidden="true">{track.title}</span>
      <button
        type="button"
        className={`music-bubble${isPlaying ? ' is-playing' : ''}`}
        onClick={togglePlayback}
        aria-label={isPlaying ? 'Pausar musica' : 'Reproducir musica'}
        title={`${isPlaying ? 'Pausar' : 'Reproducir'}: ${track.title}`}
      >
        {isPlaying ? (
          <span className="music-pause" aria-hidden="true"><i /><i /></span>
        ) : (
          <span className="music-play" aria-hidden="true" />
        )}
        <span className="music-wave" aria-hidden="true"><i /><i /><i /></span>
      </button>
    </div>
  );
};

export default MusicPlayer;
