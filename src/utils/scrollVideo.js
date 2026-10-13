import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const setupScrollVideo = ({
  video,
  trigger,
  start = 'top bottom',
  end = 'bottom top',
  frameRate = 24,
  onProgress,
}) => {
  if (!video || !trigger) return null;

  const frameStep = 1 / frameRate;
  let targetTime = 0;
  let seekFrame = null;

  const flushSeek = () => {
    seekFrame = null;
    if (video.readyState < 1 || video.seeking) return;

    const difference = Math.abs(video.currentTime - targetTime);
    if (difference < frameStep) return;
    video.currentTime = targetTime;
  };

  const updateVideoTime = (progress) => {
    if (!Number.isFinite(video.duration) || video.duration <= 0) return null;
    const rawTime = Math.min(video.duration - frameStep, video.duration * progress);
    targetTime = Math.round(rawTime / frameStep) * frameStep;
    if (seekFrame === null) seekFrame = requestAnimationFrame(flushSeek);
    return targetTime;
  };

  video.pause();
  video.currentTime = 0;
  video.preload = 'auto';
  video.muted = true;
  video.playsInline = true;
  video.loop = false;

  const syncToScroll = (self) => {
    const requestedTime = updateVideoTime(self.progress);
    onProgress?.({
      progress: self.progress,
      requestedTime,
      currentTime: video.currentTime,
    });
  };

  const scrollTrigger = ScrollTrigger.create({
    trigger,
    start,
    end,
    invalidateOnRefresh: true,
    onUpdate: syncToScroll,
    onRefresh: syncToScroll,
  });

  const refresh = () => {
    updateVideoTime(scrollTrigger?.progress || 0);
    scrollTrigger?.refresh();
  };

  const continueSeeking = () => {
    if (Math.abs(video.currentTime - targetTime) >= frameStep * 0.5 && seekFrame === null) {
      seekFrame = requestAnimationFrame(flushSeek);
    }
  };

  video.addEventListener('loadedmetadata', refresh);
  video.addEventListener('seeked', continueSeeking);

  return () => {
    video.removeEventListener('loadedmetadata', refresh);
    video.removeEventListener('seeked', continueSeeking);
    if (seekFrame !== null) cancelAnimationFrame(seekFrame);
    scrollTrigger?.kill();
  };
};
