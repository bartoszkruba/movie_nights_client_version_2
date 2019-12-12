import React, {Component} from 'react'
import {Redirect} from "react-router-dom";
import axios from "../../axios/axios";
import {ACCESS_TOKEN} from "../../constants/constants";
import {Alert, Button, Col, Input, Label} from "reactstrap";

class FriendsPage extends Component {

  state = {
    redirect: "",
    friends: [],
    createdFriendRequests: [],
    pendingFriendRequests: [],
    email: "",
    error: ""
  };

  componentDidMount() {
    this.getFriends();
    this.getCreatedFriendRequests();
    this.getPendingFriendRequests()
  }

  sendFriendRequest = async () => {
    this.setState({error: ""});
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      this.setState({redirect: "/"});
      return
    }

    try {
      await axios.sendFriendRequest(token, this.state.email);
      this.setState({email: ""});
      this.getCreatedFriendRequests()
    } catch (e) {
      console.log(e.response);
      if (e.response.status === 401 || e.response.status === 403) {
        this.setState({redirect: "/"});
      } else {
        this.setState({error: e.response.data.error});
        console.log(e.response.data.error);
      }
    }
  };

  handleChange = e => {
    const state = {...this.state};
    state[e.target.name] = e.target.value.replace(new RegExp(" ", 'g'), "").trim();
    this.setState(state)
  };

  getFriends = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      this.setState({redirect: "/"});
      return
    }

    try {
      const response = await axios.getFriends(token);
      this.setState({friends: response.data})
    } catch (e) {
      this.setState({redirect: "/"});
    }
  };

  getCreatedFriendRequests = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      this.setState({redirect: "/"});
      return
    }
    try {
      const response = await axios.getCreatedFriendRequests(token);
      this.setState({createdFriendRequests: response.data})
    } catch (e) {
      this.setState({redirect: "/"})
    }
  };

  getPendingFriendRequests = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      this.setState({redirect: "/"})
      return
    }
    try {
      const response = await axios.getPendingFriendRequests(token);
      this.setState({pendingFriendRequests: response.data})
    } catch (e) {
      this.setState({redirect: "/"})
    }
  };

  removeFriend = async (id) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      this.setState({redirect: "/"});
      return
    }
    try {
      await axios.removeFriend(token, id);
      this.getCreatedFriendRequests();
      this.getPendingFriendRequests();
      this.getFriends();
    } catch (e) {
      this.setState({redirect: "/"})
    }
  };

  renderFriends = () => {
    return this.state.friends.map(friend => <div className="row" key={friend.id}>
      <div className="col-6">
        <p>{friend.name}, {friend.email}</p>
      </div>
      <div className="col-6 text-right">
        <Button color="danger" size="sm" onClick={() => this.removeFriend(friend.id)}>Delete</Button>
      </div>
    </div>)
  };

  acceptFriendRequest = async (id) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      this.setState({redirect: "/"})
    }
    try {
      await axios.acceptFriendRequest(token, id);
      this.getCreatedFriendRequests();
      this.getPendingFriendRequests();
      this.getFriends();
    } catch (e) {
      this.setState({redirect: "/"})
    }
  };

  discardFriendRequest = async (id) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      this.setState({redirect: "/"})
    }
    try {
      await axios.discardFriendRequest(token, id);
      this.getCreatedFriendRequests();
      this.getPendingFriendRequests();
      this.getFriends();
    } catch (e) {
      this.setState({redirect: "/"})
    }
  };

  renderCreatedRequests = () => {
    return this.state.createdFriendRequests.map(request => <div className="row p-2" key={request.id}>
      <div className="col-6">
        {request.receiverEmail}, {request.receiverName}
      </div>
      <div className="col-6 text-right">
        <Button color="danger" size="sm" onClick={() => this.discardFriendRequest(request.id)}>Cancel</Button>
      </div>
    </div>);
  };

  renderPendingRequests = () => {
    return this.state.pendingFriendRequests.map(request => <div className="row p-2" key={request.id}>
      <div className="col-6">
        {request.senderEmail}, {request.senderName}
      </div>
      <div className="col-6 text-right">
        <Button color="danger" size="sm" onClick={() => this.discardFriendRequest(request.id)}>Discard</Button>
        <Button color="success" size="sm" className="ml-2"
                onClick={() => this.acceptFriendRequest(request.id)}>Accept</Button>
      </div>
    </div>);
  };

  render() {
    if (this.state.redirect) return <Redirect to={this.state.redirect}/>;

    return <div>
      <div className="row mt-4">
        <div className="col-12">
          <h2 className="m-auto text-center">Add Friend</h2>
        </div>
      </div>
      {this.state.error && <div className="row mt-4">
        <div className="col-12">
          <Alert color="danger">
            {this.state.error}
          </Alert>
        </div>
      </div>}
      <div className="row mt-4">
        <Label sm={1}>Email:</Label>
        <Col sm={9}>
          <Input name="email" type="email" placeholder="Email" value={this.state.email} onChange={this.handleChange}/>
        </Col>
        <Col sm={2}><Button color="primary" onClick={this.sendFriendRequest}>Send Request</Button></Col>
      </div>
      {this.state.friends.length > 0 && <div>
        <hr className="mt-5"/>
        <div className="row mt-5">
          <div className="col-12">
            <h2 className="m-auto text-center">My Friends</h2>
          </div>
        </div>
      </div>}
      {this.renderFriends()}
      {(this.state.pendingFriendRequests.length > 0 || this.state.createdFriendRequests.length > 0) &&
      <div>
        <hr/>
        <div className="row mt-4">
          <div className="col-12">
            <h2 className="m-auto text-center">Friend Requests</h2>
          </div>
        </div>
        {this.state.createdFriendRequests.length > 0 && <div className="row mt-3">
          <div className="col-12">
            <h3>Created</h3>
          </div>
        </div>}
        {this.renderCreatedRequests()}
        {this.state.pendingFriendRequests.length > 0 && <div className="row mt-3">
          <div className="col-12">
            <h3>Pending</h3>
          </div>
        </div>}
        {this.renderPendingRequests()}
      </div>}
    </div>
  }
}

export default FriendsPage