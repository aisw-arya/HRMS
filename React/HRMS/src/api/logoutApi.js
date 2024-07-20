import axios from 'axios';

export const logout = () => {
    const url = `${import.meta.env.VITE_BASE_URL}/logout`;
    return axios.post(url)
      .then((res) => {
        console.log(res)
        return res.data; 
      })
      .catch((error) => {
        throw error; 
      });
  };
  

