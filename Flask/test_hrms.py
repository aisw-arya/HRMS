import unittest
from app import app,db
from models import Hr,Designation,Employee
from flask import json




class LoginTestCase(unittest.TestCase):

    def setUp(self):
        self.app_context = app.app_context()
        self.app_context.push()
        self.client = app.test_client()
        self.client.testing = True
        db.create_all()   
        test_user = Hr(user_name='testuser')
        test_user.set_password('password') 
        db.session.add(test_user)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_login_successful(self):
        response = self.client.post('/login', json={'user_name': 'testuser', 'password': 'password'})
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data['message'], 'Login successful.')

    def test_login_incorrect_password(self):
        response = self.client.post('/login', json={'user_name': 'testuser', 'password': 'passwo'})
        self.assertEqual(response.status_code, 401)
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data['message'], 'Incorrect username or password. Please try again.')  
    
    def  test_login_incorrect_username(self):
        response = self.client.post('/login', json={'user_name': 'user', 'password': 'password'})
        self.assertEqual(response.status_code, 401)
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data['message'], 'Incorrect username or password. Please try again.')  
    


# class Logout(unittest.TestCase):
#     def 




class DesignationAddTestCase(unittest.TestCase):
    def setUp(self):
        self.app_context = app.app_context()
        self.app_context.push()
        self.client = app.test_client()
        self.client.testing = True
        db.create_all()   

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_designation_added_successfully(self):
        response = self.client.post('/designation', json={'designation': 'manager', 'total_leave': 10})
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data,"designation added successfully")

    def test_designation_missing_designation(self):
        response = self.client.post('/designation', json={'total_leave': 10})
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data,"please enter a valid designation")


    def test_designation_missing_total_leave(self):
        response = self.client.post('/designation', json={'designation': 'manager'})
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data,"please enter a valid total leave")

    def test_designation_already_exist(self):
        test_designation = Designation(designation='manager',total_leave=10)
        db.session.add(test_designation)
        db.session.commit()

        response = self.client.post('/designation', json={'designation': 'manager', 'total_leave': 10})
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data,"designation already exist")



class DesignationlistTestCase(unittest.TestCase):
    def setUp(self):
        self.app_context = app.app_context()
        self.app_context.push()
        self.client = app.test_client()
        self.client.testing = True
        db.create_all()   


    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_list_designation(self):
        test_designation = Designation(designation='manager',total_leave=10)
        db.session.add(test_designation)
        db.session.commit()
        response = self.client.get('/designations')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data,[{'designation': 'manager','designation_id':1, 'total_leave': 10}])

    def test_list_designation_no_value(self):
        response = self.client.get('/designations')
        self.assertEqual(response.status_code,404)
        data = json.loads(response.data)
        self.assertEqual(data['message'],"No designations found")





class DesignationUpdateTestCase(unittest.TestCase): 
    def setUp(self):
        self.app_context = app.app_context()
        self.app_context.push()
        self.client = app.test_client()
        self.client.testing = True
        db.create_all()   
        test_designation = Designation(designation='manager',total_leave=10)
        db.session.add(test_designation)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_update_designation_success(self):
        response = self.client.put('/updatedesignation/1', json={'designation': 'manager', 'total_leave': 11})
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data,"Designation updated successfully")

    def test_update_designation_invalid_designation_id(self):
        response = self.client.put('/updatedesignation/2', json={'designation': 'manager', 'total_leave': 11})
        self.assertEqual(response.status_code, 404)
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data,"Designation not found")

    def test_update_designation_invalid_designation(self):
        response = self.client.put('/updatedesignation/1', json={ 'total_leave': 11})
        self.assertEqual(response.status_code, 404)
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data,"Please enter a valid designation")



    def test_update_designation_invalid_total_leave(self):
        response = self.client.put('/updatedesignation/1', json={ 'designation': 'manager'})
        self.assertEqual(response.status_code, 404)
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data,"Please enter valid total leave")



