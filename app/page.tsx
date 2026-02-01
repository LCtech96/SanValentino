"use client";

import { useState, useCallback, useRef } from "react";
import s from "./page.module.css";

export default function ValentinePage() {
  const [showVideo, setShowVideo] = useState(false);
  const [notStyle, setNotStyle] = useState<React.CSSProperties>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const notButtonRef = useRef<HTMLButtonElement>(null);

  const moveNotButton = useCallback(() => {
    if (!containerRef.current || !notButtonRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const button = notButtonRef.current.getBoundingClientRect();
    const maxX = Math.max(100, (container.width - button.width) / 2);
    const maxY = Math.max(80, (container.height - button.height) / 2);

    const newX = (Math.random() - 0.5) * 2 * maxX;
    const newY = (Math.random() - 0.5) * 2 * maxY;

    setNotStyle({
      transform: `translate(${newX}px, ${newY}px)`,
      transition: "transform 0.12s ease-out",
    });
  }, []);

  const handleYesClick = () => {
    setShowVideo(true);
  };

  const handleVideoClose = () => {
    setShowVideo(false);
  };

  return (
    <>
      <div ref={containerRef} className={s.valentineContainer}>
        <h1 className={s.title}>
          Do you want to be my Valentine&apos;s Day?
        </h1>

        <div className={s.buttonsWrapper}>
          <button className={s.btnYes} onClick={handleYesClick}>
            YES
          </button>
          <button
            ref={notButtonRef}
            className={s.btnNot}
            onClick={moveNotButton}
            onMouseEnter={moveNotButton}
            onMouseMove={(e) => {
              const rect = notButtonRef.current?.getBoundingClientRect();
              if (rect) {
                const dist = Math.hypot(
                  e.clientX - rect.left - rect.width / 2,
                  e.clientY - rect.top - rect.height / 2
                );
                if (dist < 80) moveNotButton();
              }
            }}
            style={notStyle}
          >
            NOT
          </button>
        </div>
      </div>

      {showVideo && (
        <div className={s.videoOverlay} onClick={handleVideoClose}>
          <div
            className={s.videoContent}
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src="/sevara.mp4"
              autoPlay
              loop
              muted
              playsInline
              className={s.fullscreenVideo}
            />
            <p className={s.thanksText}>Thanks to Accept the request</p>
            <button className={s.closeBtn} onClick={handleVideoClose}>
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
