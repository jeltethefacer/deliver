import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import OrderCards from "./sub_components/order_card";
import { getOrders, checkIfLoggedIn } from "../actions";

class Orders extends Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    this.props.checkIfLoggedIn();
    this.props.getOrders(this.props.user_id);
  }

  render() {
    if (!this.props.loggedIn) {
      return <Redirect to="/" />;
    }
    console.log(this.props.orders);
    return (
      <div>
        <OrderCards orders={this.props.orders} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.user.loggedIn,
    user_id: state.user.user_id,
    orders: state.orders.orders
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkIfLoggedIn: () => dispatch(checkIfLoggedIn()),
    getOrders: user_id => dispatch(getOrders(user_id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
