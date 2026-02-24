const OTHER_PAGE_VIDEOS = [
  '/images/ocean.mp4',
  '/images/retreat.mp4',
  '/images/faq.mp4',
  '/images/wavez.mp4',
];

const preloadedRefs: HTMLVideoElement[] = [];

export function preloadOtherPageVideos(): void {
  if (preloadedRefs.length > 0) return;
  OTHER_PAGE_VIDEOS.forEach((src) => {
    const video = document.createElement('video');
    video.preload = 'auto';
    video.muted = true;
    video.playsInline = true;
    video.src = src;
    video.load();
    preloadedRefs.push(video);
  });
}

export const RENASCO_HOME_VIDEO_READY = 'renasco-home-video-ready';
