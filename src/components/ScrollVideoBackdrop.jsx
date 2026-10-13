import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { assetUrl } from '../utils/assetUrl';
import { setupScrollVideo } from '../utils/scrollVideo';

const ScrollVideoBackdrop = ({ source, triggerRef, label }) => {
  const layerRef = useRef(null);
  const videoRef = useRef(null);
  const progressLogRef = useRef(-1);
  const sourceUrl = assetUrl(source);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const prefix = `[Boda video: ${source}]`;
    const diagnostics = window.__BODA_VIDEO_DIAGNOSTICS__ ||= {};
    const snapshot = (event) => ({
      event,
      url: video.currentSrc || sourceUrl,
      duration: Number.isFinite(video.duration) ? video.duration : null,
      currentTime: video.currentTime,
      readyState: video.readyState,
      networkState: video.networkState,
      errorCode: video.error?.code || null,
      errorMessage: video.error?.message || null,
    });

    const report = (event) => {
      const data = snapshot(event);
      diagnostics[source] = { ...diagnostics[source], ...data };
      console.info(prefix, data);
    };
    const reportWarning = (event) => console.warn(prefix, snapshot(event));
    const reportError = () => console.error(prefix, 'No se pudo cargar o decodificar el MP4.', snapshot('error'));

    const listeners = {
      loadstart: () => report('loadstart'),
      loadedmetadata: () => report('loadedmetadata'),
      canplay: () => report('canplay'),
      stalled: () => reportWarning('stalled'),
      waiting: () => reportWarning('waiting'),
      error: reportError,
    };

    Object.entries(listeners).forEach(([event, handler]) => video.addEventListener(event, handler));

    fetch(sourceUrl, { method: 'HEAD', cache: 'no-store' })
      .then((response) => {
        const server = {
          status: response.status,
          ok: response.ok,
          contentType: response.headers.get('content-type'),
          contentLength: response.headers.get('content-length'),
          acceptRanges: response.headers.get('accept-ranges'),
        };
        diagnostics[source] = { ...diagnostics[source], server };
        if (response.ok && server.contentType?.includes('video/mp4')) {
          console.info(prefix, 'Respuesta del servidor:', server);
        } else {
          console.error(prefix, 'Respuesta del servidor invalida:', server);
        }
      })
      .catch((error) => console.error(prefix, 'Fallo al consultar el archivo:', error));

    console.info(prefix, 'Inicializando:', sourceUrl);

    return () => {
      Object.entries(listeners).forEach(([event, handler]) => video.removeEventListener(event, handler));
    };
  }, [source, sourceUrl]);

  useEffect(() => {
    const layer = layerRef.current;
    const video = videoRef.current;
    const trigger = triggerRef.current || layer?.parentElement;
    const prefix = `[Boda video: ${source}]`;

    if (!trigger || !layer || !video) {
      console.error(prefix, 'No se pudo iniciar el control por scroll.', {
        trigger: Boolean(trigger),
        layer: Boolean(layer),
        video: Boolean(video),
      });
      return undefined;
    }

    console.info(prefix, 'Control por scroll activo.', {
      trigger: trigger.id || trigger.className,
      start: 'top bottom',
      end: 'bottom top',
    });

    const cleanupVideo = setupScrollVideo({
      video,
      trigger,
      start: 'top bottom',
      end: 'bottom top',
      frameRate: 24,
      onProgress: ({ progress, requestedTime, currentTime }) => {
        const bucket = Math.min(4, Math.floor(progress * 4));
        const diagnostics = window.__BODA_VIDEO_DIAGNOSTICS__ ||= {};
        diagnostics[source] = {
          ...diagnostics[source],
          scrollProgress: progress,
          requestedTime,
          currentTime,
        };

        if (bucket !== progressLogRef.current) {
          progressLogRef.current = bucket;
          console.info(`[Boda video: ${source}] Scroll`, {
            progress: `${Math.round(progress * 100)}%`,
            requestedTime,
            currentTime,
          });
        }
      },
    });

    gsap.set(layer, { opacity: 0, filter: 'blur(2px)' });

    const fadeTimeline = gsap.timeline({
      scrollTrigger: {
        trigger,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });

    fadeTimeline
      .to(layer, { opacity: 1, filter: 'blur(0px)', duration: 0.12, ease: 'power2.out' })
      .to(layer, { opacity: 1, duration: 0.76, ease: 'none' })
      .to(layer, { opacity: 0, filter: 'blur(2px)', duration: 0.12, ease: 'power2.in' });

    const movement = gsap.fromTo(video,
      { scale: 0.97, yPercent: 1 },
      {
        scale: 1,
        yPercent: -1,
        ease: 'none',
        scrollTrigger: {
          trigger,
          start: 'top bottom',
          end: 'bottom top',
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
  }, [source, triggerRef]);

  return (
    <div ref={layerRef} className="scroll-video-backdrop" aria-hidden="true">
      <div className="scroll-video-backdrop-sticky">
        <div className="scroll-video-backdrop-frame">
          <video
            ref={videoRef}
            className="scroll-video-backdrop-media scroll-scrub-video"
            aria-label={label}
            muted
            playsInline
            preload="auto"
          >
            <source src={sourceUrl} type="video/mp4" />
          </video>
          <div className="scroll-video-backdrop-veil" />
        </div>
      </div>
    </div>
  );
};

export default ScrollVideoBackdrop;