class DesignationDeleteTestCase(unittest.TestCase): 
    def setUp(self):
        self.app_context = app.app_context()
        self.app_context.push()
        self.client = app.test_client()
        self.client.testing = True
        db.create_all()   
        test_designation = Designation(designation='manager',total_leave=10)
        db.session.add(test_designation)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_designation_delete(self):
        response = self.client.post('/deletedesignation/1')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data['message'],"designation deleted successfully")




class EmployeeAddTestCase(unittest.TestCase):
    def setUp(self):
        self.app_context = app.app_context()
        self.app_context.push()
        self.client = app.test_client()
        self.client.testing = True
        db.create_all()  
        test_designation = Designation(designation='Manager',total_leave=10)
        db.session.add(test_designation) 
        db.session.commit()
        
    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()    

    def test_employee_added_successfully(self):
        response = self.client.post('/employee', json={"employee_name":'test_employee',"address":"Ekm","phone_number":"1234567890","email":"test@gamil.com","image":"url","designation":"Manager" })
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data,"Employee added successfully")

    def test_employee_data_missing(self):
        response = self.client.post('/employee', json={})
        self.assertEqual(response.status_code, 401)
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data['message'],'please input valid data')


    def test_employee_name_missing(self):
        response = self.client.post('/employee', json={"address":"Ekm","phone_number":"1234567890","email":"test@gamil.com","image":"url","designation":"Manager" })
        self.assertEqual(response.status_code, 404)
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data,'Please enter a valid name')

    def test_employee_address_missing(self):
        response = self.client.post('/employee', json={"employee_name":'test_employee',"phone_number":"1234567890","email":"test@gamil.com","image":"url","designation":"Manager" })
        self.assertEqual(response.status_code, 404)
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data,'Please enter a valid address')

    def test_employee_email_missing(self):
        response = self.client.post('/employee', json={"employee_name":'test_employee',"address":"Ekm","phone_number":"1234567890","image":"url","designation":"Manager" })
        self.assertEqual(response.status_code, 404)
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data,'Please enter a valid email')

    def test_employee_phone_missing(self):
        response = self.client.post('/employee', json={"employee_name":'test_employee',"address":"Ekm","email":"test@gamil.com","image":"url","designation":"Manager" })
        self.assertEqual(response.status_code, 404)
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data,'Please enter a valid phone number')

    def test_employee_image_missing(self):
        response = self.client.post('/employee', json={"employee_name":'test_employee',"address":"Ekm","phone_number":"1234567890","email":"test@gamil.com","designation":"Manager" })
        self.assertEqual(response.status_code, 404)
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data,'Please enter a valid image')

    def test_employee_designation_missing(self):
        response = self.client.post('/employee', json={"employee_name":'test_employee',"address":"Ekm","phone_number":"1234567890","email":"test@gamil.com","image":"url" })
        self.assertEqual(response.status_code, 404)
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data,'Please enter a valid designation')

    def test_employee_designation_not_existing(self):
        response = self.client.post('/employee', json={"employee_name":'test_employee',"address":"Ekm","phone_number":"1234567890","email":"test@gamil.com","image":"url","designation":"HR" })
        self.assertEqual(response.status_code, 404)
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data,'Please enter a valid designation')

    def test_employee_email_already_exist(self):
        test_employee= Employee(employee_name='test_employee',address="Ekm",phone_number="1234567890",email="test@gamil.com",image="url",des_id=1)
        db.session.add(test_employee) 
        db.session.commit()
        response = self.client.post('/employee', json={"employee_name":'test_employee',"address":"Ekm","phone_number":"1234567890","email":"test@gamil.com","image":"url","designation":"Manager" })
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data,"Employee with this email already exists")



