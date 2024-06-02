import {Link, useParams} from 'react-router-dom';
import Sidebar from './Sidebar';
import axios from 'axios';
import { useState, useEffect } from 'react';
import CheckQuizStatusForStudent from './CheckQuizStatusForStudent';

const baseUrl='http://127.0.0.1:8000/api'

function CourseQuizList() {

    
    const [quizData, setquizData] = useState([]);
    const student_id = localStorage.getItem('studentId')
    console.log(student_id)
    const {course_id} = useParams();
    // Fetch Enrolled Student Course 
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/fetch-assigned-quiz/'+course_id+'/')
            .then((res)=>{
                setquizData(res.data);
                    // console.log(res.data);              
            });
        }catch(error){
            console.log(error);
        }
        document.title='Quiz List'
    }, []);

    return(
        <div className="container mt-4">
            <div className='row'>
                <aside className='col-md-3'>
                   <Sidebar />
                </aside>
                <section className='col-md-9'>
                    <div className='card'>
                    <h5 className='card-header'>Quiz List</h5>
                        <div className='card-body'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Quiz</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {quizData.map((row,index)=>  
                                    <tr>                                        
                                        <td>{row.quiz.title}</td>
                                        <td>
                                            <CheckQuizStatusForStudent quiz={row.quiz.id} student={student_id}/>
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

export default CourseQuizList;