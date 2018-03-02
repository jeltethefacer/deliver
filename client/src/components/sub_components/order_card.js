import React from "react";

function orderCards(props) {
  let returnValue;
  const orders = props.orders;

  returnValue = orders.map((order, index) => (
    <div className="row card" key={order.order_id}>
      <h6 className="cart-title">{index}</h6>
      <div className="card-text col-md-4">
        bedrag: &#8364;{order.totalprice.toFixed(2)}
      </div>
      <div className="card-text col-md-4">code: {order.code}</div>
    </div>
  ));
  return returnValue;
}

export default orderCards;
