// import Axios from 'axios';

/* selectors */
export const getCart = ({cart}) => cart.data;

/* action name creator */
const reducerName = 'cart';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');

const ADD_TO_CART = createActionName('ADD_TO_CART');
const CHANGE_VALUE = createActionName('CHANGE_VALUE');
const CHANGE_SELECT = createActionName('CHANGE_SELECT');
const REMOVE_PRODUCT = createActionName('REMOVE_PRODUCT');


/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });

export const addToCart = (payload, value) => ({ payload, value, type: ADD_TO_CART });
export const changeValue = (payload) => ({ payload, type: CHANGE_VALUE });
export const changeSelectValue = (payload) => ({ payload, type: CHANGE_SELECT });
export const removeProduct = (payload) => ({ payload, type: REMOVE_PRODUCT });


/* thunk creators */

export const setCartToLocalSt = (cart, value) => () => {
  const createObject = {...cart, value};
  let arr = [];
  arr = JSON.parse(localStorage.getItem('cart')) || [];
  const newArr = arr.filter(a => a._id !== createObject._id);
  newArr.push(createObject);
  localStorage.setItem(`cart`, JSON.stringify(newArr));
};

export const changeCartInLocalSt = (cart) => () => {
  localStorage.setItem(`cart`, JSON.stringify(cart));
};

export const getCartFromLocalSt = () => {
  return (dispatch) => {
    dispatch(fetchSuccess(JSON.parse(localStorage.getItem('cart'))));
  };};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }

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
        data: statePart.data.map((product) => {
          if (product._id === action.payload._id) return { ...product, value: action.payload.value };
          return product;
        }),
      };
    }
    case CHANGE_SELECT: {
      return {
        ...statePart,
        data: statePart.data.map((product) => {
          if (product._id === action.payload._id) return { ...product, choosenColor: action.payload.choosenColor };
          return product;
        }),
      };
    }
    case REMOVE_PRODUCT: {
      return {
        ...statePart,
        data: statePart.data.filter((item) => item._id !== action.payload),
      };
    }


    default:
      return statePart;
  }
};
