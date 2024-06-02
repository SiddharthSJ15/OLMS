import {Link} from 'react-router-dom';
import TeacherSidebar from '../Teacher/TeacherSidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl='http://127.0.0.1:8000/api';

function TeacherDashboard() {
    const [dashboardData, setdashboardData] = useState([]);    
    const [teacherData, setteacherData] = useState([]);
    const teacherId = localStorage.getItem('teacherId')
    
    useEffect(()=>{

        try{
            axios.get(baseUrl+'/teacher/'+teacherId+'/')
            .then((res)=>{
                setteacherData(res.data);
            });
        }catch(error){
            console.log(error);
        }

        try{
            axios.get(baseUrl+'/teacher/dashboard/'+teacherId+'/')
            .then((res)=>{
                console.log(res)
                    setdashboardData(res.data);                    
                    // setteacherData(res.data.teacher);
                    // console.log(res.data);
              
            });
        }catch(error){
            console.log(error);
        }
    }, []);
    
    return(
        <div className="container mt-4">
            <div className='row'>
                <aside className='col-md-3'>
                   <TeacherSidebar />
                </aside>
                <section className='col-md-9'>

                    <div class="card mb-3" style={{maxWidth: '100%'}}>
                        <div class="row g-0">
                            <div class="col-md-4">
                            <img src={teacherData.profile_img} class="img-fluid rounded-start" alt="..." />
                            </div>
                            <div class="col-md-8">

                                <div class="card-body">
                                    <h5 class="card-title">{teacherData.full_name}</h5>
                                    <p class="card-text"><small class="text-body-secondary">Contact: {teacherData.mobile_no}</small></p>
                                    <p class="card-text"><small class="text-body-secondary">Email: {teacherData.email}</small></p>
                                    <p class="card-text"><small class="text-body-secondary">Qualification: {teacherData.qualification}</small></p>
                                    <p class="card-text"><small class="text-body-secondary">My Skills: {teacherData.skills}</small></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row row-cols-1 row-cols-md-3 g-4">
                        <div class="col">
                            <div class="card h-100">
                                <div class="card-body">
                                    <h5 class="card-title">Total Courses</h5>
                                    {/* <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p> */}
                                </div>
                                <div class="card-footer">
                                    <small class="text-body-secondary"><Link to='/teacher-course'>{dashboardData.total_teacher_courses}</Link></small>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card h-100">
                                <div class="card-body">
                                    <h5 class="card-title">Total Chapters</h5>
                                    {/* <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p> */}
                                </div>
                                <div class="card-footer">
                                    <small class="text-body-secondary"><Link to='/teacher-chapters'>{dashboardData.total_teacher_chapters}</Link></small>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card h-100">
                                <div class="card-body">
                                    <h5 class="card-title">Total Students</h5>
                                    {/* <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p> */}
                                </div>
                                <div class="card-footer">
                                    <small class="text-body-secondary "><Link to='/teacher-users'>{dashboardData.total_teacher_student}</Link></small>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default TeacherDashboard;