import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { blogs_backend } from "utils/backends";


const MyBlogs = (props) => {
    const [blogs, setBlogs]= useState([]);

    useEffect(() => {
        // TODO: Implement not logged in and error checking in response
        blogs_backend(`blogs/u/`, {})
        .then(res => setBlogs(res.data.results))
        .catch(err => console.error(err));
    }, []);

    return (
        <ul className="list-group">
            {blogs.map((blog)=>{
                return (
                    <li className="list-group-item d-flex justify-content-between align-items-start" key={`${blog.id}`}>
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">{blog.title}</div>
                            {blog.content}
                        </div>
                        <div className="d-flex justify-content-between">
                            <Link to={`/blog/${blog.id}`} className="btn btn-dark m-1" style={{width:"45%"}}>Read</Link>
                            <Link to={`/blog/edit/${blog.id}`} className="btn btn-dark m-1" style={{width:"45%"}}>Edit</Link>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

export default MyBlogs;