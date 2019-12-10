import React, {Component} from 'react';
import MovieListItem from "./MovieListItem/MovieListItem";

class MovieList extends Component {

  renderMovies = (movies) => {
    return movies.map(movie => <div onClick={e => this.props.movieClicked(movie.imdbID) }> <MovieListItem movie={movie}/></div>)
  };

  render() {
    const movies = this.props.movies;
    return this.renderMovies(movies);
  }
}

export default MovieList