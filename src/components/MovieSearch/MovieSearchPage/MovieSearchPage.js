import React, {Component} from 'react'
import MovieSearchComponent from '../MovieSearchComponent/MovieSearchComponent'
import {Redirect} from "react-router-dom";

class MovieSearchPage extends Component {

  state = {
    redirect: ""
  };

  movieClicked = id => {
    this.setState({redirect: "/movie/" + id})
  };

  render() {
    if (this.state.redirect) return <Redirect to={this.state.redirect}/>;

    return <div>
      <div className="row mb-5">
        <h1 className="m-auto">Search For Movies</h1>
      </div>
      <MovieSearchComponent movieClicked={this.movieClicked}/>
    </div>
  }
}

export default MovieSearchPage;