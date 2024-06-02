import {Link, useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import axios from 'axios';
import { useState, useEffect } from 'react';

const baseUrl='http://127.0.0.1:8000/api'
function UserList() {
    const [studentData, setstudentData] = useState([]);
    const teacher_id = localStorage.getItem('teacherId')
  
    // Fetch Enrolled Students
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/fetch-all-enrolled-students/'+teacher_id)
            .then((res)=>{
                setstudentData(res.data);
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
                    <h5 className='card-header'>All Student List</h5>
                        <div className='card-body'>
                            <table className='table table-bordered table-hover table-sm'>
                                <thead >
                                    <tr>
                                        <th>Full Name</th>
                                        <th>Email</th>
                                        <th>Username</th>
                                        <th>Interested Categories</th>
                                        <th>Enrolled Course</th>
                                        <th>Assignments</th>
                                    </tr>
                                </thead>
                                <tbody className='table-group-divider'>
                                {studentData.map((row,index) =>
                                    <tr className='align-middle'>
                                        <td>{row.student.full_name}</td>
                                        <td>{row.student.email}</td>
                                        <td>{row.student.username}</td>
                                        <td>{row.student.interested_categories}</td>
                                        <td><Link to={'/all-chapters/'+row.course.id}>{row.course.title}</Link></td>
                                        <td>
                                            <Link to={`/show-assignment/${teacher_id}/${row.student.id}/`} className='btn btn-sm btn-warning ms-2 mt-2'>Assignments</Link>
                                            <hr />
                                            <Link to={`/add-assignment/${teacher_id}/${row.student.id}/`} className='btn btn-sm btn-success ms-2 mb-2'>Add Assignments</Link>
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

export default UserList;