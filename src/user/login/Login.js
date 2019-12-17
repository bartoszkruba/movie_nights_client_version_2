import React, {Component} from 'react';
import {GOOGLE_AUTH_URL} from "../../constants/constants";
import {Redirect} from 'react-router-dom'

class Login extends Component {

  render() {
    if (this.props.authenticated) {
      return <Redirect
        to={{
          pathname: "/",
          state: {from: this.props.location}
        }}
      />
    }

    return <div className="row">
      <div className="col-12 m-auto">
        <h1 className="text-center mb-5">Login to Movie Nights</h1>
        <SocialLogin/>
      </div>
    </div>
  }

}

class SocialLogin extends Component {
  render() {
    return (
      <div className="m-auto col-4 text-center login-box pb-5 pt-5">
        <a href={GOOGLE_AUTH_URL} className="login-box-link p-5">
          <span className="text-center">Log in with Google</span>
        </a>
      </div>
    )
  }
}

export default Login