import { createContext, useReducer } from "react";
import { CART_ADD_ITEM } from "./ActionType";

export const Store = createContext();

const defaultState = {
    cart : {
        cartItems : []
    }
};



const reducer = (state, action) => {
    if(action.type === CART_ADD_ITEM){
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find((x)=> x._id === newItem._id );
      const cartItems = existItem ?  state.cart.cartItems.map(item => item._id === existItem._id ? newItem : item) : [...state.cart.cartItems,  newItem]

        return {...state, cart : {...state.cart, cartItems }}
    }
  return state;
};

export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
