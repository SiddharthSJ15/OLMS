import {Link, useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import axios from 'axios';
import { useState, useEffect } from 'react';


const baseUrl='http://127.0.0.1:8000/api'

function CourseChapters() {

    const [chapterData, setchapterData] = useState([]);
    const [totalResult, settotalResult] = useState(0);
    const {course_id} = useParams();
    console.log(course_id)
    // Fetch Courses
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/course-chapters/'+course_id)
            .then((res)=>{
                setchapterData(res.data);
                settotalResult(res.data.length);
                    // console.log(res.data);
              
            });
        }catch(error){
            console.log(error);
        }
    }, []);

    // Delet Data
    const Swal = require('sweetalert2')
    const handleDeleteClick = (chapter_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                try{
                    axios.delete(baseUrl+'/chapter/'+chapter_id)
                    .then((res)=>{
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                            });
                        try{
                            axios.get(baseUrl+'/course-chapters/'+course_id)
                            .then((res)=>{
                                setchapterData(res.data);
                                settotalResult(res.data.length);
                              
                            });
                        }catch(error){
                            console.log(error);
                        }
                    });
                    
                }catch(error){
                    Swal.fire({
                        title: "Error!",
                        text: "Your file has not been deleted.",
                        icon: "error"
                        });
                } 
            }
            else{
                Swal.fire({
                    title: "Error!",
                    text: "Your file has not been deleted.",
                    icon: "error"
                    });
            }
          });
    }

    return(
        <div className="container mt-4">
            <div className='row'>
                <aside className='col-md-3'>
                <TeacherSidebar />
                </aside>
                <section className='col-md-9'>
                    <div className='card'>
                    <h5 className='card-header'>Total Chapters: {totalResult} <Link to={'/add-chapter/'+course_id} title='Add new chapters'><i className="bi bi-file-earmark-plus-fill float-end text-dark bi"></i></Link></h5>
                        <div className='card-body'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Course Name</th>
                                        <th>Video</th>
                                        <th>Remarks</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {chapterData.map((chapter,index) =>
                                    <tr>
                                        <td><Link to={'/edit-chapter/'+chapter.id}>{chapter.title}</Link></td>
                                        <td>
                                            <video controls width="250">
                                                <source src={chapter.video.url} type="video/webm" />
                                                <source src={chapter.video.url} type="video/mp4" />
                                                Download the
                                                <a href={chapter.video.url}>WEBM</a>
                                                or
                                                <a href={chapter.video.url}>MP4</a>
                                                video.
                                            </video>
                                        </td>
                                        <td>{chapter.remarks}</td>
                                        <td>                                            
                                        <Link to={'/edit-chapter/'+chapter.id} className='btn btn-sm btn-outline-primary'><i className="bi bi-pencil-square"></i></Link>
                                        <button onClick={()=>handleDeleteClick(chapter.id)} className='btn btn-sm btn-outline-danger ms-1'><i className="bi bi-trash3-fill"></i></button>
                                        </td>
                                    </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        
    );
}

export default CourseChapters;