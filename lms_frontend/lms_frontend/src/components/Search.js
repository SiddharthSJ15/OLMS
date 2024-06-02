import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const baseUrl='http://127.0.0.1:8000/api'

function Seacrh() {

    const [courseData, setcourseData] = useState([]);
    const {searchString} = useParams();

    // Fetch Courses
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/search-courses/'+searchString)
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
        <h3 className="pb-1 mb-4">Results for <span className='text-capitalize text-primary'>{searchString}</span></h3>
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
                    <li className="page-item"><Link class="page-link" href="#">Previous</Link></li>
                    <li className="page-item"><Link class="page-link" href="#">1</Link></li>
                    <li className="page-item"><Link class="page-link" href="#">2</Link></li>
                    <li className="page-item"><Link class="page-link" href="#">3</Link></li>
                    <li className="page-item"><Link class="page-link" href="#">Next</Link></li>
                </ul>
            </nav>
            {/* PAGINATION END */}

    </div>
    );
}

export default Seacrh;