// import axios from "axios";

const berest = (endpoint, data) => {
  /*
  const url = endpoint;
  return axios.post(url, data).then((response) => {
    return response.data;
  });
  */

  return new Promise((resolve) => {
    const user = {
      id: 1,
      login : "mock.user",
      name : "Mock User"
    };

    resolve(user);
  });

};

export { berest };

