import React, {Component} from 'react'
import {Button} from "reactstrap";
import MovieSearchComponent from "../MovieSearch/MovieSearchComponent/MovieSearchComponent";
import {ACCESS_TOKEN} from "../../constants/constants";
import TimePicker from "rc-time-picker";
import 'rc-time-picker/assets/index.css';
import axios from "../../axios/axios";
import moment from 'moment-timezone'

const now = moment().hour(0).minute(0);

class CreateMovieEventPage extends Component {

  state = {
    stage: "choose movie",
    showMovieSearch: false,
    choosenFriends: [],
    timePickerValue: null,
    loading: false
  };

  chooseMovieButtonClicked = () => {
    this.setState({showMovieSearch: true})
  };

  movieChoosen = async id => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      this.setState({redirect: "/"});
    }

    try {
      const movieResponse = await axios.getMovie(token, id);
      const friendsResponse = await axios.getFriends(token);
      this.setState({choosenMovie: movieResponse.data, stage: "choose friends", friends: friendsResponse.data})
    } catch (e) {
      this.setState({redirect: "/"});
    }
  };

  doneWithChosingFriends = () => {
    this.setState({stage: "choose time"})
  };

  friendChosen = id => {
    const friend = this.state.friends.filter(friend => friend.id === id)[0];
    const newFriends = [...this.state.friends];
    newFriends.splice(newFriends.indexOf(friend), 1);
    const newChoosenFriends = [...this.state.choosenFriends];
    newChoosenFriends.push(friend);
    this.setState({friends: newFriends, choosenFriends: newChoosenFriends});
  };

  friendCancelled = id => {
    const friend = this.state.choosenFriends.filter(friend => friend.id === id)[0];
    const newFriends = [...this.state.friends];
    const newChoosenFriends = [...this.state.choosenFriends];
    newChoosenFriends.splice(newFriends.indexOf(friend), 1);
    newFriends.push(friend);
    this.setState({friends: newFriends, choosenFriends: newChoosenFriends});
  };

  renderFriends = () => {

    if (this.state.friends.length === 0) return <div className="row mt-3">
      <div className="col-12">
        <p className="m-auto text-center">You have no more friends</p>
      </div>
    </div>;

    const friends = this.state.friends.map(friend => <div className="col-12 p-3 mt-3 friend-box" key={friend.key}
                                                          onClick={() => this.friendChosen(friend.id)}>
        <h4>{friend.name}</h4>
      </div>
    );
    return <div className="row mt-3">{friends}</div>
  };

  renderChosenFriends = () => {
    if (this.state.choosenFriends.length === 0) return <div className="row mt-3">
      <div className="col-12">
        <p className="m-auto text-center">No friends chosen.</p>
      </div>
    </div>;

    const friends = this.state.choosenFriends.map(friend => <div className="col-12 p-3 mt-3 friend-box" key={friend.key}
                                                                 onClick={() => this.friendCancelled(friend.id)}>
        <h4>{friend.name}</h4>
      </div>
    );
    return <div className="row mt-3">{friends}</div>
  };

  onTimeChange = value => {
    this.setState({timePickerValue: value})
  };

  suggestTimesButtonPressed = async () => {
    this.setState({loading: true});
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      this.setState({redirect: "/"});
    }

    try {
      const startTime = this.state.timePickerValue.hour() * 60 + this.state.timePickerValue.minutes();
      const response = await axios.getPossibleTimes(token, this.state.choosenFriends, this.state.choosenMovie.imdbID,
        startTime);
      this.setState({suggestedTimes: response.data, loading: false})
    } catch (e) {
      console.log(e);
      this.setState({redirect: "/"});
    }
  };

  timePicked = value => {
    this.setState({chosenTime: value, stage: "finish"})
  };

  renderSuggestedTimes = () => {
    const times = this.state.suggestedTimes.map(time => <div className="col-12 p-3 mt-3 friend-box" key={time}
                                                             onClick={() => this.timePicked(time)}>
        <h4>{moment.unix(time).format('dddd, MMMM Do, YYYY HH:mm ')}</h4>
      </div>
    );
    return <div className="row mt-3 mb-3">{times}</div>
  };

  finishBooking = async () => {
    this.setState({loading: true});
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      this.setState({redirect: "/"});
    }

    try {
      const response = await axios.createMovieWatching(token, this.state.choosenFriends, this.state.choosenMovie.imdbID,
        this.state.chosenTime * 1000);
      this.setState({loading: false, stage: "finished"})
    } catch (e) {
      console.log(e);
      this.setState({redirect: "/"});
    }
  };

  renderPage = () => {
    if (this.state.stage === "choose movie") {
      if (this.state.showMovieSearch) {
        return <div>
          <h4 className="text-center mt-5 mb-3">Chose Movie</h4>
          <MovieSearchComponent movieClicked={this.movieChoosen}/>
        </div>
      } else {
        return <div className="row mt-5">
          <div className="col-12 m-auto text-center">
            <Button color="primary" className="m-auto" onClick={this.chooseMovieButtonClicked}>Choose Movie</Button>
          </div>
        </div>
      }
    }
    if (this.state.stage === "choose friends") {
      return <div className="mt-5">
        <div className="row">
          <div className="col-12">
            <h4 className="text-center">Movie: {this.state.choosenMovie.title}, {this.state.choosenMovie.runtime}</h4>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            <h3 className="text-center">Available Friends</h3>
          </div>
        </div>
        {this.renderFriends()}
        <div className="row mt-3">
          <div className="col-12">
            <h3 className="text-center">Chosen Friends:</h3>
          </div>
        </div>
        {this.renderChosenFriends()}
        <div className="row mt-3">
          <div className="col-12 text-center">
            <Button color="primary" className="m-auto" onClick={this.doneWithChosingFriends}>Continue</Button>
          </div>
        </div>
      </div>;
    }
    if (this.state.stage === "choose time") {
      return <div className="mt-5">
        <div className="row">
          <div className="col-12">
            <h4 className="text-center">Movie: {this.state.choosenMovie.title}, {this.state.choosenMovie.runtime}</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <h4 className="text-center">Friends: {this.state.choosenFriends.map(friend => friend.name + " | ")}</h4>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            <h3 className="text-center">Chose Time</h3>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-4">
            <h5>Pick start time</h5>
          </div>
          <div className="col-4 text-center">
            <TimePicker showSecond={false} defaultValue={now} onChange={this.onTimeChange}/>
          </div>
          <div className="col-4 text-right">
            {this.state.timePickerValue &&
            <Button color="primary" onClick={this.suggestTimesButtonPressed}>Find Free Times</Button>}
          </div>
        </div>
        {this.state.loading && <div className="row mt-3">
          <div className="col-12">
            <h5 className="text-center">Loading...</h5>
          </div>
        </div>}
        {this.state.suggestedTimes && this.renderSuggestedTimes()}
      </div>
    }
    if (this.state.stage === "finish") {
      return <div className="mt-5">
        <div className="row">
          <div className="col-12">
            <h4 className="text-center">Movie: {this.state.choosenMovie.title}, {this.state.choosenMovie.runtime}</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <h4 className="text-center">Friends: {this.state.choosenFriends.map(friend => friend.name + " | ")}</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <h4
              className="text-center">Time: {moment.unix(this.state.chosenTime).format('dddd, MMMM Do, YYYY HH:mm ')}</h4>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12 text-center">
            {this.state.loading && <h4>Loading...</h4>}
            {!this.state.loading &&
            <Button size="lg" color="primary" onClick={this.finishBooking}>Create Event</Button>}
          </div>
        </div>
      </div>
    }
    if (this.state.stage === "finished") {
      return <div className="mt-5">
        <div className="row">
          <div className="col-12">
            <h4 className="text-center">Movie: {this.state.choosenMovie.title}, {this.state.choosenMovie.runtime}</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <h4 className="text-center">Friends: {this.state.choosenFriends.map(friend => friend.name + " | ")}</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <h4
              className="text-center">Time: {moment.unix(this.state.chosenTime).format('dddd, MMMM Do, YYYY HH:mm ')}</h4>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12 text-center">
            <h2>Your booking is finished</h2>
          </div>
        </div>
      </div>
    }
  };

  render() {
    return <div className="mt-4">
      <div className="row mt-4">
        <div className="col-12">
          <h1 className="text-center">Create New Event</h1>
        </div>
      </div>
      {this.renderPage()}
    </div>
  }

}

export default CreateMovieEventPage