import axios from 'axios';

export const AddDesgnationApi = (data,successCB) => {
    const url = `${import.meta.env.VITE_BASE_URL}/designation`;
    return axios.post(url,data)
      .then((res) => {
        successCB()
        if (successCB) successCB('success')
        return res.data; 
       
      })
      .catch((error) => {
        throw error; 
      });
  };
  