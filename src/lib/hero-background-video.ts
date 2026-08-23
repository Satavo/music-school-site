let heroBackgroundVideo: HTMLVideoElement | null = null;

export function setHeroBackgroundVideo(video: HTMLVideoElement | null) {
  heroBackgroundVideo = video;
}

export function pauseHeroBackgroundVideo() {
  heroBackgroundVideo?.pause();
}

export function resumeHeroBackgroundVideo() {
  if (!heroBackgroundVideo) return;

  void heroBackgroundVideo.play().catch(() => {});
}
