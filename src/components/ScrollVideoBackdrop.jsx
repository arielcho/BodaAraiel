import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { assetUrl } from '../utils/assetUrl';
import { setupScrollVideo } from '../utils/scrollVideo';

const ScrollVideoBackdrop = ({ source, triggerRef, label }) => {
  const layerRef = useRef(null);
  const videoRef = useRef(null);

  useGSAP(() => {
    const trigger = triggerRef.current;
    const layer = layerRef.current;
    const video = videoRef.current;
    if (!trigger || !layer || !video) return undefined;

    const cleanupVideo = setupScrollVideo({
      video,
      trigger,
      start: 'top top',
      end: 'bottom bottom',
      frameRate: 24,
    });

    const fadeTimeline = gsap.timeline({
      scrollTrigger: {
        trigger,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });

    fadeTimeline
      .fromTo(layer, { opacity: 0, filter: 'blur(3px)' }, { opacity: 1, filter: 'blur(0px)', duration: 0.08, ease: 'power2.out' })
      .to(layer, { opacity: 1, duration: 0.84, ease: 'none' })
      .to(layer, { opacity: 0, filter: 'blur(3px)', duration: 0.08, ease: 'power2.in' });

    const movement = gsap.fromTo(video,
      { scale: 0.97, yPercent: 1 },
      {
        scale: 1,
        yPercent: -1,
        ease: 'none',
        scrollTrigger: {
          trigger,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

    return () => {
      cleanupVideo?.();
      fadeTimeline.scrollTrigger?.kill();
      fadeTimeline.kill();
      movement.scrollTrigger?.kill();
      movement.kill();
    };
  }, { scope: triggerRef });

  return (
    <div ref={layerRef} className="scroll-video-backdrop" aria-hidden="true">
      <div className="scroll-video-backdrop-sticky">
        <div className="scroll-video-backdrop-frame">
          <video
            ref={videoRef}
            src={assetUrl(source)}
            className="scroll-video-backdrop-media scroll-scrub-video"
            aria-label={label}
            muted
            playsInline
            preload="auto"
          />
          <div className="scroll-video-backdrop-veil" />
        </div>
      </div>
    </div>
  );
};

export default ScrollVideoBackdrop;