class EmployeelistTestCase(unittest.TestCase):
    def setUp(self):
        self.app_context = app.app_context()
        self.app_context.push()
        self.client = app.test_client()
        self.client.testing = True
        db.create_all()  
        test_designation = Designation(designation='Manager',total_leave=10)
        db.session.add(test_designation) 
        db.session.commit()
    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop() 


    def test_employee_listing_successful(self):

        test_employee= Employee(employee_name='test_employee',address="Ekm",phone_number="1234567890",email="test@gamil.com",image="url",des_id=1)

        db.session.add(test_employee) 
        db.session.commit()     
        
        response = self.client.get('/employees')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data,[{'address': 'Ekm',
                              'des_id': 1,
                              'designation': 'Manager',
                              'email': 'test@gamil.com',
                              'employee_id': 1,
                              'employee_name': 'test_employee',
                              'image': 'url',
                              'leave_take': 0,
                              'phone_number': '1234567890',
                              'total_leave': 10}])

    def test_employee_listing_no_value(self):   
        
        response = self.client.get('/employees')
        self.assertEqual(response.status_code, 404)
        data = json.loads(response.data)
        self.assertEqual(data['message'],'No employee found')


class OneEmployeeListTestCase(unittest.TestCase):
    def setUp(self):
        self.app_context = app.app_context()
        self.app_context.push()
        self.client = app.test_client()
        self.client.testing = True
        db.create_all()  
        test_designation = Designation(designation='Manager',total_leave=10)
        db.session.add(test_designation) 
        db.session.commit()
    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()      

    def test_one_employee_listing_successful(self):

        test_employee= Employee(employee_name='test_employee',address="Ekm",phone_number="1234567890",email="test@gamil.com",image="url",des_id=1)
        db.session.add(test_employee) 
        db.session.commit()     
        
        response = self.client.get('/employee/1')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data,{'address': 'Ekm',
                              'des_id': 1,
                              'designation': 'Manager',
                              'email': 'test@gamil.com',
                              'employee_id': 1,
                              'employee_name': 'test_employee',
                              'image': 'url',
                              'leave_take': 0,
                              'phone_number': '1234567890',
                              'total_leave': 10})
        
    def test_employee_listing_no_value(self):   
        
        response = self.client.get('/employee/1')
        self.assertEqual(response.status_code, 404)
        data = json.loads(response.data)
        self.assertEqual(data['message'],'No employee found')
   


class UpdateEmployeeTestCase(unittest.TestCase):
    def setUp(self):
        self.app_context = app.app_context()
        self.app_context.push()
        self.client = app.test_client()
        self.client.testing = True
        db.create_all()  
        test_designation = Designation(designation='Manager',total_leave=10)
        db.session.add(test_designation) 
        db.session.commit()
    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()    
        
    def test_update_employee_success(self):

        test_employee= Employee(employee_name='test_employee',address="Ekm",phone_number="1234567890",email="test@gamil.com",image="url",des_id=1)
        db.session.add(test_employee) 
        db.session.commit()     
        
        response = self.client.put('/updateemployee/1',json={"employee_name":'update_employee',"address":"Ekm","phone_number":"1234567890","email":"test@gamil.com","leave_take":0,"image":"url","designation":"Manager" })
     
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data,' updated successfully') 

    def test_update_employee_invalid_employee_id(self):
        response = self.client.put('/updateemployee/2',json={"employee_name":'update_employee',"address":"Ekm","phone_number":"1234567890","email":"test@gamil.com","leave_take":0,"image":"url","designation":"Manager" })
        self.assertEqual(response.status_code, 404)
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data,"employee not found")

    def test_update_employee_invalid_employee_name(self):
        response = self.client.put('/updateemployee/1',json={"address":"Ekm","phone_number":"1234567890","email":"test@gamil.com","leave_take":0,"image":"url","designation":"Manager" })
        self.assertEqual(response.status_code, 404)
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data,"Please enter a valid name")

    def test_update_employee_invalid_employee_address(self):
        response = self.client.put('/updateemployee/1',json={"employee_name":'update_employee',"phone_number":"1234567890","email":"test@gamil.com","leave_take":0,"image":"url","designation":"Manager" })
        self.assertEqual(response.status_code, 404)
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data,"Please enter a valid address")


    def test_update_employee_invalid_employee_phone_number(self):
        response = self.client.put('/updateemployee/1',json={"employee_name":'update_employee',"address":"Ekm","email":"test@gamil.com","leave_take":0,"image":"url","designation":"Manager" })
        self.assertEqual(response.status_code, 404)
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data,"Please enter a valid phone number")



    def test_update_employee_invalid_employee_email(self):
        response = self.client.put('/updateemployee/1',json={"employee_name":'update_employee',"address":"Ekm","phone_number":"1234567890","leave_take":0,"image":"url","designation":"Manager" })
        self.assertEqual(response.status_code, 404)
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data,"Please enter a valid email")


    def test_update_employee_invalid_employee_image(self):
        response = self.client.put('/updateemployee/1',json={"employee_name":'update_employee',"address":"Ekm","phone_number":"1234567890","email":"test@gamil.com","leave_take":0,"designation":"Manager" })
        self.assertEqual(response.status_code, 404)
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data,"Please enter a valid image")

    def test_update_employee_invalid_employee_designation(self):
        response = self.client.put('/updateemployee/1',json={"employee_name":'update_employee',"address":"Ekm","phone_number":"1234567890","email":"test@gamil.com","leave_take":0,"image":"url" })
        self.assertEqual(response.status_code, 404)
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data,"Please enter a valid designation")



    def test_update_employee_designation_not_found(self):
        response = self.client.put('/updateemployee/1',json={"employee_name":'update_employee',"address":"Ekm","phone_number":"1234567890","email":"test@gamil.com","leave_take":0,"image":"url","designation":"Hr"  })
        self.assertEqual(response.status_code, 404)
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data,"Please enter a valid designation")

