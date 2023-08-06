import React, { useEffect, useState } from 'react';
import './App.css' 
import tmdb from './tmdb';
import MovieRow from './components/movieRow';
import FeaturedMovie from './components/featuredmovie';
import Header from './components/header';

export default () => {


  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);


  useEffect(()=>{
    const loadAll = async () => {
      //Pegando lista TOTAL
      let list = await tmdb.getHomeList();
      setMovieList(list);

      // pegando o featured
      let originals = list.filter(i=>i.slug == 'originals');
      let ramdomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1));
      let chosen = originals[0].items.results[ramdomChosen];
      let chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);

    }


    loadAll();

  }, []);

  useEffect(()=>{
    const scrollListener = () => {
      if(window.scrollY > 10){
        setBlackHeader(true);
      } else{
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);
    return() =>{
      window.removeEventListener('scroll', scrollListener);
    }

  }, []);

  return (
    <div className="page">

      <Header black={blackHeader} />

      {featuredData && 
        <FeaturedMovie item={featuredData} />
      }

      

      <section className="lists">
        {movieList.map((item,key)=>(
          <MovieRow key={key} title= {item.title} items={item.items} />

        ))}
      </section> 

      <footer>
        Feito com <span role ="img" aria-label="coração">❤️</span> pelo Grupo4 de ES aplicada<br/>
        Direitos de imagem para Netflix<br/>
        Dados pegos do site Themoviedb.org

      </footer>
      {movieList.length <= 0 &&
      <div className="loading">
        <img src = "https://media0.giphy.com/media/3y0oCOkdKKRi0/giphy.gif?cid=ecf05e473dd2rxbip6djqlmk38lgzcn4puttok8qpnl3hd0u&ep=v1_gifs_search&rid=giphy.gif&ct=g"></img>
      </div>
      }
    </div>
  );
}