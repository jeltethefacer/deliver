import React from "react";

//this function work only if the list has a product_id and a name propertie
function getNameById(itemsList, id) {
  // eslint-disable-next-line
  var name = itemsList.map(item => {
    if (item.product_id === id) {
      return item.name;
    }
  });
  return name;
}

function BasketCard(props) {
  let returnValue;
  const basketItems = props.basketItems;

  returnValue = basketItems.map(basketItem => (
    <div className="row card" key={basketItem.id}>
      <h4 className="card-text col-md-4">
        {getNameById(props.items, basketItem.id)}
      </h4>
      <div className="card-text col-md-4">{basketItem.amount}</div>
    </div>
  ));
  return returnValue;
}

export default BasketCard;
