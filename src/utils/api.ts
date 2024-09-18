import axios from "axios";
const LOCAL_BACKEND = import.meta.env.VITE_LOCAL_BACKEND;

const api = axios.create({
  baseURL: LOCAL_BACKEND,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
});

export const registerUser = async (name:string, email:string, password:string) =>{
    try{
        const res = await api.post("/user", {name,email,password})
        // axios는 기본적으로 data라는 객체로 내줌 , 그리고 백엔드에서 data로 return하게 설정했으므로 data.data가 됌
        return res.data
    }catch(err){
        console.log("registerUser api 실패")
        throw err
    }
}

export const loginUser = async (email:string, password:string)=>{
    try{
        const res = await api.post("/auth/login", {email, password})
        return res.data
    }catch(err){
        console.log("loginUser api 실패")
        throw err
    }
}

export const getUserData = async () => {
    try {
      const res = await api.get("/user/me")
      return res.data;
    } catch (err) {
      console.error("getUserData api error", err);
      throw err;
    }
};



/**
 * console.log all requests and responses
 */
api.interceptors.request.use(
  (request) => {
    console.log("Starting Request", request);
    request.headers.authorization = `Bearer ${sessionStorage.getItem("token")}`;
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    error = error.response.data;
    console.log("RESPONSE ERROR", error);
    return Promise.reject(error);
  }
);

export default api;