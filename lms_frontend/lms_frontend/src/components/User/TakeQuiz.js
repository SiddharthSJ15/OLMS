import {Link, useParams} from 'react-router-dom';
import Sidebar from './Sidebar';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import CheckQuizStatusForStudent from './CheckQuizStatusForStudent';

const baseUrl='http://127.0.0.1:8000/api'

function TakeQuiz() {    
    const [courseData, setcourseData] = useState([]);
    const [questionData, setquestionData] = useState([]);
    const {quiz_id} = useParams();
    console.log(quiz_id)
    const student_id = localStorage.getItem('studentId')
    console.log(student_id)

    // Fetch Enrolled Student Course 
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/quiz-questions/'+quiz_id+'/1')
            .then((res)=>{
                setquestionData(res.data);
                    // console.log(res.data);              
            });
        }catch(error){
            console.log(error);
        }
    }, []);

    const submitAnswer = (question_id,right_ans) =>{
            const _formData = new FormData();
            _formData.append('student',student_id);
            _formData.append('quiz',quiz_id);
            _formData.append('question',question_id);
            _formData.append('right_ans',right_ans);
    
            try{
                axios.post(baseUrl+'/attempt-quiz/',_formData,{
                    
                })
                .then((res)=>{
                    if(res.status===200||res.status===201){
                        Swal.fire({
                            title: 'Answer Submitted, Going to Next Question',
                            icon: 'success',
                            timer:1000,
                            toast: true,
                            position: 'top-end',
                            timerProgressBar: true,
                            showConfirmButton: false
                        })
                        .then(function(){ 
                            try{
                                axios.get(baseUrl+'/quiz-questions/'+quiz_id+'/next-question/'+question_id)
                                .then((res)=>{
                                    setquestionData(res.data);
                                        // console.log(res.data);              
                                });
                            }catch(error){
                                console.log(error);
                            }
                        })
                    }
                });
            }
            catch(error) {
                console.log(error);
            }
    }

    return(
        <div className="container mt-4">
            <div className='row'>
                <aside className='col-md-3'>
                   <Sidebar />
                </aside>
                <section className='col-md-9'>
                    <div className='card'>
                    <h5 className='card-header'>Quiz Title</h5>
                        <div className='card-body'>
                            
                        {questionData.map((row,index)=> 
                            <>
                            <li className='h5 ms-2'>{row.questions}</li>
                            <table className='table table-bordered'>
                                <tbody>                                    
                                        <tr>
                                            <td><button onClick={()=>submitAnswer(row.id,row.ans1)} className='ms-5 btn btn-outline-secondary'>{row.ans1}</button></td>
                                        </tr>
                                        <tr>
                                            <td><button onClick={()=>submitAnswer(row.id,row.ans2)} className='ms-5 btn btn-outline-secondary'>{row.ans2}</button></td>
                                        </tr>
                                        <tr>
                                            <td><button onClick={()=>submitAnswer(row.id,row.ans3)} className='ms-5 btn btn-outline-secondary'>{row.ans3}</button></td>
                                        </tr>
                                        <tr>
                                            <td><button onClick={()=>submitAnswer(row.id,row.ans4)} className='ms-5 btn btn-outline-secondary'>{row.ans4}</button></td>
                                        </tr>
                                </tbody>
                            </table>
                            </>
                            )}
                            {questionData.length === 0 &&
                                <span className='text-primary h5'>No More Questions</span>
                            }
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default TakeQuiz;