import {Link} from 'react-router-dom';
import Sidebar from './Sidebar';
import axios from 'axios';
import { useState, useEffect } from 'react';

const baseUrl='http://127.0.0.1:8000/api'

function RecommendedCourses() {

    
    const [courseData, setcourseData] = useState([]);
    const studentId = localStorage.getItem('studentId')
    console.log(studentId)

    // Fetch Enrolled Student Course 
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/fetch-recommended-courses/'+studentId+'/')
            .then((res)=>{
                setcourseData(res.data);
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
                    <div className='card'>
                    <h5 className='card-header'>My Courses</h5>
                        <div className='card-body'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Course Name</th>
                                        <th>Technologies</th>
                                        {/* <th>Action</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                {courseData.map((course,index) =>
                                    <tr>
                                        <td><Link >{course.title}</Link></td>
                                        <td>{course.techs}</td>
                                        {/* <td>
                                            <button className='btn btn-danger btn-sm active'>Exit Course</button>
                                        </td> */}
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default RecommendedCourses;