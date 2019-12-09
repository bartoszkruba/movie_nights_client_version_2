import React, {Component} from 'react';
import MovieListItem from "./MovieListItem/MovieListItem";

class MovieList extends Component {

  renderMovies = (movies) => {
    return movies.map(movie => <MovieListItem movie={movie}/>)
  };

  render() {
    const movies = this.props.movies;
    return this.renderMovies(movies);
  }
}

export default MovieList