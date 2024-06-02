import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const baseUrl='http://127.0.0.1:8000/api'

function TeacherSkillCourses() {
    const [courseData, setcourseData] = useState([]);
    let {skill_name, teacher_id} = useParams();
    // Fetch Courses
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/course/?skill_name='+skill_name+'&teacher='+teacher_id)
            .then((res)=>{
                setcourseData(res.data);
                    // console.log(res.data);
              
            });
        }catch(error){
            console.log(error);
        }
    }, []);
    return (
    <div className="container mt-4">
        {/* Latest Courses */}
        <h3 className="pb-1 mb-4">{skill_name}</h3>
            <div className="row mb-4">
            {courseData && courseData.map((course,index)=>
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <Link to={`/detail/${course.id}`}><img className="card-img-top" src={course.featured_img} alt={course.title} /></Link>
                        <div className="card-body">
                            <h5 className="card-title"><Link to={`/detail/${course.id}`}>{course.title}</Link></h5>
                        </div>
                    </div>
                </div>
                )}     
            </div>
            {/* END LATEST COURSES */}
            {/* PAGINATION START*/}
            {/* <nav aria-label="Page navigation example mt-5">
                <ul className="pagination justify-content-center">
                    <li className="page-item"><a class="page-link" href="#">Previous</a></li>
                    <li className="page-item"><a class="page-link" href="#">1</a></li>
                    <li className="page-item"><a class="page-link" href="#">2</a></li>
                    <li className="page-item"><a class="page-link" href="#">3</a></li>
                    <li className="page-item"><a class="page-link" href="#">Next</a></li>
                </ul>
            </nav> */}
            {/* PAGINATION END */}

    </div>
    );
}

export default TeacherSkillCourses;