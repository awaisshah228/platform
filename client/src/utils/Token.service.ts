class TokenService {
   
  
    getLocalAccessToken() {
      const root = JSON.parse(localStorage.getItem("persist:root"));
      const auth = JSON.parse(root?.auth);
      return auth?.access_token;
    }
  
    updateLocalAccessToken(token) {

      let root = JSON.parse(localStorage.getItem("persist:root"));
      let auth = JSON.parse(root?.auth);

    //   let user = JSON.parse(localStorage.getItem("user"));
      auth.access_token = token;
      root.auth=auth;
      localStorage.setItem("persist:root", JSON.stringify(root));
    }
  
    getUser() {
      return JSON.parse(localStorage.getItem("persist:root"))?.auth?.user;
    }
  
    // setUser(user) {
    //   console.log(JSON.stringify(user));
    //   localStorage.setItem("user", JSON.stringify(user));
    // }
  
    // removeUser() {
    //   localStorage.removeItem("user");
    // }
  }
  
  export default new TokenService();