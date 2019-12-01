const axios = require("axios");

const SINGLE_CART = "SINGLE_CART";

const UPDATE_CART = "UPDATE_CART";

const DELETE_CART = "DELETE_CART";

export const setSingleCart = cart => ({
  type: SINGLE_CART,
  cart
});
export const updateCart = (cartId, cart) => ({
  type: UPDATE_CART,
  cartId,
  cart
});

export const removeCart = cartId => ({
  type: DELETE_CART,

  cartId
});

export const fetchCarts = cartId => async dispatch => {
  try {
    const { data: carts } = await axios.put(`/api/cart/${cartId}`);
    dispatch(setSingleCart(carts));
  } catch (err) {
    console.log("There's an error with fetchCarts on singleCart!");
  }
};

export const fetchCart = cartId => async dispatch => {
  try {
    const cartPath = `/api/cart/${cartId}`;
    const responses = await Promise.all([
      axios.get(cartPath),
      axios.get(`${cartPath}/products`)
    ]);
    const [cart, products] = responses.map(res => res.data);
    cart.products = products;
    dispatch(setSingleCart(cart));
  } catch (err) {
    console.log("There's an error with fetchCart on singleCart!");
  }
};

export const updateCart = (cartId, cart) => async dispatch => {
  try {
    const { data } = await axios.put(`/api/cart/${cartId}`, cart);

    dispatch(updateCart(cartId, data));
  } catch (err) {
    console.log("There's an error with updateCart on singleCart!");
  }
};

export const deleteCart = productId => {
  return async dispatch => {
    try {
      const { data: cart } = await axios.delete(`/api/cart/${productId}`);
      dispatch(setSingleCart(cart));
    } catch (err) {
      console.log("There's an error with deleteCart!");
    }
  };
};

export const deleteCart = productId => dispatch => {
  try {
    dispatch(removeCart(productId));
  } catch (err) {
    console.log("There's an error with deleteCart on singleCart!");
  }
};
const singleCartReducer = (state = {}, action) => {
  switch (action.type) {
    case SINGLE_CART:
      return action.cart;
    case UPDATE_CART:
      return { ...state, cart: action.cart, product: action.productId };
    case DELETE_CART:
      return {
        ...state,
        products: state.products.filter(
          product => product.id !== product.productId
        )
      };
    default:
      return state;
  }
};

export default singleCartReducer;
