import axios from 'axios';

export const deleteDesignation = (employee_id) => {
    const url = `${import.meta.env.VITE_BASE_URL}/deletedesignation/${employee_id}`;
    return axios.post(url)
      .then((res) => {
        return res.data; 
      })
      .catch((error) => {
        throw error; 
      });
  };
  

