// import Axios from 'axios';

/* selectors */
// export const getAll = ({plants}) => plants.data;

/* action name creator */
const reducerName = 'cart';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const ADD_TO_CART = createActionName('ADD_TO_CART');

/* action creators */
export const addToCart = (payload, value) => ({ payload, value, type: ADD_TO_CART });

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
    default:
      return statePart;
  }
};
