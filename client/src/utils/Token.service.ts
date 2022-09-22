class TokenService {
   
  
    getLocalAccessToken() {
      const root = JSON.parse(localStorage.getItem("persist:root"));
      const auth = JSON.parse(root?.auth);
      // console.log(auth)
      return auth?.access_token;
    }
  
    updateLocalAccessToken(token) {
      let root = JSON.parse(localStorage.getItem("persist:root"));
      let auth = JSON.parse(root?.auth);
      auth.access_token = token;

      //   
        auth=JSON.stringify(auth).replace(/\\n/g, "\\n")
        .replace(/\\'/g, "\\'")
        .replace(/\\"/g, '\\"')
        .replace(/\\&/g, "\\&")
        .replace(/\\r/g, "\\r")
        .replace(/\\t/g, "\\t")
        .replace(/\\b/g, "\\b")
        .replace(/\\f/g, "\\f");
        // console.log(root)
        // console.log("i am changed"+ JSON.stringify(root))
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
  
    removeUser() {
      let root = JSON.parse(localStorage.getItem("persist:root"));
      root.auth={};
      localStorage.setItem("persist:root", JSON.stringify(root))


    }
  }
  
  export default new TokenService();