import axios from 'axios';

export const loginApi = (data,successCB,errorCB) => {
    const url = `${import.meta.env.VITE_BASE_URL}/login`;
    console.log(data,"url")
    return axios.post(url,data)
      .then((res) => {
        console.log(res.data,"res")
        successCB()
        if (successCB) successCB('Success')
        return res.data; 
      })
      .catch((error) => {
        console.log(error.response.data.message); 
        const resp = error.response.data.message
        errorCB(resp)
        
        // throw error; 
      });
  };
  