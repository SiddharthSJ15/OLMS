import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl='http://127.0.0.1:8000/api';
function Login() {

    const [studentLoginData, setstudentData] = useState({
        email:'',
        password:'' 
     });
 
     const [errorMsg, seterrorMsg] = useState('')
     
     const handleChange=(event)=>{
        setstudentData({
             ...studentLoginData,
             [event.target.name]:event.target.value
         });
     }

     const submitForm=()=>{
        const studentFormData = new FormData();
        studentFormData.append('email',studentLoginData.email)
        studentFormData.append('password',studentLoginData.password)
        try{
            axios.post(baseUrl+'/student-login',studentFormData)
            .then((res)=>{
                if(res.data.bool===true){
                    localStorage.setItem('studentLoginStatus',true);
                    localStorage.setItem('studentId',res.data.student_id);
                    window.location.href='/user-dashboard';
                }
                else{
                    seterrorMsg('Invalid Email or Password')
                }
            });
        }catch(error){
            console.log(error);
        }
    }

    const studentLoginStatus = localStorage.getItem('studentLoginStatus');
    if(studentLoginStatus==='true') {
        window.location.href='/user-dashboard'
    }

    useEffect(()=>{
        document.title='Student Login'
    });


    return(
        <div className="container mt-4">
            <div className='row'>
                <div className='col-6 offset-3'>                
                    <div className='card'>
                        <h5 className='card-header'>Student Login</h5>
                        <div className='card-body'>
                        {errorMsg && <p className='text-danger'>{errorMsg}</p>}
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                                    <input type="email" name="email" onChange={handleChange} class="form-control" value={studentLoginData.email} />
                                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Password</label>
                                    <input type="password" name="password" onChange={handleChange} class="form-control" value={studentLoginData.password} />
                                </div>
                                {/* <div class="mb-3 form-check">
                                    <input type="checkbox" name="password" onChange={handleChange} class="form-check-input" id="exampleCheck1" />
                                    <label class="form-check-label" for="exampleCheck1">Remember Me</label>
                                </div> */}
                            <button type="submit" onClick={submitForm} class="btn btn-primary">Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;