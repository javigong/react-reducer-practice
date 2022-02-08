import React from "react";

const OrderItemModifier = (props) => {
  // TODO: keep track of quantity change

  return (
    <div className="order-item-modifier">
      {/* TODO: show order item details and allow the quantity to be changed */}
      <div className="modal">
        <form
          onSubmit={(event) =>
            props.handleSubmitModification(event, props.orderItemId)
          }
        >
          <h2>Modify this Item</h2>
          <p>{props.orderItemId.name}</p>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            placeholder="1"
            min="1"
          />
          <button>Done</button>
        </form>
      </div>
    </div>
  );
};

export default OrderItemModifier;
