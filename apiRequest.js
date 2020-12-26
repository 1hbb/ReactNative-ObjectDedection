import axios from 'axios';

export default function apiRequest(base64string) {
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
            type: 'LABEL_DETECTION',
            maxResults: 5,
          },
        ],
      },
    ],
  };

  const result = axios
    .post(uri, requestBody)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      //console.log(error);
    });

    //console.log(result);
  return result;
};


