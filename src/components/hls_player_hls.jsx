import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

const HLSPlayer = ({ videoSrc }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (Hls.isSupported() && videoSrc) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(videoRef.current);

      return () => hls.destroy();
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = videoSrc;
    }
  }, [videoSrc]);

  return (
    <div style={{ position: "relative", width: "100%", maxHeight: "450px" }}>
      <video
        ref={videoRef}
        controls
        style={{ width: "100%", maxHeight: "450px" }}
      />
    </div>
  );
};

export default HLSPlayer;
