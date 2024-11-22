import axios from "axios";
export const ADD_TO_CART = "ADD_TO_CART";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";
export const DELETE_FROM_CART = "DELETE_FROM_CART";
export const DELETE_ALL_FROM_CART = "DELETE_ALL_FROM_CART";

export const addToCart = (item, addToast, quantityCount = 1) => {
  return async (dispatch) => {
    try {
      // Make API call to the backend
      const response = await axios.post(
        "https://klinsept-backend.onrender.com/api/v1.0/cart/add/",
        {
          product_id: item.id,
          quantity: quantityCount,
        },
        {
          headers: {
            "x-api-key": "f6c52669-b6a9-4901-8558-5bc72b7e983a", // Replace with your actual API key
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(response.data);

      // Show success toast if provided
      if (addToast) {
        addToast(response.data.message, {
          appearance: "success",
          autoDismiss: true,
        });
      }

      // Dispatch the action to update the Redux store
      dispatch({
        type: ADD_TO_CART,
        payload: {
          ...item,
          quantity: quantityCount,
        },
      });
    } catch (error) {
      console.error("Add to cart error:", error);
      if (addToast) {
        addToast("Failed to add to cart", {
          appearance: "error",
          autoDismiss: true,
        });
      }
    }
  };
};
//decrease from cart
export const decreaseQuantity = (item, addToast) => {
  return (dispatch) => {
    if (addToast) {
      addToast("Item Decremented From Cart", {
        appearance: "warning",
        autoDismiss: true,
      });
    }
    dispatch({ type: DECREASE_QUANTITY, payload: item });
  };
};
//delete from cart
export const deleteFromCart = (itemId, addToast) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `https://klinsept-backend.onrender.com/api/v1.0/cart/remove${itemId}`,
        {
          headers: {
            "x-api-key": "f6c52669-b6a9-4901-8558-5bc72b7e983a", // Replace with your actual API key
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        if (addToast) {
          addToast("Removed From Cart", {
            appearance: "error",
            autoDismiss: true,
          });
        }
        dispatch({ type: DELETE_FROM_CART, payload: itemId });
      }
    } catch (error) {
      if (addToast) {
        addToast("Failed to Remove Item from Cart", {
          appearance: "error",
          autoDismiss: true,
        });
      }
      console.error(
        "Error removing item from cart:",
        error.response?.data || error.message
      );
    }
  };
};

//delete all from cart
export const deleteAllFromCart = (addToast) => {
  return (dispatch) => {
    if (addToast) {
      addToast("Removed All From Cart", {
        appearance: "error",
        autoDismiss: true,
      });
    }
    dispatch({ type: DELETE_ALL_FROM_CART });
  };
};

// get stock of cart item
export const cartItemStock = (item) => {
  if (item.stock) {
    return item.stock;
  }
};
