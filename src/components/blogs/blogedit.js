import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { blogs_backend } from 'utils/backends';


const BlogEdit = () => {
    const blogID = useParams().blogID;
    const navigate = useNavigate();

    const [formData, setformData] = useState({
        title:'',
        content:''
    });

    useEffect(() => {
        blogs_backend(`blog/${blogID}`, {})
        .then(res=>setformData({
            title: res.data.title,
            content: res.data.content
        }))
        .catch(err=>console.error(err));
    }, [blogID])
    const handleOnChange = (e)=> {
        e.stopPropagation();
        setformData({...formData, [e.target.id]:e.target.value,});
    };
    const clickHandeler = (e) => {
        e.stopPropagation();
        // TODO: Implement Unauthorised and error checking in response
        blogs_backend(`blog/${blogID}`,
        {
            data:formData,
            method:'put'
        })
        .then(res=>navigate(`/blog/${res.data.id}`))
        .catch(err=>console.error(err));
    }

    return (
        <div className="container">
        <form>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={(e)=>handleOnChange(e)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="content" className="form-label">Content</label>
                <input type="text" className="form-control" id="content" name="content" value={formData.content} onChange={(e)=>handleOnChange(e)}/>
            </div>
            <div className="d-flex flex-row justify-content-center">
                <button type="button" onClick={(e)=>clickHandeler(e)} className="btn btn-dark">Submit</button>
            </div>
        </form>
        </div>
    )
}

export default BlogEdit