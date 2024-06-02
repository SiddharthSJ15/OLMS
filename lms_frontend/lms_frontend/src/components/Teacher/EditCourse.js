import {Link, useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl='http://127.0.0.1:8000/api';
function EditCourse() {
    const [cats, setCats] = useState([]);
    const [courseData, setcourseData] = useState({
        category:'',
        title:'',
        description:'',
        f_img:'',
        techs:''

    });


    const {course_id} = useParams();
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/category/')
            .then((res)=>{
                    setCats(res.data);
                    // console.log(res.data);
              
            });
        }catch(error){
            console.log(error);
        }

        // Fetch Current course details
        try{
            axios.get(baseUrl+'/teacher-course-detail/'+course_id)
            .then((res)=>{

                setcourseData({
                    category:res.data.category,
                    title:res.data.title,
                    description:res.data.description,
                    prev_f_img:res.data.featured_img,
                    techs:res.data.techs,
                    f_img:'',
                });
            });
        }catch(error){
            console.log(error);
        } 
        // END

    }, []);
    // console.log(cats)
    const handleChange=(event)=>{
        setcourseData({
            ...courseData,
            [event.target.name]:event.target.value
        })
    };

    const handleFileChange=(event)=>{
        setcourseData({
            ...courseData,
            [event.target.name]:event.target.files[0]
        })            
    };
    const teacher_id = localStorage.getItem('teacherId')
    const formSubmit=()=>{
        const _formData = new FormData();
        _formData.append('category',courseData.category);
        _formData.append('teacher',teacher_id);
        _formData.append('title',courseData.title);
        _formData.append('description',courseData.description);
        if(courseData.f_img!==''){
            _formData.append('featured_img',courseData.f_img, courseData.f_img.name);
        }
        _formData.append('techs',courseData.techs);

        try{
            axios.put(baseUrl+'/teacher-course-detail/'+course_id,_formData,{
                headers: {
                    'content-type' : 'multipart/form-data'
                }
            })
            .then((res)=>{
                // console.log(res.data);
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
                            <h5 className='card-header'>Edit Course</h5>
                            <div className='card-body'>
                                {/* <form> */}
                                <div class="mb-3">
                                        <label for="exampleInputEmail1" class="form-label">Category</label>
                                        <select name='category' value={courseData.category} onChange={handleChange} className='form-control'>
                                            {cats.map((category,index)=> {return <option key={index} value={category.id}>{category.title}</option>})}
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleInputEmail1" class="form-label">Title</label>
                                        <input type="text" value={courseData.title} onChange={handleChange} name='title' class="form-control" id="title" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleInputEmail1" class="form-label">Description</label>
                                        <textarea type="text" value={courseData.description} name="description" onChange={handleChange} class="form-control" id="description" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleInputEmail1" class="form-label">Featured Image</label>
                                        <input type="file" name="f_img" class="form-control" onChange={handleFileChange} id="video" />
                                        { courseData.prev_f_img &&
                                        <img src={courseData.prev_f_img} width="50%" className='mt-3' alt={courseData.name}/>
                                        }
                                    </div>                                    
                                    <div class="mb-3">
                                        <label for="exampleInputEmail1" class="form-label">Technologies</label>
                                        <textarea type="text" value={courseData.techs} name="techs" class="form-control" onChange={handleChange} id="techs" placeholder='Php, Python, Javascipt, etc' />
                                    </div>
                                    <hr />
                                    <button type="submit" onClick={formSubmit} class="btn btn-primary">Update</button>
                                {/* </form> */}
                            </div>
                        
                    </div>
                </section>
            </div>
        </div>
    );
}

export default EditCourse;