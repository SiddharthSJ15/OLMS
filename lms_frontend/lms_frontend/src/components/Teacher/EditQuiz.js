import {Link, useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl='http://127.0.0.1:8000/api';
function EditQuiz() {
    const [quizData, setquizData] = useState({
        title:'',
        detail:'',
    });


    const {quiz_id} = useParams();
    useEffect(()=>{

        // Fetch Current quiz details
        try{
            axios.get(baseUrl+'/teacher-quiz-detail/'+quiz_id)
            .then((res)=>{

                setquizData({
                    title:res.data.title,
                    detail:res.data.detail,
                });
            });
        }catch(error){
            console.log(error);
        } 
        // END

    }, []);
    // console.log(cats)
    const handleChange=(event)=>{
        setquizData({
            ...quizData,
            [event.target.name]:event.target.value
        })
    };

    const teacher_id = localStorage.getItem('teacherId')
    const formSubmit=()=>{
        const _formData = new FormData();
        _formData.append('teacher',teacher_id);
        _formData.append('title',quizData.title);
        _formData.append('detail',quizData.detail);
        try{
            axios.put(baseUrl+'/teacher-quiz-detail/'+quiz_id,_formData,{

            })
            .then((res)=>{
                // console.log(res.data);
                if(res.status===200){
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 1000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.onmouseenter = Swal.stopTimer;
                          toast.onmouseleave = Swal.resumeTimer;
                        }
                      });
                      Toast.fire({
                        icon: "success",
                        title: "Updated successfully"
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
                            <h5 className='card-header'>Edit Quiz</h5>
                            <div className='card-body'>
                                {/* <form> */}
                                    <div class="mb-3">
                                        <label for="exampleInputEmail1" class="form-label">Title</label>
                                        <input type="text" value={quizData.title} onChange={handleChange} name='title' class="form-control" id="title" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleInputEmail1" class="form-label">Detail</label>
                                        <textarea type="text" value={quizData.detail} name="detail" onChange={handleChange} class="form-control" id="detail" />
                                    </div>
                                    <hr />
                                    <button type="submit"  onClick={formSubmit} class="btn btn-primary">Update</button>
                                {/* </form> */}
                            </div>
                        
                    </div>
                </section>
            </div>
        </div>
    );
}

export default EditQuiz;