import {Link, useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import axios from 'axios';
import { useState, useEffect } from 'react';


const baseUrl='http://127.0.0.1:8000/api'

function ShowAssignment() {

    const [assignmentData, setassignmentData] = useState([]);
    const [totalResult, settotalResult] = useState(0);
    const {teacher_id} = useParams();
    const {student_id} = useParams();
    // Fetch Courses
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/student-assignment/'+teacher_id+'/'+student_id)
            .then((res)=>{
                setassignmentData(res.data);
                settotalResult(res.data.length);
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
                    <h5 className='card-header'>Total Assignemts: {totalResult} <Link to={'/add-assignment/'+teacher_id+'/'+student_id}><i className="bi bi-file-earmark-plus-fill float-end text-dark bi" title='Add new Assignments'></i></Link></h5>
                        <div className='card-body'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Title</th>                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {assignmentData.map((row,index) =>
                                    <tr>
                                        <td>{row.title}</td>
                                        <td>
                                        {row.student_status!==true &&
                                            <span className='badge text-bg-warning btn-sm'>Pending</span>
                                            }
                                            {row.student_status===true &&
                                                // <button onClick={markAsDone} className='btn btn-sm btn-success'>Mark as done</button>
                                                <span className='badge text-bg-success btn-sm'>Completed</span>
                                            }                                       
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

export default ShowAssignment;