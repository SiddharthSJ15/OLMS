import {Link, useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal  from "sweetalert2";
import CheckQuizInCourse from './CheckQuizInCourse';

const baseUrl='http://127.0.0.1:8000/api'
function AssignQuiz() {
    const [quizData, setquizData] = useState([]);  
    const [courseData, setcourseData] = useState([]); 
    const [assignStatus, setassignStatus] = useState(); 
    const teacherId = localStorage.getItem('teacherId')
    console.log(teacherId)
    const {course_id} = useParams();
    // Fetch Courses
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/course/'+course_id)
            .then((res)=>{
                setcourseData(res.data);
            });
        }catch(error){
            console.log(error);
        }

        try{
            axios.get(baseUrl+'/teacher-quiz/'+teacherId)
            .then((res)=>{
                setquizData(res.data);              
            });
        }catch(error){
            console.log(error);
        }
    }, []);

    // ASSIGN QUIZ TO COURSE
    const assignQuiz = (quiz_id) =>{
        const _formData = new FormData();
        _formData.append('course',course_id);
        _formData.append('teacher',teacherId);
        _formData.append('quiz',quiz_id);    
        try{
            axios.post(baseUrl+'/quiz-assign-course/',_formData,{
                headers: {
                    'content-type' : 'multipart/form-data'
                }
            })
            .then((res)=>{
                if(res.status===200 || res.status===201){
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.onmouseenter = Swal.stopTimer;
                          toast.onmouseleave = Swal.resumeTimer;
                        }
                      });
                      Toast.fire({
                        icon: "success",
                        title: "Successfully Assigned to the course",
                        timer: 3000
                      }).then(function(){
                        window.location.reload()
                      })
                }
                else{
                    Swal.fire({
                        icon: "error",
                        title: "Error joining",
                        toast: true,
                        timer: 1000,
                        timerProgressBar:true,
                        showConfirmButton: false,
                        position: 'top-right',
                     });
                    // setassignStatus('success')
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
                   <TeacherSidebar />
                </aside>
                <section className='col-md-9'>
                    <div className='card'>
                    <h5 className='card-header'>Assign Quiz {`->`} <span className='text-secondary'>{courseData.title}</span></h5>
                        <div className='card-body'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Quiz Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {quizData.map((row,index) =>                                
                                    <tr>
                                        <td>
                                            <Link to={'/all-questions/'+row.id}>{row.title}</Link>                                           
                                        </td>
                                            <CheckQuizInCourse quiz={row.id} course={course_id} />

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

export default AssignQuiz;