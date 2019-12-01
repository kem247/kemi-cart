import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { fetchCart, deleteCart, deleteCart } from "../redux/cart";
// import NewCampus from "./NewCampus";
export class Cart extends React.Component {
  componentDidMount() {
    if (this.props.data) {
      this.props.data();
    } else {
      return "Please create a cart";
    }
  }

  render() {
    const carts = this.props;
    console.log("CART2", carts);
    const productId = this.props.match ? this.props.match.params.productId : "";

    return (
      <div>
        <header>Cart</header>

        {carts.map(cart => (
          <div key={cart.id} id={studentId}>
            <Link to={`/cart/${cart.id}`}>
              <img src={cart.imageUrl} style={{ px: 100 }} />
            </Link>
            <p>
              <a>{cart.title}</a>

              <div />
              <small> {cart.name}</small>
              <div />
              <button
                type="submit"
                onClick={() => this.props.deleteCart(cart.id)}
              >
                X
              </button>
            </p>
            <small />
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { carts: state.carts };
};
const mapDispatchToProps = dispatch => {
  return {
    data: () => dispatch(fetchCarts()),
    datas: cartId => dispatch(deleteCart(cartId)),
    deleteCart: cartId => dispatch(deleteCart(cartId))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Cart)
);
