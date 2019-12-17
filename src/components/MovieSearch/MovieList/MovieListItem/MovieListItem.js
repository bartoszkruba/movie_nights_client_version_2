import React, {Component} from 'react';

class MovieListItem extends Component {

  render() {
    const movie = this.props.movie;
    return <div className="row mt-4 p-5 movie-item">
      <div className="col-12">
        <h4>{movie.title} ({movie.year})</h4>
      </div>
      <div className="col-12">
        <h6>{movie.runtime} | {movie.genre} | {movie.country}</h6>
      </div>
      <div className="col-12">
        <p>{movie.plot}</p>
      </div>
    </div>
  }
}

export default MovieListItem;