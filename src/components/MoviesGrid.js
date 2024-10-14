import React, { useState } from "react";
import '../styles.css';
import MovieCard from "./MovieCard";

export default function MoviesGrid({movies, watchlist, toggleWatchlist}) {

    const [searchTerm, setSearchTerm] = useState('');
    const [searchGenre, setSearchGenre] = useState('All');
    const [searchRating, setSearchRating] = useState('All');

    const genresOpts = ['All', 'Action', 'Drama', 'Fantasy', 'Horror'];
    const ratingOpts = ['All', 'Good', 'Ok', 'Bad'];

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleSearchGenreChange = (e) => {
        setSearchGenre(e.target.value);
    }

    const handleSearchRatingChange = (e) => {
        setSearchRating(e.target.value);
    }

    const matchGenre = (movie, genre) => {
        return genre === 'All' || movie.genre.toLowerCase() === genre.toLowerCase();
    }

    const matchRating = (movie, rating) => {
        if (rating === 'All') {
            return true;
        }
        return (movie.rating >= 8 && rating === 'Good') ||
            (rating >= 5 && rating < 8 && rating === 'Ok') ||
            (rating < 5 && rating === 'Bad');
    }

    const filteredMovies = movies.filter((movie) => 
        matchGenre(movie, searchGenre) &&
        matchRating(movie, searchRating) &&
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

    return (
        <div>
            <input 
                type="text" 
                className="search-input" 
                placeholder="Search movies..."
                value={searchTerm}
                onChange={handleSearchChange}
            />

            <div className="filter-bar">
                <div className="filter-slot">
                    <label>Genre</label>
                    <select className="filter-dropdown" value={searchGenre} onChange={handleSearchGenreChange}>
                        {
                            genresOpts.map(g => (
                                <option key={g}>{g}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="filter-slot">
                    <label>Rating</label>
                    <select className="filter-dropdown" value={searchRating} onChange={handleSearchRatingChange}>
                        {
                            ratingOpts.map(r => (
                                <option key={r}>{r}</option>
                            ))
                        }
                    </select>
                </div>

            </div>

            <div className="movies-grid">
                {
                    filteredMovies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} isWatchlisted={watchlist.includes(movie.id)} toggleWatchlist={toggleWatchlist}/>
                    ))
                }
            </div>
        </div>
    );
}