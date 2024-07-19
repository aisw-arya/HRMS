import axios from 'axios';

export const getEmployeeDetails = () => {
    const url = `${import.meta.env.VITE_BASE_URL}/employees`;
    return axios.get(url)
      .then((res) => {
        return res.data; 
      })
      .catch((error) => {
        throw error; 
      });
  };
  

