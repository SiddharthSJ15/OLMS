import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl='http://127.0.0.1:8000/api';

function Sidebar() {

    const [notifData, setnotifData] = useState([]); 
    const studentId = localStorage.getItem('studentId')
    
    useEffect(()=>{

        try{
            axios.get(baseUrl+'/student/fetch-all-notifications/'+studentId+'/')
            .then((res)=>{
                console.log(res.data)
                setnotifData(res.data);
            });
        }catch(error){
            console.log(error);
        }
    }, []);

    return    (
        <div className='card'>
            <h5 className='card-header'>Dashboard</h5>
            <div className='list-group list-group-flush'>
            <Link to='/user-dashboard' className='list-group-item list-group-item-action'>Dashboard</Link>
                <Link to='/my-courses' className='list-group-item list-group-item-action'>My Courses</Link>
                <Link to='/favorite-courses' className='list-group-item list-group-item-action'>Favorite Courses</Link>
                <Link to='/recommended-courses' className='list-group-item list-group-item-action'>Recommended Courses</Link>
                <Link to='/my-assignments' className='list-group-item list-group-item-action'>Assignemts 
                    <span className="float-end badge text-bg-warning mt-1">{notifData.length}</span>
                </Link>
                <Link to='/profile-setting' className='list-group-item list-group-item-action'>Profile Settings</Link>
                <Link to='/change-password' className='list-group-item list-group-item-action'>Change Password</Link>
                <Link to='/user-logout' className='list-group-item list-group-item-action text-danger'>Logout</Link>
            </div>
        </div>
    )
}
export default Sidebar;