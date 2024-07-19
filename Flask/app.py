import flask
from flask import request,jsonify,session
from models import *
from sqlalchemy import select,null
from flask_cors import CORS,cross_origin
import datetime as dt
app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:1234@localhost:5432/hrms"
app.config['SECRET_KEY'] = 'aiswarya'
CORS(app)
db.init_app(app)
now = dt.datetime.now(dt.timezone.utc).isoformat() 

@app.route("/")
def home():
    return "Hello, world"


@app.route('/register', methods=['POST'])
def register(): 
    data = request.json 
    username = data.get('user_name')
    password = data.get('password')
    existing_user = Hr.query.filter_by(user_name=username).first() 
    if existing_user: return jsonify({'message': 'Username already exists. Please choose a different username.'}), 400
    
    new_hr = Hr(user_name=username)
    new_hr.set_password(password)
    db.session.add(new_hr) 
    db.session.commit() 
    return jsonify({'message': 'User created successfully.'}), 201
    
@app.route('/login', methods=['POST'])
@cross_origin()
def login(): 
    data = request.get_json() 
    print(data,"data")
    username = data.get('user_name')
    password = data.get('password')
    user = Hr.query.filter_by(user_name=username).first() 
    print(user)
    if user and user.check_password(password):
              
         session['user_id'] = user.id 
         session['user_name'] = user.user_name 
         return jsonify({'message': 'Login successful.'}), 200
    else: 
        return jsonify({'message': 'Incorrect username or password. Please try again.'}), 401

@app.route('/dashboard', methods=['GET'])
def dashboard(): 
    if 'user_id' in session:
        return jsonify({'message': f'Welcome {session["user_name"]}! This is your dashboard.'}), 200
    else: 
        return jsonify({'message': 'Unauthorized access. Please log in first.'}), 401

@app.route('/logout', methods=['POST'])
def logout(): 
    session.clear()
    return jsonify({'message': 'Logged out successfully.'}), 200


@app.route("/designation" ,methods=['POST'])
def add_designation():
    data = request.get_json()
    designation_id = data.get("designation_id")
    designation = data.get("designation")
    total_leave = data.get("total_leave")
    new_designation=Designation(designation_id=designation_id,designation=designation,total_leave=total_leave)
    db.session.add(new_designation)
    db.session.commit()
    return flask.jsonify("resp")

@app.route("/designations",methods=['GET'])
def list_desigation():
    Designation_select_query = Designation.query.filter(Designation.deleted_at==None)
    resp =[]
    for item in  Designation_select_query:
        list={"designation_id":item.designation_id,
        "designation": item.designation,
        "total_leave":item.total_leave}

        resp.append(list)
    return flask.jsonify(resp)

@app.route("/updatedesignation/<int:designation_id>", methods=['PUT'])
def update_designation(designation_id):
    data = request.get_json()
    designation_name = data.get("designation")
    total_leave = data.get("total_leave")
    designation = Designation.query.get(designation_id)
    
    if designation:
        designation.designation_name = designation_name
        designation.total_leave = total_leave

        db.session.commit()
        return jsonify("Designation updated successfully")
    else:
        return jsonify("Designation not found"), 404



@app.route("/updateLeave/<int:employee_id>", methods=['PUT'])
def update_leave(employee_id):
    data = request.get_json()
    employee_name = data.get("employee_name")
    leave_take= data.get("leave_take")  
    employee=Employee.query.get(employee_id)
    # if employee:
    if int(leave_take) <= employee.designation.total_leave:
        employee.employee_name = employee_name
        employee.leave_take = leave_take
        db.session.commit()
        return jsonify(" updated successfully")
    else:
        return jsonify({'message': 'Maximum permitted leave exhausted'}), 401
        
        
