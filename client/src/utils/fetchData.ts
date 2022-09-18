import axios from './api'


const host=process.env.REACT_APP_BASE_URL;


export const postAPI = async (url: string, post: object, token?:string) => {
  const res = await axios.post(`/${url}`, post, {
    // headers: { Authorization: token }
  })

  return res;
}


export const getAPI = async (url: string, token?:string) => {
  const res = await axios.get(`/${url}`, {
    // headers: { Authorization: token }
  })

  return res;
}

export const patchAPI = async (url: string, post: object, token?:string) => {
  const res = await axios.patch(`/${url}`, post, {
    // headers: { Authorization: token }
  })

  return res;
}


export const putAPI = async (url: string, post: object, token?:string) => {
  const res = await axios.put(`/${url}`, post, {
    // headers: { Authorization: token }
  })

  return res;
}


export const deleteAPI = async (url: string, token?:string) => {
  const res = await axios.delete(`/${url}`, {
    // headers: { Authorization: token }
  })

  return res;
}