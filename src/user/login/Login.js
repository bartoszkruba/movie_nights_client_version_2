import React, {Component} from 'react';
import {GOOGLE_AUTH_URL, ACCESS_TOKEN} from "../../constants/constants";
import {Link, Redirect} from 'react-router-dom'

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

    return <div>
      <h1>Login to Movie Nights</h1>
      <SocialLogin/>
    </div>
  }

}

class SocialLogin extends Component {
  render() {
    return (
      <div>
        <a href={GOOGLE_AUTH_URL}>Log in with Google</a>
      </div>
    )
  }
}

export default Login