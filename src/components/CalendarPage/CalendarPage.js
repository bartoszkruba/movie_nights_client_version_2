import React, {Component} from 'react';
import {Button} from "reactstrap";
import {ACCESS_TOKEN} from "../../constants/constants";
import axios from "../../axios/axios";

class MyEventsPage extends Component {

  render() {
    return <div>
      <div className="row">
        <div className="col-12">
          <h1>You Upcoming Movie Watching Events</h1>
        </div>
      </div>
    </div>
  }
}

export default MyEventsPage