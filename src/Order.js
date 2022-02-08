import React from "react";

const Order = (props) => {
  const arrayOfPrices = [];

  props.order.map((item) => {
    arrayOfPrices.push(
      (item.price ? item.price : 0) * (item.quantity ? item.quantity : 0)
    );
  });

  const reducer = (previousValue, currentValue) => previousValue + currentValue;

  const totalPrice = arrayOfPrices.reduce(reducer);

  const totalPriceRounded = Number(Math.round(totalPrice + "e2") + "e-2");

  return (
    <div className="order">
      <h2>Your Order</h2>
      {/* TODO: list items that have been added to the order, with the total price, allow an item to be removed or modified */}
      <ul>
        {props.order.map(
          (item) =>
            item.id && (
              <li key={item.id}>
                <h3>{item.name}</h3>
                <div>{`$${item.price}`}</div>
                <div>{`Quantity: ${item.quantity}`}</div>
                <button
                  onClick={(event) => props.handleRemoveFromOrder(event, item)}
                >
                  Remove Item
                </button>
                <button
                  onClick={(event) => props.handleModifyOrderItem(event, item)}
                >
                  Modify Item
                </button>
              </li>
            )
        )}
      </ul>
      <h3>Total:</h3>
      <p>{totalPriceRounded > 1 && `$${totalPriceRounded}`}</p>
    </div>
  );
};

export default Order;
