import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { Link, useParams } from "react-router-dom";
import { FETCH_FAIL, FETCH_REQUEST, FETCH_SUCCESS } from "./Dispatch";
import ReactLoading from "react-loading";
import Rating from "../components/Rating";
import { CART_ADD_ITEM } from "./ActionType";
import { Store } from "./Store";

const ProductScreen = () => {
  const { slug } = useParams();

  const reducer = (state, action) => {
    if (action.type === FETCH_REQUEST) {
      return { ...state, loading: true };
    } else if (action.type === FETCH_FAIL) {
      return { ...state, loading: false, error: action.payload };
    } else if (action.type === FETCH_SUCCESS) {
      return { ...state, loading: false, product: action.payload };
    }
    return state;
  };

  const initialState = {
    loading: true,
    error: "",
    product: [],
  };
  const [{ product, loading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: FETCH_REQUEST });
      try {
        const result = await axios.get(`/api/products/product/${slug}`);
        dispatch({ type: FETCH_SUCCESS, payload: result.data });
      } catch (error) {
        dispatch({ type: FETCH_FAIL, payload: error.message });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const addtoCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === x.product);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry, the product is out of stock");
      return;
    }
    ctxDispatch({
      type: CART_ADD_ITEM,
      payload: { ...product, quantity},
    });
  };
  return (
    <div>
      <Link to={"/"}>
        <i className="fa fa-arrow-left" aria-hidden="true"></i>
        <strong>Back home </strong>
      </Link>
      {loading ? (
        <div className="ratingContainer">
          <ReactLoading type={"spin"} color={"#000000"} />
        </div>
      ) : error ? (
        <div> {error} </div>
      ) : (
        <section>
          <div className="left">
            <img src={product.image} alt={product.name} className="img-large" />
          </div>
          <div className="center">
            <h1>{product.name}</h1>
            <div className="underline"></div>
            <div className="rating_product">
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </div>
            <p>
              <strong>$ {product.price} </strong>
            </p>
            <p> Desctiption : {product.description} </p>
          </div>
          <div className="right">
            <div className="container">
              <div className="row">
                <div className="col">
                  <span>Price :</span>
                </div>
                <div className="col">
                  <span> $ {product.price} </span>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <span>status :</span>
                </div>
                <div className="col">
                  <span>
                    {" "}
                    {product.countInStock > 0 ? (
                      <div className="succes"> Available </div>
                    ) : (
                      <div className="danger">Out Stock</div>
                    )}{" "}
                  </span>
                </div>
              </div>
              <div className="row">
                <button onClick={addtoCartHandler} className="btn btn-product">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductScreen;
