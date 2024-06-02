import {Link} from 'react-router-dom';
import Sidebar from './Sidebar';
import axios from 'axios';
import { useState, useEffect } from 'react';

const baseUrl='http://127.0.0.1:8000/api'

function MyCourses() {

    
    const [courseData, setcourseData] = useState([]);
    const student_id = localStorage.getItem('studentId')
    console.log(student_id)

    // Fetch Enrolled Student Course 
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/fetch-enrolled-courses/'+student_id+'/  ')
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
                                        <th>Created By</th>
                                        <th>Quiz</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {courseData.map((row,index) =>
                                    <tr>                                        
                                        <td><Link to={`/detail/${row.course.id}`}>{row.course.title}</Link></td>
                                        <td><Link to={`/teacher-detail/${row.course.teacher.id}`}>{row.course.teacher.full_name}</Link></td>
                                        <td><Link to={'/user/study-materials/'+row.course.id} className='ms-2 btn btn-warning btn-sm'>Study Materials</Link>
                                        <Link to={`/course-quiz/${row.course.id}`} className='btn btn-sm btn-primary ms-2'>Quiz List</Link></td> 
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

export default MyCourses;