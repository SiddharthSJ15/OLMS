import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import axios from 'axios';
import { useState, useEffect } from 'react';

const baseUrl='http://127.0.0.1:8000/api'
function TeacherCourses() {
    const [courseData, setcourseData] = useState([]);
    const teacherId = localStorage.getItem('teacherId')
    console.log(teacherId)
    // Fetch Courses
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/teacher-courses/'+teacherId)
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
                   <TeacherSidebar />
                </aside>
                <section className='col-md-9'>
                    <div className='card'>
                    <h5 className='card-header'>My Courses</h5>
                        <div className='card-body'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Course Name</th>
                                        <th>Course Image</th>
                                        <th>Enrolled Students</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {courseData.map((course,index) =>
                                    <tr>
                                        <td>
                                            <Link to={'/all-chapters/'+course.id}>{course.title}</Link>
                                            <hr/>
                                            {course.course_rating &&
                                               <span>Rating: {course.course_rating}/5</span>
                                            }
                                            {!course.course_rating &&
                                               <span>Rating: Not rated</span>
                                            }
                                        </td>
                                        <td><img src={course.featured_img} width="80" className='rounded' alt={course.title} /></td>
                                        <td className='text-start'><Link to={'/enrolled-students/'+course.id}>{course.total_enrolled_students}</Link></td>
                                        <td>                                        
                                            <Link to={'/study-materials/'+course.id} className='ms-2 btn btn-primary btn-sm'>Study Materials</Link>
                                            <Link to={'/add-chapter/'+course.id} className='ms-2 btn btn-success btn-sm'>Add Chapters</Link>
                                            <Link to={'/assign-quiz/'+course.id} className='btn btn-warning btn-sm ms-2'>Assign Quiz</Link>
                                            <Link to={'/edit-course/'+course.id} className='ms-2 btn btn-info btn-sm'>Edit</Link>
                                            <button className='btn btn-danger btn-sm ms-2'>Delete</button>
                                        </td>
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

export default TeacherCourses;