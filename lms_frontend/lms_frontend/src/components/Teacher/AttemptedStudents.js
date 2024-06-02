import {Link, useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal  from "sweetalert2";
import QuizResult from './QuizResult';

const baseUrl='http://127.0.0.1:8000/api'
function AttemptedStudents() {
    const [studentData, setstudentData] = useState([]);
    const teacherId = localStorage.getItem('teacherId')
    console.log(teacherId)
    const {quiz_id} = useParams();
    // Fetch Courses
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/attempted-quiz/'+quiz_id)
            .then((res)=>{
                setstudentData(res.data);
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
                    <h5 className='card-header'>Student List</h5>
                        <div className='card-body'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Username</th>
                                        <th>Results</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {studentData.map((row,index) =>                                
                                    <tr>
                                        <td>{row.student.full_name}</td>
                                        <td>{row.student.email}</td>
                                        <td>{row.student.username}</td>
                                        <td>
                                         {/* Button trigger modal  */}
                                            <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target={`#resultModal${row.id}`}>
                                            Quiz Result
                                            </button>  
                                            <div className="modal fade" id={`resultModal${row.id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <QuizResult quiz={row.quiz.id} student={row.student.id}/>
                                            </div>                                       
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

export default AttemptedStudents;