import axios from "axios";
import TokenService from "./Token.service";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
    //   config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
      config.headers["Authorization"] = token;  // for Spring Boot back-end
    //   config.headers["x-access-token"] = token; // for Node.js Express back-end
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    // console.log(originalConfig.url)

    if (originalConfig.url !== "/auth/login" && err.response) {

      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        console.log(err.response)
        console.log('---------------------------')

        try {
          const rs = await instance.get("/auth/refresh_token");

          const { access_token } = rs.data;
          TokenService.updateLocalAccessToken(access_token);

          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default instance;