import { Link, useParams } from "react-router-dom";
// import TeacherSidebar from "./TeacherSidebar";
import React, {useState, useEffect} from 'react';
import axios from "axios";
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';

function CheckQuizInCourse(props){
    const [quizData, setquizData] = useState([]);
    const teacherId = localStorage.getItem('teacherId');
    //FE^C
    useEffect(() => {
        try{
            axios.get(`${baseUrl}/fetch-quiz-assign-status/${props.quiz}/${props.course}`)
            .then((res) => {
                setquizData(res.data);
            });
        }catch(error){
            console.log(error);
        }

    },[]);

    const assignQuiz = (quiz_id)=>{
        // e.preventDefault();
        const _formData = new FormData();
        _formData.append('quiz', props.quiz);
        _formData.append('teacher', teacherId);
        _formData.append('course', props.course);

        try{
            axios.post(baseUrl + '/quiz-assign-course/', _formData,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((res) => {
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
                        timer: 3000,
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


    // console.log(CourseData);

    return(
            
            <td>
                {quizData.bool === false &&
                <button onClick={()=>assignQuiz(props.quiz)} className="btn btn-success btn-sm ms-2">Assign Quiz</button>
                }
                {quizData.bool === true &&
                <>
                    <span className="btn btn-secondary btn-sm ms-2">Assigned</span>
                
                    <Link to={`/attempted-students/`+props.quiz} className="btn btn-primary ms-2 btn-sm">Attempted Students</Link>
                </>
                }
            </td>
    
    );
}

export default CheckQuizInCourse;