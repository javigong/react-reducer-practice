import React, { useReducer, useState } from "react";

import MenuItemChooser from "./MenuItemChooser.js";
import Order from "./Order.js";
import OrderItemModifier from "./OrderItemModifier.js";

// TODO: create reducer function for order state

const initialOrder = [{}];

const orderReducer = (order, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      let clonedOrder = [...order];
      const index = order.findIndex((item) => item.id === action.payload.id);
      if (index > -1) {
        clonedOrder[index].quantity++;

        return [...clonedOrder];
      } else {
        return [
          ...clonedOrder,
          {
            id: action.payload.id,
            name: action.payload.name,
            price: action.payload.price,
            quantity: 1,
          },
        ];
      }
    }
    case "REMOVE_ITEM": {
      let clonedOrder = [...order];
      const index = order.findIndex((item) => item.id === action.payload.id);
      // delete item
      clonedOrder.splice(index, 1);

      return [...clonedOrder];
    }
    case "MODIFY_ITEM": {
      let clonedOrder = [...order];
      const index = order.findIndex((item) => item.id === action.payload.id);
      // modify item
      clonedOrder[index].quantity = action.payload.quantity;
      return [...clonedOrder];
    }
    default: {
      return order;
    }
  }
};

const App = (props) => {
  // TODO: set up order state using useReducer hook and keep track of whether an order item is being modified

  const [order, dispatch] = useReducer(orderReducer, initialOrder);

  const handleAddToOrder = (event, item) => {
    // TODO: add item to order (increment quantity if it already exists in order)

    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: item.id,
        name: item.name,
        price: item.price,
      },
    });
  };

  const handleRemoveFromOrder = (event, orderItemId) => {
    // TODO: remove item from order

    dispatch({
      type: "REMOVE_ITEM",
      payload: {
        id: orderItemId.id,
      },
    });
  };

  const [modal, setModal] = useState(false);
  const [orderItemId, setOrderItemId] = useState("");

  const handleModifyOrderItem = (event, orderItemId) => {
    // TODO: register that an order item is being modified
    setModal(true);
    setOrderItemId(orderItemId);
  };

  const handleSubmitModification = (event, newQuantity) => {
    // TODO: once the new quantity of the order item has been chosen, update the order
    event.preventDefault();
    setModal(false);
    dispatch({
      type: "MODIFY_ITEM",
      payload: {
        id: newQuantity.id,
        quantity: event.target.quantity.value,
      },
    });
  };

  return (
    <div className="app">
      <h1>Sushi Delivery</h1>
      <MenuItemChooser handleAddToOrder={handleAddToOrder} />

      {/* TODO: the order state being passed to this component has not yet been initialized; do this before uncommenting the line below */}
      <Order
        order={order}
        handleRemoveFromOrder={handleRemoveFromOrder}
        handleModifyOrderItem={handleModifyOrderItem}
      />

      {modal && (
        <OrderItemModifier
          className="modal"
          orderItemId={orderItemId}
          handleSubmitModification={handleSubmitModification}
        />
      )}
    </div>
  );
};

export default App;
