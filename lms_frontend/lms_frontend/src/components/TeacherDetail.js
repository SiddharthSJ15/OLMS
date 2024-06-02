import {Link} from 'react-router-dom';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';

const baseUrl='http://127.0.0.1:8000/api'

function TeacherDetail() {

    const [teacherData, setteacherData] = useState([]);
    const [courseData, setcourseData] = useState([]);
    const [skillListData, setskillListData] = useState([]);
    
    let {teacher_id} = useParams();

    useEffect(()=>{
        try{
            axios.get(baseUrl+'/teacher/'+teacher_id+'/')
            .then((res)=>{
                console.log(res)
                setteacherData(res.data);
                setcourseData(res.data.teacher_courses);   
                setskillListData(res.data.skill_list);             
            });
        }catch(error){
            console.log(error);
        }
    }, []);

        return (
            <div className='container mt-3'>
            <div className='row'>
                <div className='col-4'>
                    <img className="img-thumbnail" src={teacherData.profile_img} alt={teacherData.full_name} />
                </div>
                <div className='col-8'>
                    <h3>{teacherData.full_name}</h3>
                    <p>{teacherData.detail}</p>
                    <p className="fw-bold">Skills: 
                        {skillListData.map((skill,index) => 
                        <Link to={`/teacher-skill-courses/${skill.trim()}/${teacher_id}`} className='badge bg-info ms-1'>{skill}</Link>
                    )}
                    </p>
                    <p className="fw-bold">Recent Course: <Link to="/category/php">React Js</Link></p>              
                    <p className="fw-bold">Rating: 4.5/5</p>
                </div>
            </div>

            {/* Course List */}
            <div className="card mt-4">
                <h5 class="card-header">
                    List of Courses
                </h5>
                <div className="list-group list-group-flush">
                    {courseData.map((course,index)=>
                    <Link target='_parent' to={`/detail/${course.id}`} className='list-group-item list-group-item-action'>{course.title}</Link>
                    )}
                </div>
            </div>
        </div>
        );
}

export default TeacherDetail;