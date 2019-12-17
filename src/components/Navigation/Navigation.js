import React, {Component, Fragment} from "react";
import {NavLink as RouterLink, Redirect} from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavbarToggler,
  NavItem,
} from "reactstrap";
import {ACCESS_TOKEN} from "../../constants/constants";


class Navigation extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      redirect: ""
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.redirect) this.setState({redirect: ""})
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  logout = () => {
    this.props.setUser(null);
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({redirect: "/"})
  };

  render() {

    if (this.state.redirect) return <Redirect to={this.state.redirect}/>;

    return (
      <div>
        <Navbar dark expand="md" className="navigation-bar">
          <RouterLink exact to="/">
            <span className="Nav-Item navigation-link p-3">
              <b>Movie Nights</b>
            </span>
          </RouterLink>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            </Nav>
          </Collapse>
          <NavbarToggler onClick={this.toggle}/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <RouterLink className="navigation-link p-3" exact to="/info">
                <NavItem>Info</NavItem>
              </RouterLink>
              {this.props.user && <Fragment>
                <RouterLink className="navigation-link p-3" exact to="/create-new-event">
                  <NavItem>Create New Event</NavItem>
                </RouterLink>
                {/*<RouterLink className="navigation-link p-3" exact to="/my-events">*/}
                {/*  <NavItem>My Events</NavItem>*/}
                {/*</RouterLink>*/}
                <RouterLink className="navigation-link p-3" exact to="/friends">
                  <NavItem>My Friends</NavItem>
                </RouterLink>
                <RouterLink className="navigation-link p-3" exact to="/movies">
                  <NavItem>Search For Movies</NavItem>
                </RouterLink>
                <div className="navigation-link p-3" onClick={this.logout}>
                  <span>Logout</span>
                </div>
              </Fragment>}
              {this.props.user == null && <Fragment>
                <RouterLink className="navigation-link p-3" exact to="/login">
                  <NavItem>Login</NavItem>
                </RouterLink>
              </Fragment>}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Navigation