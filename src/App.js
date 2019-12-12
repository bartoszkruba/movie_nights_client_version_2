import React, {Component} from 'react';
import {BrowserRouter as Router, Route, withRouter} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./components/Navigation/Navigation";
import Login from './user/login/Login';
import Index from './components/Index/Index';
import MovieSearchPage from "./components/MovieSearch/MovieSearchPage/MovieSearchPage";
import MovieDetailsPage from "./components/MovieDetails/MovieDetailsPage";
import FriendsPage from "./components/FriendsPage/FriendsPage"
import CalendarPage from "./components/CalendarPage/CalendarPage";
import OAuth2RedirectHandler from "./user/oauth2/OAuth2RedirectHandler";
import {ACCESS_TOKEN} from "./constants/constants";
import axios from './axios/axios'


class App extends Component {

  state = {
    user: null
  };

  componentDidMount() {
    this.checkIfLoggedIn();
  }

  async checkIfLoggedIn() {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      try {
        const response = await axios.getUser(token);
        this.setUser(response.data);
      } catch (e) {
        console.log(e);
        localStorage.removeItem(ACCESS_TOKEN);
        this.setState({user: null})
      }
    } else {
      localStorage.removeItem(ACCESS_TOKEN);
    }
  }

  setUser = (user) => {
    this.setState({user})
  };

  redirect = location => {
    this.props.history.push(location)
  };

  render() {
    const login = () => <Login/>;
    const oauth2 = () => <OAuth2RedirectHandler location={this.props.location} setUser={this.setUser}/>;
    const index = () => <Index setUser={this.setUser} user={this.state.user}/>;
    const movieSearchPage = () => <MovieSearchPage setUser={this.setUser} redirect={this.redirect}/>;
    const friendsPage = () => <FriendsPage/>;
    const calendarPage = () => <CalendarPage/>;

    return <Router>
      <Navigation user={this.state.user} setUser={this.setUser} redirect={this.redirect}/>
      <div className="container mt-3">
        <Route exact path="/" component={index}/>
        <Route exact path="/login" component={login}/>
        <Route exact path="/oauth2/redirect" component={oauth2}/>
        <Route exact path="/movies" component={movieSearchPage}/>
        <Route path="/movie/:id" render={props => <MovieDetailsPage {...props} setUser={this.setUser}/>}/>
        <Route exact path="/friends" component={friendsPage}/>
        <Route exact path="/calendar" component={calendarPage}/>
      </div>
    </Router>
  }
}

export default withRouter(App);
