import { markVideoLoaded } from '../components/VideoBackground';

const OTHER_PAGE_VIDEOS = [
  '/images/ocean.mp4',
  '/images/retreat.mp4',
  '/images/faq.mp4',
  '/images/wavez.mp4',
];

let started = false;

export function preloadOtherPageVideos(): void {
  if (started) return;
  started = true;

  OTHER_PAGE_VIDEOS.forEach((src) => {
    const video = document.createElement('video');
    video.preload = 'auto';
    video.muted = true;
    video.playsInline = true;
    video.src = src;

    video.addEventListener(
      'canplaythrough',
      () => markVideoLoaded(src),
      { once: true }
    );

    video.load();
  });
}

export const RENASCO_HOME_VIDEO_READY = 'renasco-home-video-ready';
