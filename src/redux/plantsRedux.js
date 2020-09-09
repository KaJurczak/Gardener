import Axios from 'axios';

/* selectors */
export const getAll = ({plants}) => {
  const allPlants = plants.data; 
  console.log('allPlants', allPlants);
  return allPlants;
};
export const getPlant = ({plants}, id) => {
  const plant = plants.data.filter(plant => plant._id === id.match.params.id); 
  console.log('plants in plantRedux', plants);
  console.log('plant', plant);

  return plant;
};

/* action name creator */
const reducerName = 'plants';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const LOAD_PLANT = createActionName('LOAD_PLANT');


/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const loadPlant = payload => ({ payload, type: LOAD_PLANT });


/* thunk creators */
export const fetchPlants = () => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());
    console.log('thunk fetchPlants');

    Axios
      .get(`http://localhost:8000/api/plants`)
      .then(res => {
        dispatch(fetchSuccess(res.data));
        console.log('res.data', res.data);
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
        console.log('err');
      });
  };
};

export const fetchSinglePlant = ( id ) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());
    console.log('thunk fetchSinglePlants');

    Axios
      .get(`http://localhost:8000/api/plants/${id}`)
      .then(res => {
        dispatch(loadPlant(res.data));
        console.log('res.data2', res.data);
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
        console.log('err2');

      });
  };
};

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
      console.log('action.payload', action.payload);
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
    case LOAD_PLANT: {
      console.log('action.payload', action.payload);
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        singlePlant: action.payload,
      };
    }
    default:
      return statePart;
  }
};
