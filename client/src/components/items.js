import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import BasketCard from "./sub_components/basket";
import { getItems, addItemBasket, checkIfLoggedIn } from "../actions";

class Items extends Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    this.props.getItems();
    this.props.checkIfLoggedIn();
  }

  makeItemsCards(itemsList) {
    let returnValue = itemsList.map(items => (
      <div className="card col-md-4" key={items.product_id}>
        <h4 className="card-title">{items.name}</h4>
        <p> &#8364; {items.price.toFixed(2)}</p>
        <p className="card-text">{items.description}</p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={e =>
            this.props.addItemBasket(items.product_id, items.price, e)
          }
        >
          product toevoegen.
        </button>
      </div>
    ));
    return returnValue;
  }
  render() {
    let itemsList = "Loading";
    if (!this.props.loggedIn) {
      return <Redirect to="/" />;
    }
    if (this.props.itemsStatus === 1) {
      itemsList = this.makeItemsCards(this.props.items);
    }

    return (
      <div>
        <div className="row">{itemsList}</div>
        <div>
          <h2>winkelmandje: </h2>
          <BasketCard
            basketItems={this.props.basket}
            items={this.props.items}
          />
        </div>
        <div>totaal: &#8364;{this.props.totalBasketPrice.toFixed(2)}</div>
        <Link to="/checkout">Betalen</Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.user.loggedIn,
    itemsStatus: state.items.itemsStatus,
    items: state.items.items,
    basket: state.basket.items,
    totalBasketPrice: state.basket.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkIfLoggedIn: () => dispatch(checkIfLoggedIn()),
    getItems: () => dispatch(getItems()),
    addItemBasket: (id, price) => dispatch(addItemBasket(id, price))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Items);
