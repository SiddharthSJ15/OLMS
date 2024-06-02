import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal  from "sweetalert2";

const baseUrl='http://127.0.0.1:8000/api'
function AllQuiz() {
    const [quizData, setquizData] = useState([]);    
    const [totalResult, settotalResult] = useState(0);
    const teacherId = localStorage.getItem('teacherId')
    console.log(teacherId)
    // Fetch Courses
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/teacher-quiz/'+teacherId)
            .then((res)=>{
                setquizData(res.data);

                    // console.log(res.data);
              
            });
        }catch(error){
            console.log(error);
        }
    }, []);

    const handleDeleteClick = (quiz_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                try{
                    axios.delete(baseUrl+'/quiz/'+quiz_id)
                    .then((res)=>{
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                            });
                        try{
                            axios.get(baseUrl+'/teacher-quiz/'+teacherId)
                            .then((res)=>{
                                setquizData(res.data);
                                settotalResult(res.data.length);
                              
                            });
                        }catch(error){
                            console.log(error);
                        }
                    });
                    
                }catch(error){
                    Swal.fire({
                        title: "Error!",
                        text: "Your file has not been deleted.",
                        icon: "error"
                        });
                } 
            }
            else{
                Swal.fire({
                    title: "Cancelled!",
                    text: "Your file has not been deleted.",
                    icon: "info"
                    });
            }
          });
    }


    return(
        <div className="container mt-4">
            <div className='row'>
                <aside className='col-md-3'>
                   <TeacherSidebar />
                </aside>
                <section className='col-md-9'>
                    <div className='card'>
                    <h5 className='card-header'>My Quiz</h5>
                        <div className='card-body'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Quiz Name</th>
                                        <th>Total Questions</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {quizData.map((row,index) =>
                                    <tr>
                                        <td>
                                            <Link to={'/all-questions/'+row.id}>{row.title}</Link>
                                            
                                        </td>
                                        <td className='text-start'><Link to='#'>123</Link></td>
                                        <td>                                            
                                        <Link to={'/edit-quiz/'+row.id} className='ms-2 btn btn-info btn-sm'>Edit</Link>
                                            <Link to={'/add-quiz-question/'+row.id} className='ms-2 btn btn-success btn-sm'>Add Questions</Link>                                    
                                            <button onClick={()=>handleDeleteClick(row.id)} className='btn btn-danger btn-sm ms-2'>Delete</button>
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

export default AllQuiz;