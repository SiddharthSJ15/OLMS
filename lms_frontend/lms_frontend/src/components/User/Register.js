import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl="http://127.0.0.1:8000/api/student/";

function Register() {

    useEffect(()=>{
        document.title='Student Register'
    });

    const [studentData, setstudentData] = useState({
        'full_name':'',
        'email':'',
        'password':'',
        'username':'',
        'interested_categories':'',
        'status':''
    });

    // CHANGE ELEMENT VALUES
    const handleChange = (event) => {
        setstudentData({
            ...studentData,
            [event.target.name]:event.target.value
        });
    }

    const submitForm=()=>{
        const studentFormdata =  new FormData();
        studentFormdata.append('full_name',studentData.full_name)
        studentFormdata.append('email',studentData.email)
        studentFormdata.append('password',studentData.password)
        studentFormdata.append('username',studentData.username)
        studentFormdata.append('interested_categories',studentData.interested_categories)
        
        try{
            axios.post(baseUrl,studentFormdata).then((response)=>{
                setstudentData({
                    'full_name':'',
                    'email':'',
                    'password':'',
                    'username':'',
                    'interested_categories':'',
                    'status':'success'
                });
            });
        }catch(error){
            console.log(error)
            setstudentData({'status':'error'})
        }

    };

    return(
        <div className="container mt-4">
            <div className='row'>
                <div className='col-6 offset-3'>                    
                    {studentData.status==='success' && <p className="text-success">Thank you for Registering</p>}
                    {studentData.status==='error' && <p className="text-danger">Registration error</p>}
                    <div className='card'>
                        <h5 className='card-header'>Student Register</h5>
                        <div className='card-body'>
                            {/* <form> */}
                            <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Full Name</label>
                                    <input type="email" name="full_name" className="form-control" value={studentData.full_name} onChange={handleChange} />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                                    <input type="email" name="email" class="form-control" value={studentData.email} onChange={handleChange} />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Username</label>
                                    <input type="email" name="username" class="form-control" value={studentData.username} onChange={handleChange} />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Password</label>
                                    <input type="password" name="password" class="form-control" value={studentData.password} onChange={handleChange} />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Interests</label>
                                    <textarea type="email" name="interested_categories" class="form-control" value={studentData.interested_categories} onChange={handleChange} />
                                </div>
                                <button type="submit" onClick={submitForm} class="btn btn-primary">Login</button>
                            {/* </form> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;