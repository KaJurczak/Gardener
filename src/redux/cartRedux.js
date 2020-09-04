// import Axios from 'axios';

/* selectors */
export const getCart = ({cart}) => cart.products;

/* action name creator */
const reducerName = 'cart';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const ADD_TO_CART = createActionName('ADD_TO_CART');
const CHANGE_VALUE = createActionName('CHANGE_VALUE');

/* action creators */
export const addToCart = (payload, value) => ({ payload, value, type: ADD_TO_CART });
export const changeValue = (payload) => ({ payload, type: CHANGE_VALUE });

/* thunk creators */


/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const { products } = statePart;
      if(products){
        let isInCart = false;
        for (const prod of products) {
          if (prod.id === action.payload.id) isInCart = true;
        }
        return {
          ...statePart,
          products: isInCart ? [...products] : [...products, { ...action.payload, value: action.value }],
        };
      } 
      return {
        ...statePart,
        products: [{ ...action.payload, value: action.value}],
      };
    }
    case CHANGE_VALUE: {
      return {
        ...statePart,
        products: statePart.products.map((product) => {
          if (product.id === action.payload.id) return { ...product, value: action.payload.value };
          return product;
        }),
      };
    }
    default:
      return statePart;
  }
};
