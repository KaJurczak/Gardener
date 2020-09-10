// import Axios from 'axios';

/* selectors */
export const getCart = ({cart}) => cart.products;

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

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });

export const addToCart = (payload, value) => ({ payload, value, type: ADD_TO_CART });
export const changeValue = (payload) => ({ payload, type: CHANGE_VALUE });
export const changeSelectValue = (payload) => ({ payload, type: CHANGE_SELECT });

/* thunk creators */
export const setCartToLocalSt = (cart) => {
  console.log('cart', cart);

  localStorage.setItem('cart', JSON.stringify(cart));
};

// export const getCartFromLocalSt = () => {
//   return (dispatch) => {
//   let savedCart;
//   localStorage.getItem('cart')
//     ? savedCart = JSON.parse(localStorage.getItem('cart')) : savedCart = [];
//   dispatch(fetchSuccess(savedCart));
// }};

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
      // console.log('action.payload at cartRedux - success', action.payload);
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
      // console.log('action.payload at cartRedux - err', action.payload);
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
        products: statePart.products.map((product) => {
          if (product.id === action.payload.id) return { ...product, value: action.payload.value };
          return product;
        }),
      };
    }
    case CHANGE_SELECT: {
      return {
        ...statePart,
        products: statePart.products.map((product) => {
          if (product.id === action.payload.id) return { ...product, choosenColor: action.payload.choosenColor };
          return product;
        }),
      };
    }

    default:
      return statePart;
  }
};
