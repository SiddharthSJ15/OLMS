import {Link} from 'react-router-dom';
import Sidebar from './Sidebar';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const baseUrl='http://127.0.0.1:8000/api'

function StudentAssignments() {
    
    const [assignmentData, setassignmentData] = useState([]);
    const [assignmentStatus, setassignmentStatus] = useState('');    
    const student_id = localStorage.getItem('studentId')
    console.log(student_id)

    // Fetch Enrolled Student Course 
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/my-assignments/'+student_id)
            .then((res)=>{
                setassignmentData(res.data);
                    // console.log(res.data);              
            });
        }catch(error){
            console.log(error);
        }
    }, []);

    const markAsDone = (assignment_id,title,detail,student,teacher) =>{
        const _formData = new FormData();
        _formData.append('title',title);
        _formData.append('detail',detail);  
        _formData.append('student',student);  
        _formData.append('teacher',teacher);
        _formData.append('student_status',true);    
        try{
            axios.put(baseUrl+'/update-my-assignments/'+assignment_id,_formData,{
                headers: {
                    'content-type' : 'multipart/form-data'
                }
            })
            .then((res)=>{
                if(res.status===200 || res.status===201){
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
                        title: "Successfully completed",
                        timer: 3000
                      }).then(function(){
                        setassignmentStatus('success')
                            window.location.reload()
                      })
                }
                else{
                    Swal.fire({
                        icon: "error",
                        title: "Error joining",
                        toast: true,
                        timer: 2000,
                        timerProgressBar:true,
                        showConfirmButton: false,
                        position: 'top-right',
                     });
                }
            });
        }
        catch(error) {
            console.log(error);
        }
    } 

    return(
        <div className="container mt-4">
            <div className='row'>
                <aside className='col-md-3'>
                   <Sidebar />
                </aside>
                <section className='col-md-9'>
                    <div className='card'>
                    <h5 className='card-header'>My Courses</h5>
                        <div className='card-body'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Detail</th>
                                        <th>Created By</th>                                        
                                        <th>Action</th>
                                        {/* <th>Action</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                {assignmentData.map((row,index) =>
                                    <tr>
                                        <td>{row.title}</td>
                                        <td>{row.detail}</td>
                                        <td><Link to={`/teacher-detail/${row.teacher.id}`}>{row.teacher.full_name}</Link></td>
                                        <td>
                                            {row.student_status===false &&
                                                <button onClick={() => markAsDone(row.id,row.title,row.detail,row.student.id,row.teacher.id)} className='btn btn-sm btn-success'>Mark as done</button>
                                            }
                                            {row.student_status===true &&
                                                // <button onClick={markAsDone} className='btn btn-sm btn-success'>Mark as done</button>
                                                <span className='badge bg-primary btn-sm'>Completed</span>
                                            }
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

export default StudentAssignments;