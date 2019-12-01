const axios = require("axios");

const SET_PRODUCTS = "SET_PRODUCTS";

const ADD_PRODUCT = "ADD_PRODUCT";

const REMOVE_PRODUCT = "REMOVE_PRODUCT";

export const setProducts = products => ({
  type: SET_PRODUCTS,
  products
});

export const newProduct = product => ({
  type: ADD_PRODUCT,
  product
});

export const removeProduct = productId => ({
  type: REMOVE_PRODUCT,
  productId
});

export const fetchProduct = productId => async dispatch => {
  try {
    const { data: products } = await axios.delete(`/api/products/${productId}`);

    dispatch(setProducts(products));
  } catch (err) {
    console.log("There's an error with fetchProduct!");
  }
};

export const deleteProducts = productId => dispatch => {
  try {
    dispatch(fetchProduct(productId));
    dispatch(removeProduct(productId));
  } catch (err) {
    console.log("There's an error with deleteProducts");
  }
};

export const fetchProducts = () => async dispatch => {
  try {
    const { data } = await axios.get("/api/products");

    dispatch(setProducts(data));
  } catch (err) {
    console.log("There's an error with fetchProducts!");
  }
};

export const submitProducts = product => async dispatch => {
  try {
    const response = await axios.post("/api/products", product);
    dispatch(newProduct(response.data));
  } catch (err) {
    console.log("There's an error with submitProducts");
  }
};

const productsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_PRDOUCTS:
      return action.products;
    case ADD_PRODUCT:
      return [...state, action.product];
    case REMOVE_PRODUCT: {
      return state.filter(product => product.id !== action.productId);
    }
    default:
      return state;
  }
};

export default productsReducer;
