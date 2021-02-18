import axios from 'axios';

//actions
const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
const FETCH_USER_SUCCESS_REFRESH = 'FETCH_USER_SUCCESS_REFRESH';
const OPEN_ANALIZ_PAGE = 'OPEN_ANALIZ_PAGE';

//action creators

const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};

const fetchUserSuccess = (data, imageProps) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: data,
    imageProps: imageProps,
  };
};

const openAnalizePage = (value) => {
  return {
    type: OPEN_ANALIZ_PAGE,
    payload: value,
  };
};

const fetchUserFailure = (error) => {
  return {
    type: FETCH_USER_FAILURE,
    payload: error,
  };
};

// async api request with redux-thunk
const fetchData = (base64string, imageProps) => {
  return (dispatch) => {
    dispatch(fetchUserRequest());

    const uri =
      'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyA8j22u-gXyU2jKyhUsfXIYgFI3gpaX0p4';

    const requestBody = {
      requests: [
        {
          image: {
            content: base64string,
          },
          features: [
            {
              type: 'OBJECT_LOCALIZATION',
              maxResults: 10,
            },
          ],
        },
      ],
    };

    axios
      .post(uri, requestBody)
      .then(function (response) {
        dispatch(fetchUserSuccess(response.data, imageProps));
      })
      .catch(function (error) {
        //console.log(error);
      });
  };
};

export {
  FETCH_USER_FAILURE,
  FETCH_USER_SUCCESS,
  FETCH_USER_REQUEST,
  fetchUserFailure,
  fetchUserRequest,
  fetchUserSuccess,
  fetchData,
  FETCH_USER_SUCCESS_REFRESH,
  OPEN_ANALIZ_PAGE,
  openAnalizePage,
};
