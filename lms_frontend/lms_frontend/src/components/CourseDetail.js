import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const siteUrl='http://127.0.0.1:8000/'
const baseUrl='http://127.0.0.1:8000/api'

function CourseDetail() {
    
    const [chapterData, setchapterData] = useState([]);
    const [teacherData, setteacherData] = useState([]);
    const [courseData, setcourseData] = useState([]);
    const [relatedcourseData, setrelatedcourseData] = useState([]);
    const [techListData, settechListData] = useState([]);
    const [studentLoginStatus,setstudentLoginStatus] = useState();
    const [enrollStatus, setenrollStatus] = useState();
    const [ratingStatus, setRatingStatus] = useState();
    const [avgRating, setAvgrating] = useState(0);
    const [courseViews, setcourseViews] = useState(0);
    const [favoriteStatus, setfavoriteStatus] = useState();

    const studentId = localStorage.getItem('studentId')
    let {course_id} = useParams();
    // Fetch Courses
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/course/'+course_id)
            .then((res)=>{
                setcourseData(res.data);
                setteacherData(res.data.teacher);
                setchapterData(res.data.course_chapters);
                setrelatedcourseData(JSON.parse(res.data.related_videos));
                settechListData(res.data.tech_list);
                if(res.data.course_rating !== '' && res.data.course_rating !== null)    {
                    setAvgrating(res.data.course_rating)
            }
            });

            //Update View
            axios.get(baseUrl+'/update-view/'+course_id)
            .then((res)=>{
                setcourseViews(res.data.views)
            });
        }catch(error){
            console.log(error);
        }

        if(studentId) {
        // FETCH ENROLL STATUS
        try{
            axios.get(baseUrl+'/fetch-enroll-status/'+studentId+'/'+course_id)
            .then((res)=>{
                console.log(res)
                if(res.data.bool === true){
                    setenrollStatus('success')
                }
            });
        }catch(error){
            console.log(error);
        }

        
        // FETCH RATING STATUS
        try{
            axios.get(baseUrl+'/fetch-rating-status/'+studentId+'/'+course_id)
            .then((res)=>{
                console.log(res)
                if(res.data.bool === true){
                    setRatingStatus('success')
                }
            });
        }catch(error){
            console.log(error);
        }

        // FETCH FAVORITE STATUS
        try{
            axios.get(baseUrl+'/fetch-favorite-status/'+studentId+'/'+course_id)
            .then((res)=>{
                console.log(res)
                if(res.data.bool === true){
                    setfavoriteStatus('success')
                }
                else{
                    setfavoriteStatus('')
                }
            });
        }catch(error){
            console.log(error);
        }
    }

        const studentLoginStatus = localStorage.getItem('studentLoginStatus');
            if(studentLoginStatus==='true') {
                setstudentLoginStatus('success')
            }

    }, []);

    console.log(relatedcourseData)

    const markAsFavorite = () => {
        const _formData = new FormData();
        _formData.append('course',course_id);
        _formData.append('student',studentId);
        _formData.append('status',true);
        try{
            axios.post(baseUrl+'/student-add-favorite-course/',_formData,{
                headers: {
                    'content-type' : 'multipart/form-data'
                }
            })
            .then((res)=>{
                if(res.status===200 || res.status===201){
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.onmouseenter = Swal.stopTimer;
                          toast.onmouseleave = Swal.resumeTimer;
                        }
                      });
                      Toast.fire({
                        icon: "success",
                        title: "Added to Favorites",
                        timer: 3000
                      });
                      
                    setfavoriteStatus('success')
                }
                else{
                    Swal.fire({
                        icon: "error",
                        title: "Error joining",
                        toast: true,
                        timer: 3000,
                        timerProgressBar:true,
                        showConfirmButton: false,
                        position: 'top-right',
                     });
                }
            });
        }
        catch(error) {
            console.log(error);
        }
    }

    const removeFavorite = (pk) => {
        const _formData = new FormData();
        _formData.append('course',course_id);
        _formData.append('student',studentId);
        _formData.append('status',true);
        try{
            axios.get(baseUrl+'/student-remove-favorite-course/'+course_id+'/'+studentId,{
                headers: {
                    'content-type' : 'multipart/form-data'
                }
            })
            .then((res)=>{
                if(res.status===200 || res.status===201){
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.onmouseenter = Swal.stopTimer;
                          toast.onmouseleave = Swal.resumeTimer;
                        }
                      });
                      Toast.fire({
                        icon: "info",
                        title: "Removed from wishlist",
                        timer: 3000
                      });
                    setfavoriteStatus('');
                }
            });
        }
        catch(error) {
            console.log(error);
        }
    }

    const enrollCourse = () =>{
            console.log(studentId)
            const _formData = new FormData();
            _formData.append('course',course_id);
            _formData.append('student',studentId);    
            try{
                axios.post(baseUrl+'/student-enroll-course/',_formData,{
                    headers: {
                        'content-type' : 'multipart/form-data'
                    }
                })
                .then((res)=>{
                    if(res.status===200 || res.status===201){
                        const Toast = Swal.mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                              toast.onmouseenter = Swal.stopTimer;
                              toast.onmouseleave = Swal.resumeTimer;
                            }
                          });
                          Toast.fire({
                            icon: "success",
                            title: "Successfully joined",
                            timer: 3000
                          });
                    }
                    else{
                        Swal.fire({
                            icon: "error",
                            title: "Error joining",
                            toast: true,
                            timer: 3000,
                            timerProgressBar:true,
                            showConfirmButton: false,
                            position: 'top-right',
                         });
                        setenrollStatus('success')
                    }
                });
            }
            catch(error) {
                console.log(error);
            }
        }    

        // ADD RATING

        const [ratingData, setRatingData] = useState({
            rating:'',
            reviews:'',
        });
    
        // console.log(cats)
        const handleChange=(event)=>{
            setRatingData({
                ...ratingData,
                [event.target.name]:event.target.value
            })
        };


        const formSubmit=()=>{
            const _formData = new FormData();
            _formData.append('course',course_id);
            _formData.append('student',studentId);
            _formData.append('rating',ratingData.rating);
            _formData.append('reviews',ratingData.reviews);
    
            try{
                axios.post(baseUrl+'/course-rating/',_formData,)
                .then((res)=>{
                    if(res.status===200 || res.status===201){
                        Swal.fire({
                            icon: "success",
                            title: "Rating posted",
                            toast: true,
                            timer: 5000,
                            timerProgressBar:true,
                            showConfirmButton: false,
                            position: 'top-right',
                        });
                        window.location.reload();
                    }
                });
            }
            catch(error) {
                console.log(error);
            }
        };


    return (
        <div className='container mt-3'>
            <div className='row'>
                <div className='col-4'>
                    <img className="img-thumbnail" src={courseData.featured_img} alt={courseData.title} />
                </div>
                <div className='col-8'>
                    <h3>{courseData.title}</h3>
                    <p>{courseData.description}</p>
                    <p className="fw-bold">Course By: <Link to={`/teacher-detail/${teacherData.id}`}>{teacherData.full_name}</Link></p>
                    <p className="fw-bold">Techs: 
                    {techListData.map((tech,index) => 
                        <Link to={`/category/${tech.trim()}`} className='badge text-dark bg-info ms-1'>{tech}</Link>
                    )}
                    </p>
                    <p className="fw-bold">Duration: 3 Hours 30 Minutes</p>
                    <p className="fw-bold">Total Enrolled Students: {courseData.total_enrolled_students}</p>                
                    <p className="fw-bold">
                        Rating: {avgRating}/5
                        {enrollStatus ==='success' && studentLoginStatus === 'success' && 
                        <>
                            {ratingStatus !== 'success' &&
                                <button className='btn btn-success btn-sm ms-2' data-bs-toggle="modal" data-bs-target="#ratingModal">Rating</button>
                            }
                            {ratingStatus === 'success' &&
                                <small className='text-dark badge bg-warning ms-2'>You have already given the rating!</small>    
                            }
                            <div className="modal fade" id="ratingModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-lg">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add Rating for {courseData.title}</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <form>
                                                <div class="mb-3">
                                                    <label for="exampleInputEmail1" class="form-label">Rating</label>
                                                    <select name='rating' onChange={handleChange} class="form-select" aria-label="Default select example">
                                                        <option selected>--SELECT--</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                    </select>
                                                    </div>
                                                <div class=" form-floating">
                                                    <textarea class="form-control" onChange={handleChange} name='reviews' placeholder="Leave a comment here" id="floatingTextarea2" style={{height: '100px'}}></textarea>
                                                    <label for="floatingTextarea2">Comments</label>
                                                </div>
                                                <button type="button" onClick={formSubmit} class="btn btn-primary">Submit</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </>
                        }
                    </p>
                    <p className="fw-bold">
                        Views: {courseViews}
                    </p>
                    {enrollStatus==='success' && studentLoginStatus === 'success' &&
                        <p><span>Already enrolled!</span></p>
                    }
                    {studentLoginStatus === 'success' && enrollStatus !== 'success' &&
                        <p><button type='button' onClick={enrollCourse} className='btn btn-success'>Join Course</button></p>
                    }
                    {studentLoginStatus==='success' && favoriteStatus!=='success' &&
                        <p><button type='button' onClick={markAsFavorite} title='Add to Favorite' className='btn btn-outline-danger'><i className='bi bi-heart-fill'></i></button></p>
                    }
                    {studentLoginStatus==='success' && favoriteStatus==='success' &&
                        <p><button type='button' onClick={removeFavorite} title='Remove from Favorite' className='btn btn-danger'><i className='bi bi-heart-fill'></i></button></p>
                    } 
                    {studentLoginStatus!=='success' && 
                        <p><Link to='/user-login'>Login to enroll into a course.</Link></p>
                    }
                </div>
            </div>

            {/* Course Video */}
            {studentLoginStatus === 'success' && enrollStatus === 'success' &&
            <div className="card mt-4">
                <h5 class="card-header">
                    Course Videos
                </h5>
                <ul className="list-group list-group-flush">
                {chapterData.map((chapter,index) =>
                    <li className="list-group-item">{chapter.title} 
                        <span className='float-end'>
                            <span className='me-3'>1 Hour 30 Minutes</span>
                            <button className='btn btn-sm btn-outline-dark' data-bs-toggle="modal" data-bs-target="#videoModal1"><i class="bi bi-play-fill"></i></button>
                        </span>
                        {/* Video Model */}
                        <div className="modal fade" id="videoModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-xl">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                <div class="ratio ratio-16x9">
                                    <iframe src={chapter.video} title={chapter.title} allowfullscreen></iframe>
                                </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary">Save changes</button>
                                </div>
                                </div>
                            </div>
                        </div>
                        {/* END VIDEO MODEL */}
                    </li>
                )}
                </ul>
            </div>
    }
            <h3 className="pb-1 mb-4 mt-5">Related Courses</h3>
            <div className="row mb-4">
            {relatedcourseData.map((rcourse,index) =>
                <div className="col-md-3">
                    <div className="card">
                        <Link target="_parent" to={`/detail/${rcourse.pk}`}><img className="card-img-top" src={`${siteUrl}media/${rcourse.fields.featured_img}`} alt={rcourse.fields.title} /></Link>
                        <div className="card-body">
                            <h5 className="card-title"><Link target="_parent" to={`/detail/${rcourse.pk}`}>{rcourse.fields.title}</Link></h5>
                        </div>
                    </div>
                </div>
            )}
            </div>
        </div>
    );
}

export default CourseDetail;