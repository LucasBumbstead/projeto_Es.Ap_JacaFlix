import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import axios from 'axios';
import Movie from './components/Movie';
import { FaSearch } from 'react-icons/fa';
import logo from './assets/logo.png';
import jaca from './assets/icons8-jackfruit-48.png';
import ReactPlayer from 'react-player'; // Importe o componente ReactPlayer
import YouTube from 'react-youtube';
import { animateScroll as scroll } from 'react-scroll';



// Importe o Vimeo do react-player
import Vimeo from 'react-player/vimeo';

function App() {
  const MOVIE_API = "https://api.themoviedb.org/3/";
  const SEARCH_API = MOVIE_API + "search/movie";
  const DISCOVER_API = MOVIE_API + "discover/movie/?language=pt-BR";
  const API_KEY = "fca20a8a62aeb9dec3aca16c54e9a58f";
  const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280";

  const [playing, setPlaying] = useState(false);
  const [trailer, setTrailer] = useState(null);
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [movie, setMovie] = useState({ title: "Loading Movies" });
  const [playingTrailer, setPlayingTrailer] = useState(false);

  const [videoUrl, setVideoUrl] = useState(null); // Adicione um estado para a URL do vídeo
  const [showVideoPlayer, setShowVideoPlayer] = useState(false); // Estado para controlar a exibição do reprodutor de vídeo
  const videoPlayerRef = useRef(null);


  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async (event) => {
    if (event) {
      event.preventDefault();
    }

    const { data } = await axios.get(`${searchKey ? SEARCH_API : DISCOVER_API}`, {
      params: {
        api_key: API_KEY,
        query: searchKey
      }
    });

    console.log(data.results[0]);
    setMovies(data.results);
    setMovie(data.results[0]);

    if (data.results.length) {
      await fetchMovie(data.results[0].id);
    }
  };

  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${MOVIE_API}movie/${id}?language=pt-BR`, {
      params: {
        api_key: API_KEY,
        append_to_response: "videos"
      }
    });

    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find((vid) => vid.type === "Trailer");
      setTrailer(trailer ? trailer : data.videos.results[0]);
    }

    setMovie(data);
  };

  const handleLogoClick = () => {
    window.location.reload();
  };

  const selectMovie = (movie) => {
    fetchMovie(movie.id);
    setPlaying(false);
    setMovie(movie);
    window.scrollTo(0, 0);
  };

  const renderMovies = () =>
    movies.map((movie) => (
      <Movie selectMovie={selectMovie} key={movie.id} movie={movie} />
    ));

  const Filmes = {
    "Besouro Azul": "exEiPYX2CY8",
    "Homem-Aranha: Através do Aranhaverso": "https://vimeo.com/871587694?share=copy",
    "A Chamada": "https://vimeo.com/871587694?share=copy",
    "Your Name": "https://vimeo.com/620868134",
    "Velozes & Furiosos 10": "https://vimeo.com/856018034",
  };

  const handleAssistirFilmeClick = () => {
    const filmeKey = Filmes[movie.title];
  
    if (filmeKey) {
      // Defina a URL do vídeo para reprodução
      setVideoUrl(filmeKey);
      setShowVideoPlayer(true); // Exiba o reprodutor de vídeo
      setPlaying(false); // Pausar o vídeo de fundo (se estiver tocando)
      setPlayingTrailer(false); // Certifique-se de que o trailer não esteja sendo reproduzido
  
      // Role a página para o local onde o vídeo está sendo exibido usando react-scroll
      scroll.scrollTo('video-player', {
        duration: 800,
        smooth: 'easeInOutQuart',
      });

      
    } else {
      // TODO:
      alert('Desculpe, o filme selecionado não está disponível no momento.');
    }
  };

  const handleCloseVideoPlayer = () => {
    // Feche o reprodutor de vídeo
    setShowVideoPlayer(false);
    setVideoUrl(null); // Limpe a URL do vídeo
  };

  return (
    <div className="App">
      <header className="center-max-size header">
        <img className="logo" src={logo} alt="Logo Jaca Flix!" onClick={handleLogoClick} />
        <form className="form" onSubmit={fetchMovies}>
          <input
            className="search"
            type="text"
            id="search"
            onInput={(event) => setSearchKey(event.target.value)}
          />
          <button className="submit-search" type="submit">
            <FaSearch />
          </button>
        </form>
      </header>
      {movies.length ? (
        <main>
          {movie ? (
            <div
              className="poster"
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${BACKDROP_PATH}${movie.backdrop_path})`,
              }}
            >
              {playing ? (
                <>
                <div className="center-video">
                  <ReactPlayer
                    ref={videoPlayerRef}
                    url={videoUrl}
                    controls={true}
                    width="1000px"
                    height="500px"
                    playing={true}
                    onEnded={handleCloseVideoPlayer}
                  />
                </div>
                  <button onClick={handleCloseVideoPlayer} className="button close-video">
                    Fechar
                  </button>
                </>
              ) : playingTrailer ? (
                <>
                  <YouTube
                    videoId={trailer.key}
                    className={"youtube amru"}
                    ontainerClassName={"youtube-container amru"}
                    opts={{
                      width: "1000px",
                      height: "500px",
                      playerVars: {
                        autoplay: 1,
                        controls: 1,
                        cc_load_policy: 0,
                        fs: 1,
                        iv_load_policy: 0,
                        modestbranding: 0,
                        rel: 0,
                        showinfo: 0,
                      },
                    }}
                  />
                  <button onClick={() => setPlayingTrailer(false)} className="button close-video">
                    Fechar Trailer
                  </button>
                </>
              ) : (
                <div className="center-max-size">
                  <div className="poster-content">
                    {trailer ? (
                      <div>
                        <button
                          className="button play-video"
                          onClick={handleAssistirFilmeClick}
                          type="button"
                        >
                          Assistir Filme
                        </button>
                        <button
                          className="button play-video"
                          onClick={() => setPlayingTrailer(true)}
                          type="button"
                        >
                          Assistir Trailer
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          className="button play-video"
                          onClick={handleAssistirFilmeClick}
                          type="button"
                        >
                          Assistir Filme
                        </button>
                        <button
                          className="button play-video"
                          onClick={() => setPlayingTrailer(true)}
                          type="button"
                        >
                          Assistir Trailer
                        </button>
                      </div>
                    )}
                    <h1>{movie.title}</h1>
                    <p>{movie.overview}</p>
                  </div>
                </div>
              )}
            </div>
          ) : null}

          {/* Título "Filmes Recomendados" adicionado aqui */}
          <h2 className="title">
            <img src={jaca} alt="Jaca" className="jaca-icon-left" />
            Recomendações de Filmes do Dia
            <img src={jaca} alt="Jaca" className="jaca-icon-right" />
          </h2>

          <div className="center-max-size container">{renderMovies()}</div>
        </main>
      ) : (
        'Nenhum filme encontrado'
      )}
      {showVideoPlayer && videoUrl && (
        <div className="fullscreen-video">
          <div className="center-video">
            <Vimeo url={videoUrl} controls={true} playing={true} onEnded={handleCloseVideoPlayer} />
            <button onClick={handleCloseVideoPlayer} className="button close-video">
              Fechar Filme
            </button>
        </div>
      </div>
      )}
    </div>
  );
}

export default App;
