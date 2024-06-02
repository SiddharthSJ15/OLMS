import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl='http://127.0.0.1:8000/api';
function TeacherLogin() {
    const [teacherLoginData, setteacherData] = useState({
       email:'',
       password:'' 
    });

    const [errorMsg, seterrorMsg] = useState('')
    
    const handleChange=(event)=>{
        setteacherData({
            ...teacherLoginData,
            [event.target.name]:event.target.value
        });
    }

    const submitForm=()=>{
        const teacherFormData = new FormData();
        teacherFormData.append('email',teacherLoginData.email)
        teacherFormData.append('password',teacherLoginData.password)
        try{
            axios.post(baseUrl+'/teacher-login',teacherFormData)
            .then((res)=>{
                if(res.data.bool===true){
                    localStorage.setItem('teacherLoginStatus',true);
                    localStorage.setItem('teacherId',res.data.teacher_id);
                    window.location.href='/teacher-dashboard';
                }
                else{
                    seterrorMsg('Invalid Email or Password')
                }
            });
        }catch(error){
            console.log(error);
        }
    }

    const teacherLoginStatus = localStorage.getItem('teacherLoginStatus');
    if(teacherLoginStatus=='true') {
        window.location.href='/teacher-dashboard'
    }

    useEffect(()=>{
        document.title='Teacher Login'
    });

    return(
        <div className="container mt-4">
            <div className='row'>
                <div className='col-6 offset-3'>
                    <div className='card'>
                        <h5 className='card-header'>Teacher Login</h5>
                        <div className='card-body'>
                            {/* <form> */}
                            {errorMsg && <p className='text-danger'>{errorMsg}</p>}
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                                    <input type="email" onChange={handleChange} class="form-control" id="email" name="email" value={teacherLoginData.email} />
                                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Password</label>
                                    <input type="password" onChange={handleChange} class="form-control" id="password" name="password" value={teacherLoginData.password} />
                                </div>
                                {/* <div class="mb-3 form-check">
                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                    <label class="form-check-label" for="exampleCheck1">Remember Me</label>
                                </div> */}
                            <button type="submit" onClick={submitForm} class="btn btn-primary">Login</button>
                            {/* </form> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherLogin;