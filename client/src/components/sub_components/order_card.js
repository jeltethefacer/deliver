import React, { Component } from "react";
import { UnmountClosed } from "react-collapse";

class OrderCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.makeItemsCards = this.makeItemsCards.bind(this);
  }

  makeItemsCards(items) {
    let returnValue = items.map(item => (
      <tr key={item.product_id}>
        <td>{this.getItemsName(this.props.items, item.product_id)}</td>
        <td>{item.amount}</td>
      </tr>
    ));
    return returnValue;
  }

  getItemsName(itemsList, id) {
    // eslint-disable-next-line
    var name = itemsList.map(item => {
      if (item.product_id === id) {
        return item.name;
      }
    });
    return name;
  }

  render() {
    const order = this.props.order.order;
    const index = this.props.index;
    const order_items = this.props.order.order_items;
    return (
      <div>
        <div
          onClick={e => {
            this.setState({ isOpen: !this.state.isOpen });
          }}
          className="row card"
        >
          <h6 className="cart-title">{index + 1}</h6>
          <div className="card-text col-md-4">
            bedrag: &#8364;{order.totalprice.toFixed(2)}
          </div>
          <div className="card-text col-md-4">code: {order.code}</div>
        </div>
        <UnmountClosed isOpened={this.state.isOpen}>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>{this.makeItemsCards(order_items)}</tbody>
          </table>
        </UnmountClosed>
      </div>
    );
  }
}

export default OrderCard;
