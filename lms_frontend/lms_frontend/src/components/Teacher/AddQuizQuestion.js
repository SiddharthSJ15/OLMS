import {useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl='http://127.0.0.1:8000/api';
function AddQuizQuestion() {

    const [questionData, setquestionData] = useState({
        title:'',
        question:'',
        ans1:'',
        ans2:'',
        ans3:'',
        ans4:'',
        right_ans:''

    });

    // console.log(cats)
    const handleChange=(event)=>{
        setquestionData({
            ...questionData,
            [event.target.name]:event.target.value
        })
    };

    const {quiz_id} = useParams();

    const formSubmit=()=>{
        const _formData = new FormData();
        _formData.append('quiz',quiz_id);
        _formData.append('questions',questionData.questions);
        _formData.append('ans1',questionData.ans1);
        _formData.append('ans2',questionData.ans2);
        _formData.append('ans3',questionData.ans3);
        _formData.append('ans4',questionData.ans4);
        _formData.append('right_ans',questionData.right_ans);

        try{
            axios.post(baseUrl+'/quiz-questions/'+quiz_id,_formData,{
                
            })
            .then((res)=>{
                if(res.status===200||res.status===201){
                    Swal.fire({
                        title: 'Question has been uploaded',
                        icon: 'success',
                        timer:2000,
                        toast: true,
                        position: 'top-end',
                        timerProgressBar: true,
                        showConfirmButton: false
                    })
                    .then(function(){ 
                        window.location.reload();
                    })
                }
            });
        }
        catch(error) {
            console.log(error);
        }
    };

    return(
        <div className="container mt-4">
            <div className='row'>
            <aside className='col-md-3'>
                   <TeacherSidebar />
                </aside>
                <section className='col-md-9'>
                        <div className='card'>
                            <h5 className='card-header'>Add Questions</h5>
                            <div className='card-body'>
                                {/* <form> */}
                                <div class="mb-1">
                                        <label for="title" class="form-label">Title</label>
                                        <input type="text" onChange={handleChange} name='questions' class="form-control" id="title" />
                                    </div>
                                    <div class="mb-1">
                                        <label for="ans1" class="form-label">ANS 1</label>
                                        <input type="text" onChange={handleChange} name='ans1' class="form-control" id="ans1" />
                                    </div>
                                    <div class="mb-1">
                                        <label for="ans3" class="form-label">ANS 2</label>
                                        <input type="text" onChange={handleChange} name='ans2' class="form-control" id="ans2" />
                                    </div>
                                    <div class="mb-1">
                                        <label for="ans3" class="form-label">ANS 3</label>
                                        <input type="text" onChange={handleChange} name='ans3' class="form-control" id="ans3" />
                                    </div>
                                    <div class="mb-1">
                                        <label for="ans4" class="form-label">ANS 4</label>
                                        <input type="text" onChange={handleChange} name='ans4' class="form-control" id="ans4" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="right_ans" class="form-label">Correct Answer</label>
                                        <input type="text" onChange={handleChange} name='right_ans' class="form-control" id="right_ans" placeholder='Enter the correct answer' />
                                    </div>
                                    <hr />
                                    <button type="button" onClick={formSubmit} class="btn btn-primary">Submit</button>
                                {/* </form> */}
                            </div>
                        
                    </div>
                </section>
            </div>
        </div>
    );
}

export default AddQuizQuestion;