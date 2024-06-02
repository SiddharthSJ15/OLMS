import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl="http://127.0.0.1:8000/api/teacher/";

function TeacherRegister() {
    useEffect(()=>{
        document.title='Teacher Register'
    });

    const [teacherData, setteacherData] = useState({
        'full_name':'',
        'email':'',
        'password':'',
        'qualification':'',
        'mobile_no':'',
        'skills':'',
        'status':''
    });

    // CHANGE ELEMENT VALUES
    const handleChange = (event) => {
        setteacherData({
            ...teacherData,
            [event.target.name]:event.target.value
        });
    }

    const submitForm=()=>{
        const teacherFormdata =  new FormData();
        teacherFormdata.append('full_name',teacherData.full_name)
        teacherFormdata.append('email',teacherData.email)
        teacherFormdata.append('password',teacherData.password)
        teacherFormdata.append('qualification',teacherData.qualification)
        teacherFormdata.append('mobile_no',teacherData.mobile_no)
        teacherFormdata.append('skills',teacherData.skills)
        
        try{
            axios.post(baseUrl,teacherFormdata).then((response)=>{
                setteacherData({
                'full_name':'',
                'email':'',
                'password':'',
                'qualification':'',
                'mobile_no':'',
                'skills':'',
                'status':'success'
                });
            });
        }catch(error){
            console.log(error)
            setteacherData({'status':'error'})
        }

    };

    const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
    if(teacherLoginStatus==='true') {
        window.location.href='/teacher-dashboard'
    }

    return(
        <div className="container mt-4">
            <div className='row'>
                <div className='col-6 offset-3'>
                    {teacherData.status==='success' && <p className="text-success">Thank you for Registering</p>}
                    {teacherData.status==='error' && <p className="text-danger">Registration error</p>}
                    <div className='card'>
                        <h5 className='card-header'>Teacher Register</h5>
                        <div className='card-body'>
                            {/* <form> */}
                            <div class="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Full Name</label>
                                    <input name="full_name" value={teacherData.full_name} onChange={handleChange} type="text" className="form-control" />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                                    <input name="email" onChange={handleChange} value={teacherData.email} type="email" className="form-control" />
                                </div>                                
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" className="form-label">Password</label>
                                    <input name="password" onChange={handleChange} value={teacherData.password} type="password" className="form-control" />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Qualification</label>
                                    <input name="qualification" onChange={handleChange} type="text" value={teacherData.qualification} className="form-control" />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Mobile Number</label>
                                    <input name="mobile_no" onChange={handleChange} type="text" value={teacherData.mobile_no} className="form-control" />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Skills</label>
                                    <textarea name="skills" onChange={handleChange} value={teacherData.skills} type="text" className="form-control"></textarea>
                                    <div id='emailHelp' className='form-text'>Php, Python, Javascript, etc.</div>
                                </div>
                                <button type="submit" onClick={submitForm} className="btn btn-primary">Register</button>
                            {/* </form> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherRegister;