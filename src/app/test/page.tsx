import React from 'react';


const YouTubeVideoPlayer: React.FC<VideoPlayerProps> = ({
  videoId = '3E8q5vNx10w', // default video ID
  width = 640,
  height = 360,
  controls = true,
  autoPlay = false
}) => {
  const embedUrl = `https://www.youtube.com/embed/${videoId}?${
    controls ? 'controls=1&' : 'controls=0&'
  }${autoPlay ? 'autoplay=1' : 'autoplay=0'}`;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <iframe
        width={width}
        height={height}
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default YouTubeVideoPlayer;