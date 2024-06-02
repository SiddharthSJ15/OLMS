import {Link, useParams} from 'react-router-dom';
import Sidebar from './Sidebar';
import axios from 'axios';
import { useState, useEffect } from 'react';


const baseUrl='http://127.0.0.1:8000/api'

function UserStudyMaterial() {

    const [studyData, setstudyData] = useState([]);
    const [totalResult, settotalResult] = useState(0);
    const {course_id} = useParams();
    console.log(course_id)
    // Fetch Courses
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/user/study-materials/'+course_id)
            .then((res)=>{
                setstudyData(res.data);
                settotalResult(res.data.length);
                    // console.log(res.data);              
            });
        }catch(error){
            console.log(error);
        }
    }, []);

    const downloadFile = (file_url)=>{
        window.location.href=file_url
    }

    return(
        <div className="container mt-4">
            <div className='row'>
                <aside className='col-md-3'>
                <Sidebar />
                </aside>
                <section className='col-md-9'>
                    <div className='card'>
                    <h5 className='card-header'>Total Study Materials: <>{totalResult}</></h5>
                        <div className='card-body'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Detail</th>
                                        <th>Upload</th>
                                        <th>Remarks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studyData.map((row,index) =>
                                    <tr>
                                        <td><>{row.title}</></td>
                                        <td>{row.description}</td>
                                        <td>
                                            <button onClick={()=>downloadFile(row.upload)} className='btn btn-outline-dark'>Download File</button>
                                        </td>
                                        <td>{row.remarks}</td>

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

export default UserStudyMaterial;