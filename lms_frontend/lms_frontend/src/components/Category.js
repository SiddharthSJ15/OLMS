import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const baseUrl='http://127.0.0.1:8000/api'

function Category() {
    const [categoryData, setcategoryData] = useState([]);
    let {category_slug} = useParams();
    // Fetch Courses
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/category/')
            .then((res)=>{
                setcategoryData(res.data);
                    // console.log(res.data);
              
            });
        }catch(error){
            console.log(error);
        }
    }, []);
    return (
    <div className="container mt-4">
        {/* Latest Courses */}
        <h3 className="pb-1 mb-4">All Categories</h3>
            <div className="row mb-4">
            {categoryData && categoryData.map((row,index)=>
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title"><Link className="text-body text-decoration-none" to={`/course/${row.id}/${row.title}`}>{row.title}<span className="badge text-dark bg-secondary float-end">{row.total_courses}</span></Link></h5>
                            <p className="card-text">{row.description}</p>
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

export default Category;