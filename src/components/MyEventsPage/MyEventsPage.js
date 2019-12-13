import React, {Component} from 'react'
import {ACCESS_TOKEN} from "../../constants/constants";
import axios from "../../axios/axios";
import moment from 'moment-timezone'
import {Redirect} from "react-router-dom";

class MyEventsPage extends Component {

  state = {
    redirect: "",
    loading: false,
    watchings: []
  };

  componentDidMount() {
    this.getMovieWatching()
  }

  getMovieWatching = async () => {
    this.setState({loading: true});
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      this.setState({redirect: "/"});
      return
    }
    try {
      const response = await axios.getMovieWatchings(token);
      const populatedWatchings = await this.populateWatchings(response.data, token);
      this.setState({watchings: populatedWatchings, loading: false})
    } catch (e) {
      this.setState({redirect: "/"});
    }
  };

  populateWatchings = async (watchings, token) => {
    for (let watching of watchings) {
      let response = await axios.getMovie(token, watching.imdbID);
      watching.movie = response.data;
    }
    return watchings
  };

  redirectToMoviePage = (id) => {
    this.setState({redirect: "/movie/" + id})
  };

  renderWatchings = () => {
    if (!this.state.watchings) return null;
    return this.state.watchings.map(watching => {
      return watching.movie ?
        <div className="row p-3 mt-4 movie-watching" onClick={() => this.redirectToMoviePage(watching.imdbID)}>
          <div className="col-4">
            <h5>{watching.movie.title}</h5>
          </div>
          <div className="col-8">
            <h5 className="text-right">
              {moment.tz(watching.startTime, moment.tz.guess()).format("YYYY.MM.DD | HH.mm ")}
              - {moment.tz(watching.endTime, moment.tz.guess()).format("HH.mm")}</h5>
          </div>
        </div> : null
    });
  };

  render() {

    if (this.state.redirect) return <Redirect to={this.state.redirect}/>;

    return <div>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center m-auto">My Movie Watchings</h2>
        </div>
      </div>
      {this.state.loading && <div className="row mt-5">
        <div className="col-12">
          <h3 className="m-auto text-center">Loading....</h3>
        </div>
      </div>}
      {this.renderWatchings()}
    </div>
  }
}

export default MyEventsPage