class EmployeeDeleteTestCase(unittest.TestCase): 
    def setUp(self):
        self.app_context = app.app_context()
        self.app_context.push()
        self.client = app.test_client()
        self.client.testing = True
        db.create_all()   
        test_designation = Designation(designation='manager',total_leave=10)
        db.session.add(test_designation)
        db.session.commit()

        test_employee= Employee(employee_name='test_employee',address="Ekm",phone_number="1234567890",email="test@gamil.com",image="url",des_id=1)
        db.session.add(test_employee) 
        db.session.commit() 

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_employee_delete(self):
        response = self.client.post('/deleteemployee/1')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data['message'],"employee deleted successfully")



class UpdateLeaveTestCase(unittest.TestCase):
    def setUp(self):
        self.app_context = app.app_context()
        self.app_context.push()
        self.client = app.test_client()
        self.client.testing = True
        db.create_all()  
        test_designation = Designation(designation='Manager',total_leave=10)
        db.session.add(test_designation) 
        db.session.commit()

        test_employee= Employee(employee_name='test_employee',address="Ekm",phone_number="1234567890",email="test@gamil.com",image="url",des_id=1)
        db.session.add(test_employee) 
        db.session.commit()     
        
    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()    
        
    def test_update_leave_success(self):

        response = self.client.put('/updateLeave/1',json={"employee_name":'test_employee',"leave_take":0 })
     
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data,' updated successfully') 

    def test_update_leave_exceed(self):

        response = self.client.put('/updateLeave/1',json={"employee_name":'test_employee',"leave_take":11 })
     
        self.assertEqual(response.status_code, 401)
        data = json.loads(response.data)
        self.assertEqual(data['message'], 'Maximum permitted leave exhausted')





class LogoutTestCase(unittest.TestCase):

    def setUp(self):
        self.app_context = app.app_context()
        self.app_context.push()
        self.client = app.test_client()
        self.client.testing = True
        app.config['TESTING'] = True
        app.config['DEBUG'] = False

    def tearDown(self):
        self.app_context.pop()

    def test_logout(self):
        response = self.client.post('/logout')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data['message'], 'Logged out successfully.')
        with self.client.session_transaction() as sess:
            self.assertIsNone(sess.get('user_id'))  







    


    


     


    
    







if __name__ == '__main__':
    unittest.main()