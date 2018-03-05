import React from "react";
import { Row, Col, Card } from "antd";

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
    <Row key={basketItem.id}>
      <Col span={12}>
        <h4>{getNameById(props.items, basketItem.id)}</h4>
      </Col>
      <Row span={12} className="card-text col-md-4">
        {basketItem.amount}
      </Row>
    </Row>
  ));

  return <Card title="winkelwagentje">{returnValue}</Card>;
}

export default BasketCard;
