import {Link, useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import axios from 'axios';
import { useState, useEffect } from 'react';


const baseUrl='http://127.0.0.1:8000/api'

function StudyMaterials() {

    const [studyData, setstudyData] = useState([]);
    const [totalResult, settotalResult] = useState(0);
    const {course_id} = useParams();
    console.log(course_id)
    // Fetch Courses
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/study-materials/'+course_id)
            .then((res)=>{
                setstudyData(res.data);
                settotalResult(res.data.length);
                    // console.log(res.data);              
            });
        }catch(error){
            console.log(error);
        }
    }, []);

    // Delet Data
    const Swal = require('sweetalert2')
    const handleDeleteClick = (study_id) => {
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
                    axios.delete(baseUrl+'/study-material/'+study_id)
                    .then((res)=>{
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                            });
                        try{
                            axios.get(baseUrl+'/study-materials/'+course_id)
                            .then((res)=>{
                                setstudyData(res.data);
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

    const downloadFile = (file_url)=>{
        window.location.href=file_url
    }

    return(
        <div className="container mt-4">
            <div className='row'>
                <aside className='col-md-3'>
                <TeacherSidebar />
                </aside>
                <section className='col-md-9'>
                    <div className='card'>
                    <h5 className='card-header'>Total Study Materials: <>{totalResult}</> <Link to={'/add-study-material/'+course_id} title='Add Study Materials'><i className="bi bi-file-earmark-plus-fill float-end text-dark bi"></i></Link></h5>
                        <div className='card-body'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Upload</th>
                                        <th>Remarks</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studyData.map((row,index) =>
                                    <tr>
                                        <td><>{row.title}</></td>
                                        <td>
                                        <button target="_blank" onClick={()=>downloadFile(row.upload)} className='btn btn-outline-dark'>Download File</button>
                                        </td>
                                        <td>{row.remarks}</td>
                                        <td>                                            
                                        <Link to={'/edit-study/'+row.id} className='btn btn-sm btn-outline-primary'><i className="bi bi-pencil-square"></i></Link>
                                        <button onClick={()=>handleDeleteClick(row.id)} className='btn btn-sm btn-outline-danger ms-1'><i className="bi bi-trash3-fill"></i></button>
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

export default StudyMaterials;