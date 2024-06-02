import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';

const baseUrl='http://127.0.0.1:8000/api';

function Header() {
    const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
    const studentLoginStatus = localStorage.getItem('studentLoginStatus')
    
    const [searchString, setSearchString] = useState({
        search:'',
    });

    const handleChange=(event)=>{
        setSearchString({
            ...searchString,
            [event.target.name]:event.target.value
        })
    };

    const searchCourse= () =>{
        if (searchString.search !=='') {
            window.location.href='/search/'+searchString.search            
        }
    }


    return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">LearningTree</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    
                <div className="navbar-nav ms-auto">
                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                    <Link className="nav-link" to="/category">Category</Link>
                    <Link className="nav-link" to="/all-courses">Courses</Link>

                    {/* TUTOR */}
                    <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Tutor
                        </Link>
                        <ul className="dropdown-menu">
                            {teacherLoginStatus!=='true' &&
                                <>
                                    <li><Link className="dropdown-item" to="/teacher-login">Login</Link></li>
                                    <li><Link className="dropdown-item" to="/teacher-register">Register</Link></li>
                                </>
                            }
                            {teacherLoginStatus==='true' &&
                            <>
                            <li><Link className="dropdown-item" to="/teacher-dashboard">Dashboard</Link></li>
                            <li><Link className="dropdown-item" to="/teacher-logout">Logout</Link></li>
                        </>
                        }
                        </ul>
                    </li>

                    {/* USER */}
                    <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            User
                        </Link>
                        <ul className="dropdown-menu">
                        {studentLoginStatus!=='true' &&
                        <>
                            <li><Link className="dropdown-item" to="/user-login">Login</Link></li>
                            <li><Link className="dropdown-item" to="/user-register">Register</Link></li>
                            </>
                        }
                        {studentLoginStatus==='true' &&
                            <>                            
                            <li><Link className="dropdown-item" to="/user-dashboard">Dashboard</Link></li>
                            <li><Link className="dropdown-item" to="/user-logout">Logout</Link></li>
                            </>
                        }
                        </ul>
                    </li>                    
                    <Link className="nav-link" to="/about">About</Link>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" name="search" onChange={handleChange} type="search" placeholder="Search by a Course Title" aria-label="Search" />
                        <button onClick={searchCourse} className="btn btn-outline-warning" type="button" placeholder="Search by a Course/Technology">Search</button>
                    </form>
                </div>
            </div>
        </div>
    </nav>
    );
  }
  
  export default Header;
  