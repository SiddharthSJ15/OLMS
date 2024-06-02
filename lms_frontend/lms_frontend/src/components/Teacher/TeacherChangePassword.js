import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl="http://127.0.0.1:8000/api";

function TeacherChangePassword() {
    const teacherId = localStorage.getItem('teacherId')

    const [teacherData, setteacherData] = useState({
        'password':'',
    });

    const handleChange = (event) => {
        setteacherData({
            ...teacherData,
            [event.target.name]:event.target.value
        });
    }

    const submitForm=()=>{
        const teacherFormdata =  new FormData();
        teacherFormdata.append('password',teacherData.password)
        
        try{
            axios.post(baseUrl+'/teacher/change-password/'+teacherId+'/',teacherFormdata)
            .then((response)=>{
                if(response.status===200){
                      window.location.href='/teacher-logout'
                }else{
                    alert('Oops! Some error occured.');
                }
            });
        }catch(error){
            console.log(error)
            setteacherData({'status':'error'})
        }
    };

    useEffect(()=>{
        document.title='Update Password'
    });
    const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
    if(teacherLoginStatus!=='true') {
        window.location.href='/teacher-login'
    }

    return(
        <div className="container mt-4">
            <div className='row'>
                <aside className='col-md-3'>
                   <TeacherSidebar />
                </aside>
                <section className='col-md-9'>
                    <div className='card'>
                        <h5 className='card-header'>Change Password</h5>
                        <div className='card-body'>
                            <div className="mb-3 row">
                                <label for="staticName" className="col-sm-2 col-form-label">New Password</label>
                                <div className="col-sm-10">
                                <input type="text" name='password' value={teacherData.password} onChange={handleChange} className="form-control" id="staticEmail"/>
                                </div>
                            </div>
                            <div>
                                <hr />
                                <button className="btn btn-primary" onClick={submitForm} id="inputPassword">Update</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default TeacherChangePassword;