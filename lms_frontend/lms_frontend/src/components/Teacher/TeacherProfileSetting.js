import {Link} from 'react-router-dom';
import Sidebar from './TeacherSidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl="http://127.0.0.1:8000/api";

function TeacherProfileSetting() {

    const teacherId = localStorage.getItem('teacherId')

    const [teacherData, setteacherData] = useState({
        'full_name':'',
        'email':'',
        'qualification':'',
        'mobile_no':'',
        'skills':'',
        'prev_img':'',
        'profile_img':'',
        'status':''
    });

    // CHANGE ELEMENT VALUES

    useEffect(()=>{

        // Fetch Current Teacher details
        try{
            axios.get(baseUrl+'/teacher/'+teacherId+'/')
            .then((res)=>{
                setteacherData({
                    full_name:res.data.full_name,
                    email:res.data.email,
                    qualification:res.data.qualification,
                    skills:res.data.skills,
                    mobile_no:res.data.mobile_no,
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
        setteacherData({
            ...teacherData,
            [event.target.name]:event.target.value
        });
    }

    const handleFileChange=(event)=>{
        setteacherData({
            ...teacherData,
            [event.target.name]:event.target.files[0]
        })            
    };

    const submitForm=()=>{
        const teacherFormdata =  new FormData();
        teacherFormdata.append('full_name',teacherData.full_name)
        teacherFormdata.append('email',teacherData.email)
        teacherFormdata.append('qualification',teacherData.qualification)
        teacherFormdata.append('mobile_no',teacherData.mobile_no)
        teacherFormdata.append('skills',teacherData.skills)
        if(teacherData.profile_img !== ''){
            teacherFormdata.append('profile_img',teacherData.profile_img, teacherData.profile_img.name);
        }
        
        try{
            axios.put(baseUrl+'/teacher/'+teacherId+'/',teacherFormdata,{
                headers: {
                    'content-type' : 'multipart/form-data'
                }
            }).then((response)=>{
                if(response.status===200){
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.onmouseenter = Swal.stopTimer;
                          toast.onmouseleave = Swal.resumeTimer;
                        }
                      });
                      Toast.fire({
                        icon: "success",
                        title: "Updated successfully"
                      });
                      window.location.reload();
                }
            });
        }catch(error){
            console.log(error)
            setteacherData({'status':'error'})
        }
    };

    useEffect(()=>{
        document.title='Teacher Profile'
    });
    const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
    if(teacherLoginStatus!=='true') {
        window.location.href='/teacher-login'
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
                                    <input type="text" name="full_name" value={teacherData.full_name} onChange={handleChange} readonly className="form-control" id="staticEmail"/>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-10">
                                    <input type="text" name='email' value={teacherData.email} onChange={handleChange} readonly className="form-control" id="staticEmail"/>
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="exampleInputEmail1" className="col-sm-2 form-label">Mobile Number</label>
                                <div className="col-sm-10">
                                    <input name="mobile_no" onChange={handleChange} type="text" value={teacherData.mobile_no} className="form-control" />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label for="staticEmail" className="col-sm-2 col-form-label">Profile Photo</label>
                                <div className="col-sm-10">
                                    <input type="file" name='profile_img' onChange={handleFileChange} readonly className="form-control" id="staticEmail"/>
                                    { teacherData.prev_img &&
                                        <img src={teacherData.prev_img} width="50%" className='mt-3' alt={teacherData.name}/>
                                    }
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label for="staticName" className="col-sm-2 col-form-label">Qualification</label>
                                <div className="col-sm-10">
                                    <textarea type="text" name='qualification' value={teacherData.qualification} onChange={handleChange} readonly className="form-control" id="staticEmail"></textarea>
                                <div className='form-text fst-italic'>BCA, MCA, BTech, etc.</div>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label for="staticEmail" className="col-sm-2 col-form-label">Skills</label>
                                <div className="col-sm-10">
                                    <textarea type="text" name='skills' value={teacherData.skills} onChange={handleChange} readonly className="form-control" id="staticEmail"></textarea>
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

export default TeacherProfileSetting;