import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const baseUrl='http://127.0.0.1:8000/api'

function CategoryCourses() {
    const [courseData, setcourseData] = useState([]);
    const [prevUrl, setprevUrl] = useState();
    const [nextUrl, setnextUrl] = useState();
    let {category_id,category_slug} = useParams();
    // Fetch Courses
    useEffect(()=>{
        fetchData(baseUrl+'/course/?category='+category_id)
    }, []);

    const paginationHandler=(url)=>{
        fetchData(url)
    }
    function fetchData(url){
        try{
            try{
                axios.get(url)
                .then((res)=>{
                    setnextUrl(res.data.next)
                    setprevUrl(res.data.previous)
                    setcourseData(res.data.results);                  
                });
            }catch(error){
                console.log(error);
            }
        }catch(error){
            console.log(error);
        }
    }
    return (
    <div className="container mt-4">
        {/* Latest Courses */}
        <h3 className="pb-1 mb-4">{category_slug}</h3>
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
            <nav aria-label="Page navigation example mt-5">
                <ul className="pagination justify-content-center">
                    {prevUrl &&
                        <li className="page-item"><button class="page-link" onClick={()=>paginationHandler(prevUrl)}><i class="bi bi-arrow-left-short"></i>Previous</button></li>
                    }
                    {/* <li className="page-item"><Link class="page-link" href="#">1</Link></li>
                    <li className="page-item"><Link class="page-link" href="#">2</Link></li>
                    <li className="page-item"><Link class="page-link" href="#">3</Link></li> */}
                    {nextUrl &&
                        <li className="page-item"><button class="page-link" onClick={()=>paginationHandler(nextUrl)}>Next<i class="bi bi-arrow-right-short"></i></button></li>
                    }
                </ul>
            </nav>
            {/* PAGINATION END */}

    </div>
    );
}

export default CategoryCourses;