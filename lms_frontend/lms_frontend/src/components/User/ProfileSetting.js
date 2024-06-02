import {Link} from 'react-router-dom';
import Sidebar from './Sidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl="http://127.0.0.1:8000/api";

function ProfileSetting() {

    const studentId = localStorage.getItem('studentId')

    const [studentData, setstudentData] = useState({
        'full_name':'',
        'email':'',
        'username':'',
        'interested_categories':'',
        'prev_img':'',
        'profile_img':'',
    });

    // CHANGE ELEMENT VALUES

    useEffect(()=>{

        // Fetch Current Teacher details
        try{
            axios.get(baseUrl+'/student/'+studentId+'/')
            .then((res)=>{
                setstudentData({
                    full_name:res.data.full_name,
                    email:res.data.email,
                    username:res.data.username,
                    interested_categories:res.data.interested_categories,
                    prev_img:res.data.profile_img,
                    profile_img:'',
                });
            });
        }catch(error){
            console.log(error);
        } 
        // END

    }, []);

    const handleChange = (event) => {
        setstudentData({
            ...studentData,
            [event.target.name]:event.target.value
        });
    }

    const handleFileChange=(event)=>{
        setstudentData({
            ...studentData,
            [event.target.name]:event.target.files[0]
        })            
    };

    const submitForm=()=>{
        const studentFormdata =  new FormData();
        studentFormdata.append('full_name',studentData.full_name)
        studentFormdata.append('email',studentData.email)
        studentFormdata.append('username',studentData.username)
        studentFormdata.append('interested_categories',studentData.interested_categories)
        if(studentData.profile_img !== ''){
            studentFormdata.append('profile_img',studentData.profile_img, studentData.profile_img.name);
        }
        
        try{
            axios.put(baseUrl+'/student/'+studentId+'/',studentFormdata,{
                headers: {
                    'content-type' : 'multipart/form-data'
                }
            }).then((response)=>{
                if(response.status===200){
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 1000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.onmouseenter = Swal.stopTimer;
                          toast.onmouseleave = Swal.resumeTimer;
                        }
                      });
                      Toast.fire({
                        icon: "success",
                        title: "Updated successfully"
                      }).then(function(){                        
                        window.location.reload();                        
                      })
                }
            });
        }catch(error){
            console.log(error)
            setstudentData({'status':'error'})
        }
    };

    useEffect(()=>{
        document.title='Student Profile'
    });
    const studentLoginStatus = localStorage.getItem('studentLoginStatus')
    if(studentLoginStatus!=='true') {
        window.location.href='/user-login'
    }
    
    return(
        
        <div className="container mt-4">
            <div className='row'>
                <aside className='col-md-3'>
                   <Sidebar />
                </aside>
                <section className='col-md-9'>
                    <div className='card'>
                        <h5 className='card-header'>Profile Settings</h5>
                        <div className='card-body'>
                            <div className="mb-3 row">
                                <label for="staticName" className="col-sm-2 col-form-label">Full Name</label>
                                <div className="col-sm-10">
                                    <input type="text" name="full_name" value={studentData.full_name} onChange={handleChange} readonly className="form-control" id="staticEmail"/>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-10">
                                    <input type="text" name='email' value={studentData.email} onChange={handleChange} readonly className="form-control" id="staticEmail"/>
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="exampleInputEmail1" className="col-sm-2 form-label">Username</label>
                                <div className="col-sm-10">
                                    <input name="mobile_no" onChange={handleChange} type="text" value={studentData.username} className="form-control" />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label for="staticEmail" className="col-sm-2 col-form-label">Profile Photo</label>
                                <div className="col-sm-10">
                                    <input type="file" name='profile_img' onChange={handleFileChange} readonly className="form-control" id="staticEmail"/>
                                    { studentData.prev_img &&
                                        <img src={studentData.prev_img} width="50%" className='mt-3' alt={studentData.name}/>
                                    }
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label for="staticName" className="col-sm-2 col-form-label">Interested Categories</label>
                                <div className="col-sm-10">
                                    <textarea type="text" name='qualification' value={studentData.interested_categories} onChange={handleChange} readonly className="form-control" id="staticEmail"></textarea>
                                <div className='form-text fst-italic'>Php, Python, Java, etc.</div>
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

export default ProfileSetting;