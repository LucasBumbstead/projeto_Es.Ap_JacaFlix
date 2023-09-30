import React from "react";

const PlayFilme = ({ youtubeVideoId }) => {
  return (
    <div>
      {/* Vídeo do YouTube incorporado */}
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${youtubeVideoId}`}
        title="Play Filme"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default PlayFilme;