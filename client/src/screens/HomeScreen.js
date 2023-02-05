import React, { useEffect, useReducer } from "react";
import { FETCH_FAIL, FETCH_REQUEST, FETCH_SUCCESS } from "./Dispatch";
import logger from "use-reducer-logger";
import ReactLoading from "react-loading";
import axios from "axios";
import Product from "../components/Product";

const reducer = (state, action) => {
  if (action.type === FETCH_REQUEST) {
    return { ...state, loading: true };
  } else if (action.type === FETCH_FAIL) {
    return { ...state, loading: false, error: action.payload };
  } else if (action.type === FETCH_SUCCESS) {
    return { ...state, loading: false, products: action.payload };
  }
  return state;
};

// console.log(axios.get('/api/products/:slug').then((data)=> console.log(data)).catch(err=> console.log(err)));

export default function HomeScreen() {
  const initialState = {
    loading: true,
    error: "",
    products: [],
  };
  const [state, dispatch] = useReducer(logger(reducer), initialState);
  const { products, loading, error } = state;
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: FETCH_REQUEST });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: FETCH_SUCCESS, payload: result.data });
      } catch (error) {
        dispatch({ type: FETCH_FAIL, payload: error.message });
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Featured</h1>
      <div className="products">
        {loading ? (
          <div>
            <ReactLoading type={"spin"} color={"#000000"} />
          </div>
        ) : error ? (
          <div>{error}</div> 
        ) : (
          <>
            {products.map((product) => (
              <Product product={product} key={product.slug} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