@app.route("/employee", methods=['POST'])
def add_employee():
    data=request.get_json()
    if data:
        employee_id = data.get("employee_id")
        employee_name = data.get("employee_name")
        address= data.get("address")
        phone_number= data.get("phone_number")
        email= data.get("email")
        leave_take= data.get("leave_take")
        image = data.get("image")
        designation= data.get("designation")
        designation= Designation.query.filter_by(designation=designation).first()
        des_id=designation.designation_id
        new_employee=Employee(employee_id=employee_id,employee_name=employee_name,address=address,phone_number=phone_number,email=email,leave_take=leave_take,des_id=des_id,image=image)
        db.session.add(new_employee)
        db.session.commit()
        return flask.jsonify("resp")   
    else:
        return jsonify({'message': 'please input valid data'}), 401

@app.route("/employees")
def list_employees():
    # employee_select_query = db.select(Employee).order_by(Employee.employee_id.desc())
    # employee = db.session.execute(employee_select_query).scalars()
    
    employee = Employee.query.filter(Employee.deleted_at==None)
    resp =[]
    for item in  employee:
        list={"employee_id":item.employee_id,
        "employee_name": item.employee_name,
        "address":item.address,
        "phone_number":item.phone_number,
        "email":item.email,
        "leave_take":item.leave_take,
        "des_id":item.des_id,
        "image":item.image,
        "designation":item.designation.designation,
        "total_leave":item.designation.total_leave

        }

        resp.append(list)
    return flask.jsonify(resp)

@app.route("/employee/<int:employee_id>",methods=['GET'])
def employees(employee_id):
    item = Employee.query.filter_by(employee_id=employee_id).first()
    
    list={"employee_id":item.employee_id,
    "employee_name": item.employee_name,
    "address":item.address,
    "phone_number":item.phone_number,
    "email":item.email,
    "leave_take":item.leave_take,
    "des_id":item.des_id,
    "image":item.image,
    "designation":item.designation.designation,
    "total_leave":item.designation.total_leave

    }

    return flask.jsonify(list)


@app.route("/updateemployee/<int:employee_id>", methods=['PUT'])
def update_employee(employee_id):
    data=request.get_json()
    employee_id = data.get("employee_id")
    employee_name = data.get("employee_name")
    address= data.get("address")
    phone_number= data.get("phone_number")
    email= data.get("email")
    leave_take= data.get("leave_take")
    designation= data.get("designation")
    image = data.get("image")
    designation =Designation.query.filter_by(designation=designation).first()
    des_id=designation.designation_id
    employee = Employee.query.get(employee_id)
    print(employee_name)
    if employee:
        employee.employee_name = employee_name
        employee.address = address
        employee.phone_number = phone_number
        employee.email = email
        employee.leave_take = leave_take
        employee.des_id = des_id
        employee.image =image

        db.session.commit()
        return jsonify(" updated successfully")
    else:
        return jsonify("employee not found"), 404

# @app.route('/deleteemployee/<int:employee_id>',methods=['DELETE'])
# def delete_employee(employee_id):
#     employee = Employee.query.get(employee_id)

#     if employee:
        # db.session.delete(employee)
        # db.session.commit()
        # return jsonify("employee deleted successfully")
#     else:
#         return jsonify("employee not found"), 404


@app.route('/deleteemployee/<int:employee_id>', methods=['POST'])
def delete_employee(employee_id):
    now = dt.datetime.now(dt.timezone.utc).isoformat() 
    employee = Employee.query.filter_by(employee_id=employee_id).first()
    employee.deleted_at=now
    db.session.commit()
    return jsonify({"message":"employee deleted successfully"})


@app.route('/deletedesignation/<int:designation_id>', methods=['POST'])
def delete_designation(designation_id):
    now = dt.datetime.now(dt.timezone.utc).isoformat() 
    designation = Designation.query.filter_by(designation_id=designation_id).first()
    designation.deleted_at=now
    db.session.commit()
    return jsonify({"message":"designation deleted successfully"})





with app.app_context():
    db.create_all()

if __name__ == "__main__":
  init_db()
  app.run(port=5000)