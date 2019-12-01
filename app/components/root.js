import React from "react";
import Cart from "./Cart";
import Product from "./Product";
import SingleProduct from "./SingleProduct";
import SingleCart from "./SingleCart";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCart } from "../redux/cart";
import { fetchProduct } from "../redux/products";

class Root extends React.Component {
  componentDidMount() {
    this.props.fetchInitialCart();
    this.props.fetchIntitalProduct();
  }
  render() {
    console.log("root", this.props);
    return (
      <Container>
        <Router>
          <div>
            <nav>
              Welcome!
              <div style={{ margin: 302 }} />
              <Link to="/cart">Cart</Link>
              <div style={{ margin: 7 }} />
              <Link to="/product">Product</Link>
            </nav>
            <div style={{ marginBottom: 20 }} />
            <main>
              <Route exact path="/cart" component={Cart} />
              {/* <Route exact path="/cart/:cartId" component={SingleCart} /> */}
              <Route exact path="/products" component={Product} />
              <Route path="*" component={NotFound} />
              {/* <Route
exact
path="/products/:productId"
component={SingleProduct}
/> */}
            </main>
          </div>
        </Router>
      </Container>
    );
  }
}
const mapState = state => {
  return {
    carts: state.cart,
    products: state.products
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchIntialProduct: () => dispatch(fetchProduct()),
    fetchInitalCart: () => dispatch(fetchCart())
  };
};
export default connect(
  mapState,
  mapDispatchToProps
)(Root);
