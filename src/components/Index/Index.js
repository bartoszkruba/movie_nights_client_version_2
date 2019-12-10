import React, {Component} from 'react';
import {ACCESS_TOKEN} from "../../constants/constants";
import axios from "../../axios/axios";


class Index extends Component {

  componentDidMount() {
    if (localStorage.getItem(ACCESS_TOKEN) && this.props.user !== null) this.checkIfLoggedIn()
  }

  async checkIfLoggedIn() {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      try {
        const response = await axios.getUser(token);
        if (this.props.user && this.props.user.id !== response.data.id)
          this.setUser(response.data);
      } catch (e) {
        localStorage.removeItem(ACCESS_TOKEN);
        this.props.setUser(null)
      }
    } else {
      this.props.setUser(null);
    }
  }

  render() {
    return <div className="row">
      <div className="col-12 m-auto">
        <h1 className="text-center">Welcome To Movie Nights!</h1>
      </div>
    </div>
  }

}

export default Index