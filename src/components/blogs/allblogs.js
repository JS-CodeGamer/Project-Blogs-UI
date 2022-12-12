import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { blogs_backend } from 'utils/backends';
import { bloglistdummydata } from 'utils/dummy_data';

const AllBlogs = (props) => {
    // Parse URL params
    const [sParams, setSParams] = useSearchParams();
    const curr = sParams.get('page')?parseInt(sParams.get('page')):0;

    // get data from backend
    const [res, setRes]= useState({
        links:{},
        data:[{
            title:"",
            author:"",
            content:""
        }],
        meta:{},
    });
    useEffect(() => {
        // TODO: Implement error checking in response
        // Uncomment for production deployment with backend
        // blogs_backend(`blogs/?page%5Bnumber%5D=${curr}`, {authHeader:false})
        // .then(res => {
        //     setRes(res.data);
        // })
        // .catch(err=>console.error(err));
        setRes(bloglistdummydata);
    }, [curr]);

    // format response for showing
    const titlelinelength=50;
    const contentlinelength=80;
    const format = (str, len) => {
        if (typeof(str)==='string') {
            return str.length>len?(str.slice(0,len-3)+'...'):str
        } else {
            return ""
        }
    }

    return (
        <div className='container d-flex flex-column justify-content-between h-100'>
        <div className="row row-cols-1 row-cols-md-2 g-4">
            {res.data.map((blog)=>{
                return (
                    <div className="col" key={`${blog.id}`}>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title overflow-hidden text-center">{format(blog.title, titlelinelength)}</h5>
                            <h6 className="card-subtitle mb-2 text-muted text-center">
                                <Link to={`/profile/${blog.author}`}>
                                    {blog.author}
                                </Link>
                            </h6>
                            <p className="card-text overflow-hidden">{format(blog.content, contentlinelength*5)}</p>
                            <Link to={`/blog/${blog.id}`} className="btn btn-dark" style={{width:"100%"}}>Read</Link>
                        </div>
                    </div>
                    </div>
                )
            })}
        </div>
        <div className="container my-3 d-flex flex-row justify-content-evenly">
            <button type="button" className="btn btn-outline-dark" onClick={()=>setSParams(`page=${1}`)} >{'<<First'}</button>
            <button type="button"
                onClick={()=>setSParams(`page=${res.meta.pagination.page-1}`)}
                className={"btn btn-outline-dark "+ (res.links.prev ? '':'disabled')}
            >
                {'<prev'}
            </button>
            <button type="button" className="btn btn-outline-dark" disabled> {res.meta.pagination.page} </button>
            <button
                type="button"
                onClick={()=>setSParams(`page=${res.meta.pagination.pages+1}`)}
                className={"btn btn-outline-dark "+ (res.links.next ? '':'disabled')}
            >
                {'next>'}
            </button>
            <button type="button" className="btn btn-outline-dark" onClick={()=>setSParams(`page=${res.meta.pagination.pages}`)} >{'Last>>'}</button>
        </div>
        </div>
    )
}

export default AllBlogs
