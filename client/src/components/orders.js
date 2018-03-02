import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import OrderCard from "./sub_components/order_card";
import { getOrders, checkIfLoggedIn, getItems } from "../actions";

class Orders extends Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    this.props.checkIfLoggedIn();
    this.props.getItems();
    this.props.getOrders(this.props.user_id);
  }

  render() {
    if (!this.props.loggedIn) {
      return <Redirect to="/" />;
    }
    console.log("hallo", this.props.items);
    let orderList = this.props.orders.map((order, index) => {
      return (
        <OrderCard
          order={order}
          index={index}
          items={this.props.items}
          key={order.order.order_id}
        />
      );
    });
    return <div>{orderList}</div>;
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.user.loggedIn,
    user_id: state.user.user_id,
    orders: state.orders.orders,
    items: state.items.items
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkIfLoggedIn: () => dispatch(checkIfLoggedIn()),
    getOrders: user_id => dispatch(getOrders(user_id)),
    getItems: () => dispatch(getItems())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
