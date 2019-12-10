import React, {Component} from 'react'
import {Redirect} from "react-router-dom";
import axios from '../../axios/axios';
import {ACCESS_TOKEN} from "../../constants/constants";


class MovieDetailsPage extends Component {

  state = {
    movie: {},
    redirect: ""
  };

  componentDidMount() {
    this.fetchMovie()
  }

  fetchMovie = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      this.props.setUser(null);
      this.setState({redirect: "/"});
    }

    try {
      const response = await axios.getMovie(token, this.props.match.params.id);
      this.setState({movie: response.data})
    } catch (e) {
      this.props.setUser(null);
      this.setState({redirect: "/"});
      localStorage.removeItem(ACCESS_TOKEN)
    }
  };

  render() {
    if (this.state.redirect) return <Redirect to={this.state.redirect}/>;

    return <div>
      <div className="row">
        <div className="col-6">
          <h1>{this.state.movie.title}</h1>
          <div className="row mt-4">
            <div className="col-6">
              <div className="p-1"><b> Year:</b> {this.state.movie.year}</div>
              <div className="p-1"><b>Country:</b> {this.state.movie.country}</div>
            </div>
            <div className="col-6">
              <div className="p-1"><b> Genre:</b> {this.state.movie.genre}</div>
              <div className="p-1"><b>Runtime:</b> {this.state.movie.runtime}</div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12">
              <div className="p-1"><b> Director:</b> {this.state.movie.director}</div>
              <div className="p-1"><b> Actors:</b> {this.state.movie.actors}</div>
              <div className="p-1"><b> IMDB Rating:</b> {this.state.movie.imdbRating}</div>
              <div className="p-1"><b> Language:</b> {this.state.movie.language}</div>
              <div className="p-1"><b> Production:</b> {this.state.movie.production}</div>
              <div className="p-1"><b> Box Office:</b> {this.state.movie.boxOffice}</div>
            </div>
          </div>
        </div>
        <div className="col-6"><img src={this.state.movie.smallPoster} alt="movie poster" className="img-fluid"/></div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <p>{this.state.movie.plot}</p>
        </div>
      </div>
    </div>
  }

}

export default MovieDetailsPage;