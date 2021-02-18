import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  OPEN_ANALIZ_PAGE,
} from '../actions/fetchMainfeedAction';

//initial state

const initialState = {
  loading: false,
  data: [],
  error: '',
  openAnalizePage: false,
  imageProps: '',
};

//reducers

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: '',
        loading: false,
        openAnalizePage: true,
        imageProps: action.imageProps,
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case OPEN_ANALIZ_PAGE:
      return {
        ...state,
        openAnalizePage: action.payload,
      };
    default:
      return state;
  }
};

export default mainReducer;
