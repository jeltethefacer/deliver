import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import BasketCard from "./sub_components/basket";
import { Card, Row, Col } from "antd";
import { getItems, addItemBasket, checkIfLoggedIn } from "../actions";
import NavBar from "./sub_components/navbar";

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
      <Col span={8}>
        <Card key={items.product_id} title={items.name}>
          <p> &#8364; {items.price.toFixed(2)}</p>
          <p>{items.description}</p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={e =>
              this.props.addItemBasket(items.product_id, items.price, e)
            }
          >
            product toevoegen.
          </button>
        </Card>
      </Col>
    ));
    return returnValue;
  }
  render() {
    let itemsList = "Loading";
    let LoggedInMessage = <Link to="/login">Log in om te betalen</Link>;
    if (this.props.loggedIn) {
      LoggedInMessage = <Link to="/checkout">Betalen</Link>;
    }
    if (this.props.itemsStatus === 1) {
      itemsList = this.makeItemsCards(this.props.items);
    }

    return (
      <div>
        <NavBar />
        <Row gutter={16}>{itemsList}</Row>
        <div>
          <h2>winkelmandje: </h2>
          <BasketCard
            basketItems={this.props.basket}
            items={this.props.items}
          />
        </div>
        <div>totaal: &#8364;{this.props.totalBasketPrice.toFixed(2)}</div>
        {LoggedInMessage}
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
