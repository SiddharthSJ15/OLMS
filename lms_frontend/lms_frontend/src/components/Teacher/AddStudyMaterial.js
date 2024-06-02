import {useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl='http://127.0.0.1:8000/api';
function AddStudyMaterial() {

    const [studyData, setstudyData] = useState({
        title:'',
        description:'',
        video:'',
        remarks:''

    });

    // console.log(cats)
    const handleChange=(event)=>{
        setstudyData({
            ...studyData,
            [event.target.name]:event.target.value
        })
    };

    const handleFileChange=(event)=>{
        window.URL = window.URL || window.webkitURL;
        var upload = document.createElement('upload')
        upload.src = URL.createObjectURL(event.target.files[0]);

        setstudyData({
            ...studyData,
            [event.target.name]:event.target.files[0]
        })            
    };
    
    const {course_id} = useParams();

    const formSubmit=()=>{
        const _formData = new FormData();
        _formData.append('course',course_id);
        _formData.append('title',studyData.title);
        _formData.append('description',studyData.description);
        _formData.append('upload',studyData.upload, studyData.upload.name);
        _formData.append('remarks',studyData.remarks);

        try{
            axios.post(baseUrl+'/study-materials/'+course_id,_formData,{
                headers: {
                    'content-type' : 'multipart/form-data'
                }
            })
            .then((res)=>{
                if(res.status===200||res.status===201){
                    Swal.fire({
                        title: 'Study Material has been uploaded',
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
                            <h5 className='card-header'>Add Study Material</h5>
                            <div className='card-body'>
                                {/* <form> */}
                                <div class="mb-3">
                                        <label for="exampleInputEmail1" class="form-label">Title</label>
                                        <input type="text" onChange={handleChange} name='title' class="form-control" id="title" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleInputEmail1" class="form-label">Description</label>
                                        <textarea type="text" onChange={handleChange} name='description' class="form-control" id="description" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleInputEmail1" class="form-label">Upload</label>
                                        <input type="file" onChange={handleFileChange} name='upload' class="form-control" id="upload" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleInputEmail1" class="form-label">Remarks</label>
                                        <textarea type="text" onChange={handleChange} name='remarks' class="form-control" id="remarks" placeholder='This video is focused on basic introduction' />
                                    </div>
                                    <hr />
                                    <button type="button" onClick={formSubmit} class="btn btn-primary">Update</button>
                                {/* </form> */}
                            </div>
                        
                    </div>
                </section>
            </div>
        </div>
    );
}

export default AddStudyMaterial;