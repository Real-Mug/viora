"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { withBasePath } from "@/lib/config/env";

/**
 * Background video for the home hero.
 *
 * The photograph is the poster and stays the LCP element. This component
 * deliberately renders nothing on the server and nothing on first paint: the
 * video is only mounted once the page has loaded and the browser is idle, so
 * it never competes with the hero image for bandwidth during the load that
 * Core Web Vitals measures.
 *
 * It declines to load at all when:
 *   - the visitor prefers reduced motion. The still photograph is the reduced
 *     -motion experience; a paused video that they must start is not.
 *   - the connection reports Save-Data, or 2g/3g. A background decoration is
 *     not worth several megabytes of someone's cellular allowance.
 *   - the file is missing or fails to decode, in which case `onError` retires
 *     the element and the poster underneath is simply left visible.
 *
 * That last case is why the site is correct before any footage exists: with no
 * files at public/video, this renders the photograph and nothing else.
 */

type Props = {
  /** Paths under /public, without the deployment sub-path. */
  mp4: string;
  webm: string;
  /** Shown until the video has painted its first frame. */
  poster: string;
};

function prefersReducedMotion(): boolean {
  return (
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Save-Data, or a connection too slow to spend megabytes on decoration. */
function connectionIsExpensive(): boolean {
  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  if (!connection) return false;
  if (connection.saveData) return true;
  return connection.effectiveType === "slow-2g" || connection.effectiveType === "2g";
}

/** Runs `fn` once the page has loaded and the browser has a spare moment. */
function whenIdle(fn: () => void): () => void {
  let idleHandle: number | undefined;
  let timeoutHandle: ReturnType<typeof setTimeout> | undefined;

  const schedule = () => {
    const idle = (
      window as Window & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      }
    ).requestIdleCallback;
    if (typeof idle === "function") {
      idleHandle = idle(fn, { timeout: 3000 });
    } else {
      timeoutHandle = setTimeout(fn, 1200);
    }
  };

  if (document.readyState === "complete") {
    schedule();
  } else {
    window.addEventListener("load", schedule, { once: true });
  }

  return () => {
    const cancel = (window as Window & { cancelIdleCallback?: (h: number) => void })
      .cancelIdleCallback;
    if (idleHandle !== undefined && typeof cancel === "function") cancel(idleHandle);
    if (timeoutHandle !== undefined) clearTimeout(timeoutHandle);
    window.removeEventListener("load", schedule);
  };
}

export function HeroVideo({ mp4, webm, poster }: Props) {
  // `mounted` gates the <video> into the DOM; `visible` fades it in only once a
  // frame exists, so the poster is never replaced by a black rectangle.
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [failed, setFailed] = useState(false);
  const [paused, setPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || connectionIsExpensive()) return;
    return whenIdle(() => setMounted(true));
  }, []);

  const toggle = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setPaused(false);
    } else {
      video.pause();
      setPaused(true);
    }
  }, []);

  if (!mounted || failed) return null;

  return (
    <>
      <video
        ref={videoRef}
        className={`hero-video ${visible ? "is-ready" : ""}`}
        // muted + playsInline are what make autoplay permissible on iOS and
        // Android; without both, the browser refuses and the poster stays.
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={withBasePath(poster)}
        aria-hidden="true"
        tabIndex={-1}
        onPlaying={() => setVisible(true)}
        onError={() => setFailed(true)}
      >
        <source src={withBasePath(webm)} type="video/webm" />
        <source src={withBasePath(mp4)} type="video/mp4" />
      </video>

      {/*
        A background video that cannot be stopped is a WCAG 2.2.2 failure once
        it runs past five seconds, so the control is not optional. It is a real
        button in the tab order, labelled for its action rather than its icon.
      */}
      <button
        type="button"
        onClick={toggle}
        className="hero-video-toggle"
        aria-pressed={paused}
      >
        <span className="sr-only">
          {paused ? "Play the background video" : "Pause the background video"}
        </span>
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="h-4 w-4">
          {paused ? (
            <path d="M8 5v14l11-7z" fill="currentColor" />
          ) : (
            <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor" />
          )}
        </svg>
      </button>
    </>
  );
}
