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
      <a href={GOOGLE_AUTH_URL}>
        <div className="m-auto col-4 text-center p-5 login-box">
          <span className="text-center">Log in with Google</span>
        </div>
      </a>
    )
  }
}

export default Login