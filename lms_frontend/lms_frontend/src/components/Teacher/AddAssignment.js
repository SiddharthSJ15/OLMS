import {useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl='http://127.0.0.1:8000/api';
function AddAssignment() {

    const [assignmentData, setassignmentData] = useState({
        title:'',
        detail:'',
    });

    // console.log(cats)
    const handleChange=(event)=>{
        setassignmentData({
            ...assignmentData,
            [event.target.name]:event.target.value
        })
    };
    
    const {teacher_id} = useParams();
    const {student_id} = useParams();

    const formSubmit=()=>{
        const _formData = new FormData();
        _formData.append('teacher',teacher_id);
        _formData.append('student',student_id);
        _formData.append('title',assignmentData.title);
        _formData.append('detail',assignmentData.detail);

        try{
            axios.post(baseUrl+'/student-assignment/'+teacher_id+'/'+student_id,_formData,{
                headers: {
                    'content-type' : 'multipart/form-data'
                }
            })
            .then((res)=>{
                if(res.status===200||res.status===201){
                    // let timerInterval;
                    Swal.fire({
                        title: 'Assignment has been uploaded',
                        icon: 'success',
                        timer:3000,
                        toast: true,
                        position: 'top-end',
                        timerProgressBar: true,
                        showConfirmButton: false,                                           
                    });
                    // .then(function(){ 
                    //     window.location.reload();
                    // })
                    const _notifData = new FormData();
                    _notifData.append('teacher',teacher_id);
                    _notifData.append('notif_subject','assignment');
                    _notifData.append('notif_for','student');
                    _notifData.append('student',student_id);
                    axios.post(baseUrl+'/save-notifications/',_notifData,{
                        headers: {
                            'content-type' : 'multipart/form-data'
                        }
                    })
                    .then((res)=>{
                        console.log('Notification Added')
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
                        <h5 className='card-header'>Add Assignment</h5>
                        <div className='card-body'>
                            <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Title</label>
                                    <input type="text" onChange={handleChange} name='title' class="form-control" id="title" />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Detail</label>
                                    <textarea type="text" onChange={handleChange} name='detail' class="form-control" id="description" />
                                </div>
                                <hr />
                            <button type="button" onClick={formSubmit} class="btn btn-primary">Update</button>
                        </div>                        
                    </div>
                </section>
            </div>
        </div>
    );
}

export default AddAssignment;