import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl='http://127.0.0.1:8000/api';
function AddQuiz() {
    const [quizData, setquizData] = useState({
        'title':'',
        'detail':'',
    });

    const handleChange=(event)=>{
        setquizData({
            ...quizData,
            [event.target.name]:event.target.value
        })
    };

    const teacherId = localStorage.getItem('teacherId')
    const formSubmit=()=>{
        const _formData = new FormData();
        _formData.append('teacher',teacherId);
        _formData.append('title',quizData.title);
        _formData.append('detail',quizData.detail);
        _formData.append('techs',quizData.techs);

        try{
            axios.post(baseUrl+'/quiz/',_formData)
            .then((res)=>{
                if(res.status===200 || res.status===201 ){
                    Swal.fire({
                        title: 'Assignment has been uploaded',
                        icon: 'success',
                        timer:2000,
                        toast: true,
                        position: 'top-end',
                        timerProgressBar: true,
                        showConfirmButton: false,                                           
                    })
                      .then(function(){ 
                          window.location.href='/add-quiz'
                      });
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
                            <h5 className='card-header'>Add Course</h5>
                            <div className='card-body'>
                                    <div class="mb-3">
                                        <label for="exampleInputEmail1" class="form-label">Title</label>
                                        <input type="text" onChange={handleChange} name='title' class="form-control" id="title" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleInputEmail1" class="form-label">Detail</label>
                                        <textarea type="text" name="detail" onChange={handleChange} class="form-control" id="description" />
                                    </div>
                                    <hr />
                                    <button type="submit" onClick={formSubmit} class="btn btn-primary">Add Quiz</button>
                                {/* </form> */}
                            </div>
                        
                    </div>
                </section>
            </div>
        </div>
    );
}

export default AddQuiz;