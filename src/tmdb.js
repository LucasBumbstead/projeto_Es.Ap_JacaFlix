const API_KEY = 'fca20a8a62aeb9dec3aca16c54e9a58f';
const API_BASE = 'https://api.themoviedb.org/3';

/*
-originais da jacaFLIX
-recomendados (trending)
- filmes em alta(top rated)
- acao
- comedia
- romance
- documentarios
*/

const basicFetch = async (endpoint) => {
    const req = await fetch (`${API_BASE}${endpoint}`);
    const json = await req.json();
    return json;
}

export default {
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Recomendados jacaFLIX',
                items: await basicFetch(`/discover/tv?with_network=213&langugage=pt-BR&with_origin_country=US&api_key=${API_KEY}`)
            },
            {
                slug: 'trending',
                title: 'Baseado em suas pesquisas',
                items: await basicFetch(`/trending/all/week?langugage=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'toprated',
                title: 'Em alta',
                items: await basicFetch(`/movie/top_rated?langugage=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'action',
                title: 'Ação',
                items: await basicFetch(`/discover/movie?with_genres=28&langugage=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'comedy',
                title: 'Comédia',
                items: await basicFetch(`/discover/movie?with_genres=35&langugage=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'horror',
                title: 'Terror',
                items: await basicFetch(`/discover/movie?with_genres=27&langugage=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&langugage=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'documentary',
                title: 'Documentários',
                items: await basicFetch(`/discover/movie?with_genres=99&langugage=pt-BR&api_key=${API_KEY}`)
            },
            
        ];
    },
    getMovieInfo: async (movieId, type) => {
        let info = {};

        if(movieId){
            switch(type){
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`)

                break;
                case 'tv':
                    info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`)

                break;
                default:
                    info = null;
                break;
            }
        }

        return info;
    }
}