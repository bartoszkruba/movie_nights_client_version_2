import React, {Component, Fragment} from "react";
import {NavLink as RouterLink} from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavbarToggler,
  NavItem,
} from "reactstrap";


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
    this.props.redirect("/")
  };

  render() {

    return (
      <div>
        <Navbar color="light" light expand="md">
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
              {this.props.user && <Fragment>
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