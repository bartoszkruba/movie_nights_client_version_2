import React, {Component} from 'react'
import {Button} from "reactstrap";
import MovieSearchComponent from "../MovieSearch/MovieSearchComponent/MovieSearchComponent";
import {ACCESS_TOKEN} from "../../constants/constants";
import axios from "../../axios/axios";

class CreateMovieEventPage extends Component {

  state = {
    stage: "choose movie",
    showMovieSearch: false,
    choosenFriends: []
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
            <h3 className="text-center">Chose Friends</h3>
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
            <Button color="primary" className="m-auto">Done</Button>
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