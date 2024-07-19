import axios from 'axios';

export const updatedesignation = ({data,successCB,designation_id}) => {
  console.log(designation_id,"url")
    const url = `${import.meta.env.VITE_BASE_URL}/updatedesignation/${designation_id}`;
    
    return axios.put(url,data)
      .then((res) => {
        successCB()
        if (successCB) successCB('Success')
        return res.data; 
       
      })
      .catch((error) => {
        throw error; 
      });
  };
  