const axios = require("axios");

const SET_CART = "SET_CART";

const ADD_CART = "ADD_CART ";

const REMOVE_CART = "REMOVE_CART";

export const setCart = carts => ({
  type: SET_CART,
  cart
});

export const newCart = cart => ({
  type: ADD_CART,
  cart
});

export const removeCart = cartId => ({
  type: REMOVE_CART,
  cartId
});
export const fetchCart = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get("/api/cart");
      dispatch(setCart(data));
    } catch (err) {
      console.log("There's an error with fetchCart!");
    }
  };
};
export const deleteCart = cartId => {
  return async dispatch => {
    try {
      const { data: cart } = await axios.delete(`/api/cart/${cartId}`);
      dispatch(setCart(cart));
    } catch (err) {
      console.log("There's an error with deleteCart!");
    }
  };
};

export const deleteCart = cartId => dispatch => {
  try {
    dispatch(deleteCart(cartId));
    dispatch(removeCart(cartId));
  } catch (err) {
    console.log("There's an error with deleteCartes");
  }
};
export const submitCart = cart => async dispatch => {
  try {
    const response = await axios.post("/api/cart", cart);
    dispatch(newCart(response.data));
  } catch (err) {
    console.log("There's an error with submitCart!");
  }
};

const cartReducer = (state = [], action) => {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    case ADD_CART:
      return [...state, action.cart];
    case REMOVE_CART:
      return state.filter(cart => cart.id !== action.cartId);
    default:
      return state;
  }
};

export default cartReducer;
