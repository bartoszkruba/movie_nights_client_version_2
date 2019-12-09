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

    return <div className="row">
      <div className="col-12 m-auto">
        <h1 className="text-center">Login to Movie Nights</h1>
        <SocialLogin/>
      </div>
    </div>
  }

}

class SocialLogin extends Component {
  render() {
    return (
      <span className="m-auto text-center">
        <a className="text-center" href={GOOGLE_AUTH_URL}>Log in with Google</a>
      </span>
    )
  }
}

export default Login