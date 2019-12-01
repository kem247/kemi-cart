const axios = require("axios");

const SINGLE_PRODUCT = "SINGLE_PRODUCT";

const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const setSingleProduct = product => ({
  type: SINGLE_PRODUCT,
  product
});
export const updateProduct = (productId, product) => ({
  type: UPDATE_PRODUCT,
  productId,
  product
});

export const fetchProduct = productId => async dispatch => {
  try {
    const { data: product } = await axios.put(`/api/products/${productId}`);

    dispatch(setSingleProduct(product));
  } catch (err) {
    console.log("There's an error with fetchProduct!");
  }
};

export const updateProduct = (productId, product) => async dispatch => {
  try {
    const { data } = await axios.put(`/api/products/${productId}`, product);
    dispatch(fetchProducts(productId));
    dispatch(updateProduct(productId, data));
  } catch (err) {
    console.log("There's an error with updateProducts on singleProduct!");
  }
};

export const fetchProduct = productId => async dispatch => {
  try {
    const { data: product } = await axios.get(`/api/products/${productId}`);

    dispatch(setSingleProduct(product));
  } catch (err) {
    console.log("There's an error with fetchProduct!");
  }
};

const singleProductReducer = (state = {}, action) => {
  switch (action.type) {
    case SINGLE_PRODUCT:
      return action.product;
    case UPDATE_PRODUCT:
      return { ...state, product: action.product };
    default:
      return state;
  }
};

export default singleProductReducer;
