import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import BasketCard from "./sub_components/basket";
import { getItems, getIssuers, createOrder, checkIfLoggedIn } from "../actions";

class Items extends Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    this.props.getItems();
    this.props.checkIfLoggedIn();
    this.props.getIssuers();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  issuerOptions(issuerList) {
    let returnValue = issuerList.map(issuer => {
      return (
        <option key={issuer.id} value={issuer.id}>
          {issuer.name}
        </option>
      );
    });
    return <select name="issuersSelect">{returnValue}</select>;
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(event.target.issuersSelect.value);
    this.props.createOrder(
      this.props.totalBasketPrice,
      event.target.issuersSelect.value
    );
  }

  render() {
    if (!this.props.loggedIn) {
      return <Redirect to="/" />;
    }
    let issuerOptions;
    if (this.props.issuers) {
      issuerOptions = this.issuerOptions(this.props.issuers);
    }
    if (this.props.orderStatus === 1) {
      console.log(this.props.order.links.paymentUrl);
      window.location = this.props.order.links.paymentUrl;
    }
    return (
      <div>
        <div>
          <h2>winkelmandje: </h2>
          <BasketCard
            basketItems={this.props.basket}
            items={this.props.items}
          />
        </div>
        <div>totaal: &#8364;{this.props.totalBasketPrice.toFixed(2)}</div>
        <form onSubmit={this.handleSubmit}>
          {issuerOptions}
          <br />
          <button type="submit"> Betalen</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.user.loggedIn,
    itemsStatus: state.items.itemsStatus,
    orderStatus: state.checkout.orderStatus,
    items: state.items.items,
    basket: state.basket.items,
    totalBasketPrice: state.basket.totalPrice,
    issuers: state.checkout.issuers,
    order: state.checkout.order
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkIfLoggedIn: () => dispatch(checkIfLoggedIn()),
    getItems: () => dispatch(getItems()),
    getIssuers: () => dispatch(getIssuers()),
    createOrder: (amount, issuer) => dispatch(createOrder(amount, issuer))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Items);
