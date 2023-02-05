import axios from "axios";
import { useEffect, useReducer } from "react";
import { Link, useParams } from "react-router-dom";
import { FETCH_FAIL, FETCH_REQUEST, FETCH_SUCCESS } from "./Dispatch";
import ReactLoading from "react-loading";
import Rating from "../components/Rating";

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
  const [state, dispatch] = useReducer(reducer, initialState);
  const { product, loading, error } = state;
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

  return (
    <div>
      <Link to={"/"}>
        <i class="fa fa-arrow-left" aria-hidden="true"></i>
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
                  <span> {product.countInStock > 0 ? <div className="succes"> Available </div> : <div className="danger">Out Stock</div> } </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductScreen;
