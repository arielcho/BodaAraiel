import gsap from 'gsap';

export const setupScrollVideo = ({ video, trigger, start = 'top bottom', end = 'bottom top' }) => {
  if (!video || !trigger) return null;

  const frameStep = 1 / 30;
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
    if (!Number.isFinite(video.duration) || video.duration <= 0) return;
    const rawTime = Math.min(video.duration - 0.05, video.duration * progress);
    targetTime = Math.round(rawTime / frameStep) * frameStep;
    if (seekFrame === null) seekFrame = requestAnimationFrame(flushSeek);
  };

  video.pause();
  video.currentTime = 0;
  video.preload = 'auto';
  video.muted = true;
  video.playsInline = true;
  video.loop = false;

  const scrollTrigger = gsap.to(video, {
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => updateVideoTime(self.progress),
    },
  }).scrollTrigger;

  const refresh = () => {
    updateVideoTime(scrollTrigger?.progress || 0);
    scrollTrigger?.refresh();
  };

  const continueSeeking = () => {
    if (Math.abs(video.currentTime - targetTime) >= frameStep && seekFrame === null) {
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
