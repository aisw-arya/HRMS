# Human Resourse Management system

 - Login credentials:
   - user name: hr@RR
   - password : @rr#1234

 - To register new user- http://127.0.0.1:5000/register
   
      format={ 
        "user_name":"hr@RR",   
        "password":"@rr#1234"
          }

- flask running port -http://127.0.0.1:5000/
- Install all packages in requirement.txt
  
      pip install -requirement.txt
- React runnning port -http://localhost:5173

- To run react 
      
       npm istall
       npm run dev

  ### *unittest*
- Change database to a new one on flask (app.py) to avoid missing of data from the oraginal database.
- To run test file :

      python3 test_hrms.py
- To get coverage
  
      pip install coverage
      python3 -m coverage run -m unittest test_hrms.py
      python3 -m coverage report
      python3 -m coverage html
  
