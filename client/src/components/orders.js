import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import OrderCard from "./sub_components/order_card";
import { getOrders, checkIfLoggedIn, getItems, changePage } from "../actions";
import NavBar from "./sub_components/navbar";

class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_call: true
    };
  }
  componentDidMount() {
    this.props.changePage("/orders");
    this.props.checkIfLoggedIn();
    this.props.getItems();
  }

  render() {
    if (this.props.loginStatus === 3) {
      return <div>loading</div>;
    }
    if (!this.props.loggedIn) {
      return <Redirect to="/" />;
    }
    if (this.state.first_call) {
      this.props.getOrders(this.props.user_id);
      this.setState({ first_call: false });
    }

    let orderList = this.props.orders.map((order, index) => {
      return (
        <div key={order.order.order_id}>
          <OrderCard order={order} index={index} items={this.props.items} />
        </div>
      );
    });
    return (
      <div>
        <NavBar />
        {orderList}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.user.loggedIn,
    loginStatus: state.user.loginStatus,
    user_id: state.user.user_id,
    orders: state.orders.orders,
    items: state.items.items
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkIfLoggedIn: () => dispatch(checkIfLoggedIn()),
    getOrders: user_id => dispatch(getOrders(user_id)),
    getItems: () => dispatch(getItems()),
    changePage: page => dispatch(changePage(page))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
