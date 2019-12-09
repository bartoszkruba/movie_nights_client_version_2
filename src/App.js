import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route, withRouter} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navigation from "./components/navbar/Navigation";
import Login from './user/login/Login'
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

    return <Router>
      <Navigation user={this.state.user} setUser={this.setUser} redirect={this.redirect}/>
      <Route exact path="/login" component={login}/>
      <Route exact path="/oauth2/redirect" component={oauth2}/>
    </Router>
  }
}

export default withRouter(App);
