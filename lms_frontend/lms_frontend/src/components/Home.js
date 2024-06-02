import CourseDetail from './CourseDetail';
import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl='http://127.0.0.1:8000/api'

function Home() {

    const [courseData, setcourseData] = useState([]);
    const [popularcourseData, setpopularcourseData] = useState([]);
    const [popularteacherData, setpopularteacherData] = useState([]);
    const [testimonialData, settestimonialData] = useState([]);
    
    
    useEffect(()=>{
        document.title='Learning Tree'
        // Fetch Courses
        try{
            axios.get(baseUrl+'/course/?result=4')
            .then((res)=>{
                setcourseData(res.data.results);              
            });
        }catch(error){
            console.log(error);
        }

        // Fetch Popular Courses
        try{
            axios.get(baseUrl+'/popular-courses/?popular=1')
            .then((res)=>{
                setpopularcourseData(res.data);              
            });
        }catch(error){
            console.log(error);
        }

        // Fetch Popular Techers
        try{
            axios.get(baseUrl+'/popular-teachers/?popular=1')
            .then((res)=>{
                setpopularteacherData(res.data);              
            });
        }catch(error){
            console.log(error);
        }

        // Fetch Student Testimonials
        try{
            axios.get(baseUrl+'/student-testimonial/')
            .then((res)=>{
                settestimonialData(res.data);              
            });
        }catch(error){
            console.log(error);
        }

    }, []);
  return (
    <div className="container mt-4">
        {/* Latest Courses */}
        <h3 className="pb-1 mb-4">Latest Courses <Link to="/all-courses" className="float-end">See all</Link></h3>
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
        {/* End Latest Courses */}
        
        {/* Popular Courses */}
        <h3 className="pb-1 mb-4 mt-5">Popluar Courses <Link to="/popular-courses" className="float-end">See all</Link></h3>
        <div className="row">
            {popularcourseData && popularcourseData.map((row,index)=>
            <div className="col-md-3">
                <div className="card">
                    <Link to={`/detail/${row.course.id}`}><img className="card-img-top" src={row.course.featured_img} alt={row.course.title} /></Link>
                    <div className="card-body">
                        <h5 className="card-title"><Link to={`/detail/${row.course.id}`}>{row.course.title}</Link></h5>
                       </div>
                       <div className='card-footer'>
                        <div className='title'>
                            <span>Rating: {row.rating}/5</span>
                            <span className='float-end'>Views: {row.course.course_views}</span>
                        </div>
                    </div>
                </div>
            </div> 
        )}       
        </div>
        {/* End Popluar Courses */}
        
        {/* Popular Teachers */}
        <h3 className="pb-1 mb-4 mt-5">Popular Teacher<Link to="/popular-teachers" className="float-end">See all</Link></h3>
        <div className="row">
            {popularteacherData && popularteacherData.map((teacher,index)=>            
            <div className="col-md-3">
                <div className="card">
                    <Link to={`/teacher-detail/${teacher.id}`}><img className="card-img-top" src={teacher.profile_img} alt={teacher.full_name} /></Link>
                    <div className="card-body">
                        <h5 className="card-title"><Link to={`/teacher-detail/${teacher.id}`}>{teacher.full_name}</Link></h5>
                       </div>
                       <div className='card-footer'>
                            <div className='title'>
                                <span>Total Courses: {teacher.total_teacher_courses}</span>
                            </div>
                        </div>
                </div>
            </div>  
            )}    
        </div>
        {/* End Popular Teachers */}

        {/* Student Testimonials */}
        <h3 className="pb-1 mb-4 mt-5">Student Testimonials</h3>
        <div id="carouselExampleIndicators" className="carousel slide bg-dark py-5 text-white">
            <div className="carousel-indicators">
            {testimonialData && testimonialData.map((row,index)=> 
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} className={index===0 ? "active" : ""}></button>
            )}
            </div>
            <div className="carousel-inner">
            {testimonialData && testimonialData.map((row,index)=> 
                <div className={ index === 0 ? "carousel-item active" : "carousel-item text-center" }>
                    <figure className="text-center">
                        <blockquote className="blockquote">
                            <p>{row.reviews}</p>
                        </blockquote>
                        <figcaption className="blockquote-footer">
                            {row.course.title}, <cite title="Source Title">{row.student.full_name}</cite>
                        </figcaption>
                    </figure>
                </div>
                )}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
        {/* End Student Testimonials */}
    </div>
  );
}

export default Home;
