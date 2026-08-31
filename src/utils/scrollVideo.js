import gsap from 'gsap';

export const setupScrollVideo = ({ video, trigger, start = 'top bottom', end = 'bottom top' }) => {
  if (!video || !trigger) return null;

  const updateVideoTime = (progress) => {
    if (!Number.isFinite(video.duration) || video.duration <= 0) return;
    video.currentTime = Math.min(video.duration - 0.05, video.duration * progress);
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

  video.addEventListener('loadedmetadata', refresh);

  return () => {
    video.removeEventListener('loadedmetadata', refresh);
    scrollTrigger?.kill();
  };
};
