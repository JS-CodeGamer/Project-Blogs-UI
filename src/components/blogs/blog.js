import NotFound from "components/errors/notFound";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { blogs_backend } from "utils/backends";
import { blogdummydata } from "utils/dummy_data";


const Blog = (props) => {
    const blogID = useParams().blogID;
    const [blog, setBlog] = useState({
        title:null,
        author:null,
        content:null,
        edit:false
    });

    useEffect(() => {
        // TODO: Implement error checking in response
        // Uncomment for production deployment with backend
        // blogs_backend(`blog/${blogID}`, {})
        // .then(res=>setBlog(res.data.data))
        // .catch(err=>console.error(err));
        setBlog(blogdummydata.data)
    }, [blogID])

    if (!blog.title || !blog.author || !blog.content) {
        return <NotFound/>
    }

    return (
        <div className="container d-flex flex-column align-items-center">
            <h1>
                {blog.title}
            </h1>
            <h4>
                By --
                <Link
                    className="ms-1"
                    style={{color:"inherit", textDecoration: "none"}}
                    to={`/profile/${blog.author}`}
                >
                    {blog.author}
                </Link>
            </h4>
            {blog.edit===true &&
            (<div className="w-75 d-flex justify-content-end">
                <Link
                    to={`/blog/edit/${blogID}`}
                    className="btn btn-dark"
                >
                    Edit
                </Link>
            </div>)}
            <hr className="w-75"/>
            <p className="word-wrap fs-5">
                {blog.content}
            </p>
        </div>
    );
}

export default Blog;
