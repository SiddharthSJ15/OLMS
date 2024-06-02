import {Link, useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const baseUrl='http://127.0.0.1:8000/api'

function EditChapter() {
    const [chapterData, setChapterData] = useState({
        course:'',
        title:'',
        description:'',
        prev_video:'',
        video:'',
        remarks:''

    });

    const handleChange=(event)=>{
        setChapterData({
            ...chapterData,
            [event.target.name]:event.target.value
        })
    };

    const handleFileChange=(event)=>{
        setChapterData({
            ...chapterData,
            [event.target.name]:event.target.files[0]
        })            
    };
    
    const {chapter_id} = useParams();
    const formSubmit=()=>{
        const _formData = new FormData();
        _formData.append('course',chapterData.course);
        _formData.append('title',chapterData.title);
        _formData.append('description',chapterData.description);
        if(chapterData.video!==''){
            _formData.append('video',chapterData.video, chapterData.video.name);
        }
        _formData.append('remarks',chapterData.remarks);

        try{
            axios.put(baseUrl+'/chapter/'+chapter_id,_formData,{
                headers: {
                    'content-type' : 'multipart/form-data'
                }
            })
            .then((res)=>{
                if(res.status===200){
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
                        title: "Updated successfully"
                      }) 
                      .then(function(){ 
                          window.location.reload();
                      })
                }
                // window.location.href='/add-chapter/1';
            });
        }
        catch(error) {
            console.log(error);
        }
    };

    useEffect(()=>{
        try{
            axios.get(baseUrl+'/chapter/'+chapter_id)
            .then((res)=>{

                setChapterData({
                    course:res.data.course,
                    title:res.data.title,
                    description:res.data.description,
                    prev_video:res.data.video,
                    remarks:res.data.remarks,
                    video:'',
                });
            });
        }catch(error){
            console.log(error);
        }
    }, []);

    return(
        <div className="container mt-4">
            <div className='row'>
            <aside className='col-md-3'>
                   <TeacherSidebar />
                </aside>
                <section className='col-md-9'>
                        <div className='card'>
                            <h5 className='card-header'>Update Chapters</h5>
                            <div className='card-body'>
                                {/* <form> */}
                                <div class="mb-3">
                                        <label for="exampleInputEmail1" class="form-label">Title</label>
                                        <input type="text" value={chapterData.title} onChange={handleChange} name='title' class="form-control" id="title" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleInputEmail1" class="form-label">Description</label>
                                        <textarea type="text" value={chapterData.description} onChange={handleChange} name='description' class="form-control" id="description" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleInputEmail1" class="form-label">Video</label>
                                        <input type="file" onChange={handleFileChange} name='video' class="form-control" id="video" />
                                        { chapterData.prev_video &&
                                        <video controls width="80%" className='mt-2'>
                                            <source src={chapterData.prev_video} type="video/webm" />

                                            <source src={chapterData.prev_video} type="video/mp4" />

                                            Download the
                                            <Link to={chapterData.video}>WEBM</Link>
                                            or
                                            <Link to={chapterData.video}>MP4</Link>
                                            video.
                                        </video>
                                        }
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleInputEmail1" class="form-label">Remarks</label>
                                        <textarea type="text" value={chapterData.remarks} onChange={handleChange} name='remarks' class="form-control" id="remarks" placeholder='This video is focused on basic introduction' />
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

export default EditChapter;