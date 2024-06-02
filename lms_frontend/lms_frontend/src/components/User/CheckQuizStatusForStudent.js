import { Link, useParams } from "react-router-dom";
// import TeacherSidebar from "./TeacherSidebar";
import React, {useState, useEffect} from 'react';
import axios from "axios";
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';

function CheckQuizStatusForStudent(props){
    const [quizData, setquizData] = useState([]);
    const studentId = localStorage.getItem('studentId');
    //FE^C
    useEffect(() => {
        try{
            axios.get(`${baseUrl}/fetch-quiz-attempt-status/${props.quiz}/${props.student}`)
            .then((res) => {
                setquizData(res.data);
            });
        }catch(error){
            console.log(error);
        }

    },[]);

    return(          
            
        <td>
        {quizData.bool === false &&
            <Link to={`/take-quiz/${props.quiz}`} className="btn btn-success btn-sm ms-2">Attempt Quiz</Link>
        }
        {quizData.bool === true &&
            <span className="btn text-bg-warning btn-sm ms-2">Attempted</span>
        }
    </td>
    
    );
}

export default CheckQuizStatusForStudent;