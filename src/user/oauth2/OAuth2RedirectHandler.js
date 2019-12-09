import React, {Component} from 'react';
import {ACCESS_TOKEN} from "../../constants/constants";
import {Redirect} from 'react-router-dom';
import axios from '../../axios/axios'

class OAuth2RedirectHandler extends Component {
  getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

    let results = regex.exec(this.props.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  getUserDetails = async (token) => {
    try {
      const response = await axios.getUser(token);
      this.props.setUser(response.data);
    } catch (e) {
      localStorage.removeItem(ACCESS_TOKEN);
      console.log(e);
    }
  };

  render() {
    const token = this.getUrlParameter('token');
    const error = this.getUrlParameter('error');

    if (token) {
      localStorage.setItem(ACCESS_TOKEN, token);

      this.getUserDetails(token);

      return <Redirect to={{
        pathname: "/",
        state: {from: this.props.location}
      }}/>
    } else {
      return <Redirect to={{
        pathname: "/login",
        state: {from: this.props.location},
        error: error
      }}/>
    }
  }
}

export default OAuth2RedirectHandler