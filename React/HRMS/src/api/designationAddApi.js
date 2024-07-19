import axios from 'axios';

export const AddDesgnationApi = (data) => {
    const url = `${import.meta.env.VITE_BASE_URL}/designation`;
    return axios.post(url,data)
      .then((res) => {
        return res.data; 
       
      })
      .catch((error) => {
        throw error; 
      });
  };
  