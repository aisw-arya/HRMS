import axios from 'axios';

export const getEmployee = (employee_id) => {
    const url = `${import.meta.env.VITE_BASE_URL}/employee/${employee_id}`;
    return axios.get(url)
      .then((res) => {
        return res.data; 
      })
      .catch((error) => {
        throw error; 
      });
  };
  

