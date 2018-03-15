import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import BasketCard from "./sub_components/basket";
import { Card, Button, Icon, Image } from "semantic-ui-react";
import {
  getItems,
  addItemBasket,
  checkIfLoggedIn,
  changePage
} from "../actions";
import NavBar from "./sub_components/navbar";

class Items extends Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    this.props.changePage("/items");
    this.props.getItems();
    this.props.checkIfLoggedIn();
  }

  makeItemsCards(itemsList) {
    let returnValue = itemsList.map(items => (
      <Card key={items.product_id}>
        <Image
          src={"/product_pics/" + items.product_id + ".png"}
          alt={"/product_pics/" + items.product_id + ".jpg"}
          heigth={100}
        />
        <Card.Content>
          <Card.Header>{items.name}</Card.Header>
          <Card.Meta>
            <span className="date">&#8364; {items.price.toFixed(2)}</span>
          </Card.Meta>
          <Card.Description className="cardDescription">
            {items.description}
          </Card.Description>
        </Card.Content>
        <Button
          primary
          className="addToBasket"
          onClick={e =>
            this.props.addItemBasket(items.product_id, items.price, e)
          }
        >
          <Icon name="shopping basket" />
          product toevoegen.
        </Button>
      </Card>
    ));
    return returnValue;
  }
  render() {
    if (this.props.loginStatus === 3) {
      return <div>loading</div>;
    }

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
        <Card.Group>{itemsList}</Card.Group>
        <div className="basket">
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
    loginStatus: state.user.loginStatus,
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
    addItemBasket: (id, price) => dispatch(addItemBasket(id, price)),
    changePage: page => dispatch(changePage(page))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Items);
