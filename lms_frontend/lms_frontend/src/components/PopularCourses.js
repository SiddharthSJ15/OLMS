import {Link} from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const baseUrl='http://127.0.0.1:8000/api'
function PopularCourses() {
    const [popularcourseData, setpopularcourseData] = useState([]);
    useEffect(()=>{
            // Fetch Popular Courses
            try{
                axios.get(baseUrl+'/popular-courses/?all=1')
                .then((res)=>{
                    setpopularcourseData(res.data);              
                });
                
            }catch(error){
                console.log(error);
            }

        }, []);
    return (
    <div className="container mt-4">
        {/* Popular Courses */}
        <h3 className="pb-1 mb-4">Popular Courses <Link className='float-end' to='/popular-courses'></Link></h3>
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
            {/* END POPULAR COURSES */}
            {/* PAGINATION START*/}
            <nav aria-label="Page navigation example mt-5">
                <ul className="pagination justify-content-center">
                    <li className="page-item"><Link class="page-link" to="#">Previous</Link></li>
                    <li className="page-item"><Link class="page-link" to="#">1</Link></li>
                    <li className="page-item"><Link class="page-link" to="#">2</Link></li>
                    <li className="page-item"><Link class="page-link" to="#">3</Link></li>
                    <li className="page-item"><Link class="page-link" to="#">Next</Link></li>
                </ul>
            </nav>
            {/* PAGINATION END */}

    </div>
    );
}

export default PopularCourses;