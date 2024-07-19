import axios from 'axios';

export const AddEmployeeApi = (data,successCB,errorCB) => {
    const url = `${import.meta.env.VITE_BASE_URL}/employee`;
    return axios.post(url,data)
      .then((res) => {
        successCB()
        if (successCB) successCB('success')
        return res.data; 
       
      })
      .catch((error) => {
        
        const resp = error.response.data.message
        console.log( error.response.data.message,"er")
        errorCB(resp)
      });
  };
  