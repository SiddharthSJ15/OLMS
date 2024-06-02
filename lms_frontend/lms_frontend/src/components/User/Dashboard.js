import {Link} from 'react-router-dom';
import Sidebar from '../User/Sidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl='http://127.0.0.1:8000/api';

function Dashboard() {
    const [dashboardData, setdashboardData] = useState([]);    
    const [studentData, setstudentData] = useState([]);
    const studentId = localStorage.getItem('studentId')
    
    useEffect(()=>{

        try{
            axios.get(baseUrl+'/student/'+studentId+'/')
            .then((res)=>{
                setstudentData(res.data);
            });
        }catch(error){
            console.log(error);
        }

        try{
            axios.get(baseUrl+'/student/dashboard/'+studentId+'/')
            .then((res)=>{
                console.log(res)
                    setdashboardData(res.data);                    
                    // setstudentData(res.data.teacher);
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
                   <Sidebar />
                </aside>
                <section className='col-md-9'>

                    <div class="card mb-3" style={{maxWidth: '100%'}}>
                        <div class="row g-0">
                            <div class="col-md-4">
                            <img src={studentData.profile_img} class="img-fluid rounded-start" alt="..." />
                            </div>
                            <div class="col-md-8">

                                <div class="card-body">
                                    <h5 class="card-title">{studentData.full_name}</h5>
                                    <p class="card-text"><small class="text-body-secondary">Username: {studentData.username}</small></p>
                                    <p class="card-text"><small class="text-body-secondary">Email: {studentData.email}</small></p>
                                    <p class="card-text"><small class="text-body-secondary">Interested Courses: {studentData.interested_categories}</small></p>
                                    {/* <p class="card-text"><small class="text-body-secondary">My Skills: {studentData.skills}</small></p> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row row-cols-1 row-cols-md-3 g-4">
                        <div class="col">
                            <div class="card h-100">
                                <div class="card-body">
                                    <h5 class="card-title">Enrolled Courses</h5>
                                    {/* <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p> */}
                                </div>
                                <div class="card-footer">
                                    <small class="text-body-secondary"><Link to='/my-courses'><h5>{dashboardData.enrolled_courses}</h5></Link></small>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card h-100">
                                <div class="card-body">
                                    <h5 class="card-title">Favorite Chapters</h5>
                                    {/* <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p> */}
                                </div>
                                <div class="card-footer">
                                    <small class="text-body-secondary"><Link to='/favorite-courses'><h5>{dashboardData.favorite_courses}</h5></Link></small>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card h-100">
                                <div class="card-body">
                                    <h5 class="card-title">Assignments</h5>
                                    {/* <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p> */}
                                </div>
                                <div class="card-footer">
                                    <small class="text-body-secondary ">Completed Assignments: {dashboardData.complete_assignments}</small>
                                    <hr />
                                    <small class="text-body-secondary ">Pending Assignments: {dashboardData.pending_assignments}
                                    <Link to='/my-assignments' title='Pending Assignment'><i  className="bi bi-info-circle text-danger  ms-2"></i></Link>
                                    </small>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Dashboard;