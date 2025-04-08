import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ videoId, userId }) => {
  const videoSrc = `https://me-course.com:8069/api/courses/video/stream/${videoId}/${userId}`;

  return <ReactPlayer url={videoSrc} controls width="100%" height="auto" />;
};

export default VideoPlayer;
