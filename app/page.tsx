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

  const decorations = [
    { emoji: "❤️", top: "5%", left: "3%", size: 2 },
    { emoji: "🧸", top: "8%", left: "15%", size: 1.8 },
    { emoji: "🌸", top: "3%", left: "85%", size: 2.2 },
    { emoji: "💕", top: "12%", left: "90%", size: 1.5 },
    { emoji: "🌷", top: "75%", left: "5%", size: 2 },
    { emoji: "🧸", top: "80%", left: "88%", size: 1.6 },
    { emoji: "💗", top: "85%", left: "25%", size: 1.4 },
    { emoji: "🌸", top: "70%", left: "92%", size: 1.8 },
    { emoji: "❤️", top: "25%", left: "2%", size: 1.2 },
    { emoji: "🌺", top: "30%", left: "93%", size: 1.6 },
    { emoji: "💖", top: "45%", left: "5%", size: 1.5 },
    { emoji: "🧸", top: "55%", left: "90%", size: 1.3 },
    { emoji: "🌸", top: "40%", left: "8%", size: 1.4 },
    { emoji: "💕", top: "60%", left: "85%", size: 1.2 },
    { emoji: "🌷", top: "18%", left: "75%", size: 1.5 },
    { emoji: "❤️", top: "88%", left: "50%", size: 1.3 },
    { emoji: "🌺", top: "15%", left: "50%", size: 1.1 },
    { emoji: "💗", top: "92%", left: "72%", size: 1.4 },
    { emoji: "🌸", top: "35%", left: "45%", size: 1 },
    { emoji: "🧸", top: "5%", left: "55%", size: 1.2 },
    { emoji: "💖", top: "65%", left: "15%", size: 1.3 },
    { emoji: "🌷", top: "50%", left: "78%", size: 1.2 },
  ];

  return (
    <>
      <div ref={containerRef} className={s.valentineContainer}>
        <div className={s.decorations} aria-hidden="true">
          {decorations.map((d, i) => (
            <span
              key={i}
              className={s.decoItem}
              style={{
                top: d.top,
                left: d.left,
                fontSize: `${d.size}rem`,
              }}
            >
              {d.emoji}
            </span>
          ))}
        </div>
        <h1 className={s.title}>
          Will you be my Valentine?
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
