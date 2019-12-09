import React, {Component, Fragment} from "react";
import {NavLink as RouterLink} from "react-router-dom";
import {
  NavLink,
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
      isOpen: false
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  logout = () => {
    this.props.setUser(null);
    localStorage.removeItem(ACCESS_TOKEN);

    this.props.redirect("/")
  };

  render() {

    // return <p>navbar</p>

    return (
      <div>
        <Navbar light expand="md">
          <RouterLink exact to="/">
            <span className="Nav-Item">
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
              {this.props.user && <Fragment>
                <RouterLink exact to="/movies">
                  <NavItem>Search For Movies</NavItem>
                </RouterLink>
                <div onClick={this.logout}>
                  <span>Logout</span>
                </div>
              </Fragment>}
              {this.props.user == null && <Fragment>
                <RouterLink exact to="/login">
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