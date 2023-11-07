import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ url, onClose, showVideo }) => {
  return (
    <div className={`video-player ${showVideo ? 'center-video' : ''}`}>
      {/* Se showVideo for verdadeiro, a classe center-video será aplicada */}
      <ReactPlayer
        url={url}
        controls={true}
        width="100%"
        height="100%"
        playing={true}
        onEnded={onClose}
      />
      <button onClick={onClose} className="button close-video">
        Fechar
      </button>
    </div>
  );
};