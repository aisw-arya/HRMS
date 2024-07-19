import axios from 'axios';

export const UpdateEmployee = ({data,successCB,employee_id}) => {
  console.log(employee_id,"url")
    const url = `${import.meta.env.VITE_BASE_URL}/updateemployee/${employee_id}`;
    
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
  