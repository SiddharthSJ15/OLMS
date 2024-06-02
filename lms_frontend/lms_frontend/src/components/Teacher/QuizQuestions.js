import {Link, useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import axios from 'axios';
import { useState, useEffect } from 'react';


const baseUrl='http://127.0.0.1:8000/api'

function QuizQuestions() {

    const [questionData, setquestionData] = useState([]);
    const [totalResult, settotalResult] = useState(0);
    const {quiz_id} = useParams();
    console.log(quiz_id)
    // Fetch Courses
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/quiz-questions/'+quiz_id)
            .then((res)=>{
                setquestionData(res.data);
                settotalResult(res.data.length);
                    // console.log(res.data);
              
            });
        }catch(error){
            console.log(error);
        }
    }, []);

    // Delet Data
    const Swal = require('sweetalert2')
    const handleDeleteClick = (question_id) => {
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
                    axios.delete(baseUrl+'/question/'+question_id)
                    .then((res)=>{
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                            });
                        try{
                            axios.get(baseUrl+'/quiz-questions/'+quiz_id)
                            .then((res)=>{
                                setquestionData(res.data);
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
                    title: "Error!",
                    text: "Your file has not been deleted.",
                    icon: "error"
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
                    <h5 className='card-header'>Total Questions: {totalResult} <Link to={'/add-questions/'+quiz_id}><i className="bi bi-file-earmark-plus-fill float-end text-dark bi"></i></Link></h5>
                        <div className='card-body'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Question</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {questionData.map((row,index) =>
                                    <tr>
                                        <td><Link to={'/edit-question/'+row.id}>{row.questions}</Link></td>
                                        <td>
                                        <Link to={'/edit-question/'+row.id} className='btn btn-sm btn-outline-primary'><i className="bi bi-pencil-square"></i></Link>
                                        <button onClick={()=>handleDeleteClick(row.id)} className='btn btn-sm btn-outline-danger ms-1'><i className="bi bi-trash3-fill"></i></button>
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

export default QuizQuestions;