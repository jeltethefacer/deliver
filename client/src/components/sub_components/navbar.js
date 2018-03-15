import React, { Component } from "react";
import { Menu, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { checkIfLoggedIn } from "../../actions";

class NavBar extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    let rightNavbar, leftNavBarExtended;
    if (this.props.loggedIn) {
      rightNavbar = (
        <Menu.Menu position="right">
          <Menu.Item as={Link} to="/logout">
            <Button negative>logout</Button>
          </Menu.Item>
        </Menu.Menu>
      );
      leftNavBarExtended = (
        <Menu.Item
          name="orders"
          as={Link}
          to="/orders"
          active={activeItem === "orders"}
          onClick={this.handleItemClick}
        />
      );
    } else {
      rightNavbar = (
        <Menu.Menu position="right">
          <Menu.Item as={Link} to="/login">
            <Button primary>Login</Button>
          </Menu.Item>
          <Menu.Item as={Link} to="/register">
            <Button>register</Button>
          </Menu.Item>
        </Menu.Menu>
      );
    }

    return (
      <Menu color="yellow" inverted>
        <Menu.Item
          as={Link}
          to="/"
          name="home"
          active={activeItem === "home"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={Link}
          to="/items"
          name="items"
          active={activeItem === "messages"}
          onClick={this.handleItemClick}
        />
        {leftNavBarExtended}
        {rightNavbar}
      </Menu>
    );
  }
}

const mapStateToProps = state => {
  return {
    front_name: state.user.front_name,
    loggedIn: state.user.loggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkIfLoggedIn: () => dispatch(checkIfLoggedIn())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
