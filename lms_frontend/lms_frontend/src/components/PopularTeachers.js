import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api'
function PopularTeachers() {
    const [teacher, setTeacher] = useState(null);
    useEffect(()=>{
        axios.get(baseUrl+'/teacher/')
        .then((response)=>{
            setTeacher(response.data)
        })
    }, []);
    console.log(teacher)
    return (
    <div className="container mt-4">
        {/* Popular Courses */}
        <h3 className="pb-1 mb-4">Popular Teacher <Link className='float-end' to='/popular-courses'></Link></h3>
            <div className="row mb-4">
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <Link to="/detail/1"><img className="card-img-top" src="teacher.jpg" alt="Card image cap" /></Link>
                        <div className="card-body">
                            <h5 className="card-title"><Link to="/teacher-detail/1">Teacher Name</Link></h5>
                        </div>
                        <div className='card-footer'>
                            <div className='title'>
                                <span>Rating: 4.5/5</span>                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <a href="#"><img className="card-img-top" src="teacher.jpg" alt="Card image cap" /></a>
                        <div className="card-body">
                            <h5 className="card-title"><a href="#">Course title</a></h5>
                        </div>
                        <div className='card-footer'>
                            <div className='title'>
                                <span>Rating: 4.5/5</span>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <a href="#"><img className="card-img-top" src="teacher.jpg" alt="Card image cap" /></a>
                        <div className="card-body">
                            <h5 className="card-title"><a href="#">Course title</a></h5>
                        </div>
                        <div className='card-footer'>
                            <div className='title'>
                                <span>Rating: 4.5/5</span>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <a href="#"><img className="card-img-top" src="teacher.jpg" alt="Card image cap" /></a>
                        <div className="card-body">
                            <h5 className="card-title"><a href="#">Course title</a></h5>
                        </div>
                        <div className='card-footer'>
                            <div className='title'>
                                <span>Rating: 4.5/5</span>
                                
                            </div>
                        </div>
                    </div>
                </div> 
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <Link to="/detail/1"><img className="card-img-top" src="teacher.jpg" alt="Card image cap" /></Link>
                        <div className="card-body">
                            <h5 className="card-title"><Link to="/detail/1">Course title</Link></h5>
                        </div>
                        <div className='card-footer'>
                            <div className='title'>
                                <span>Rating: 4.5/5</span>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <Link to="/detail/1"><img className="card-img-top" src="teacher.jpg" alt="Card image cap" /></Link>
                        <div className="card-body">
                            <h5 className="card-title"><Link to="/detail/1">Course title</Link></h5>
                        </div>
                        <div className='card-footer'>
                            <div className='title'>
                                <span>Rating: 4.5/5</span>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <Link to="/detail/1"><img className="card-img-top" src="teacher.jpg" alt="Card image cap" /></Link>
                        <div className="card-body">
                            <h5 className="card-title"><Link to="/detail/1">Course title</Link></h5>
                        </div>
                        <div className='card-footer'>
                            <div className='title'>
                                <span>Rating: 4.5/5</span>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <Link to="/detail/1"><img className="card-img-top" src="teacher.jpg" alt="Card image cap" /></Link>
                        <div className="card-body">
                            <h5 className="card-title"><Link to="/detail/1">Course title</Link></h5>
                        </div>
                        <div className='card-footer'>
                            <div className='title'>
                                <span>Rating: 4.5/5</span>
                                
                            </div>
                        </div>
                    </div>
                </div>       
            </div>
            {/* END POPULAR COURSES */}
            {/* PAGINATION START*/}
            <nav aria-label="Page navigation example mt-5">
                <ul className="pagination justify-content-center">
                    <li className="page-item"><a class="page-link" href="#">Previous</a></li>
                    <li className="page-item"><a class="page-link" href="#">1</a></li>
                    <li className="page-item"><a class="page-link" href="#">2</a></li>
                    <li className="page-item"><a class="page-link" href="#">3</a></li>
                    <li className="page-item"><a class="page-link" href="#">Next</a></li>
                </ul>
            </nav>
            {/* PAGINATION END */}

    </div>
    );
}

export default PopularTeachers;