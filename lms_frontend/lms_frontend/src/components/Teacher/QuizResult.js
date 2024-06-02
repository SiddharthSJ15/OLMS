import { Link, useParams } from "react-router-dom";
// import TeacherSidebar from "./TeacherSidebar";
import React, {useState, useEffect} from 'react';
import axios from "axios";
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';

function QuizResult(props){
    const [resultData, setresultData] = useState([]);
    const {course_id} =useParams();

    useEffect(() => {
        try{
            axios.get(`${baseUrl}/fetch-quiz-result/${props.quiz}/${props.student}`)
            .then((res) => {
                setresultData(res.data);
            });
        }catch(error){
            console.log(error);
        }

    },[]);

    return(
            

        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Quiz Result</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <table className='table table-bordered'>
                        <tr>
                            <th>Total Questions</th>
                            <td>{resultData.total_questions}</td>
                        </tr>
                        <tr>
                            <th>Attempted Questions</th>
                            <td>{resultData.total_attempted_questions}</td>
                        </tr>
                        <tr>
                            <th>Correct Answers</th>
                            <td>{resultData.total_correct_ans}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        
    );
}

export default QuizResult;