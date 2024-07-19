import axios from 'axios';

export const getDesignationList = () => {
    const url = `${import.meta.env.VITE_BASE_URL}/designations`;
    return axios.get(url)
      .then((res) => {
        return res.data; 
      })
      .catch((error) => {
        throw error; 
      });
  };
  

