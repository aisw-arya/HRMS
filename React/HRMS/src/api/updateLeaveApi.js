import axios from 'axios';

export const updateLeave = ({data,successCB,errorCB,employee_id}) => {
    const url = `${import.meta.env.VITE_BASE_URL}/updateLeave/${employee_id}`;
    
    return axios.put(url,data)
      .then((res) => {
        successCB()
        if (successCB) successCB('Success')
        return res.data;  
       
      })
      .catch((error) => {
        console.log(error.response.data.message); 
        const resp = error.response.data.message
        errorCB(resp)
      });
  };
  