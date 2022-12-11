import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { blogs_backend } from 'utils/backends';



const NewBlog = () => {
    const [formData, setformData] = useState({ });
    const navigate = useNavigate();

    const clickHandeler = (e) => {
        e.stopPropagation();
        blogs_backend(`create/`, {method:'post', data:formData})
        .then((res)=>navigate(`/blog/${res.data.id}`))
        .catch((err)=>console.error(err));
    }
    const handleOnChange = (e)=> {
        e.stopPropagation();
        setformData({...formData, [e.target.id]:e.target.value,});
    };

    return (
        <div className="container">
        <form>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name="title" onChange={(e)=>handleOnChange(e)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="content" className="form-label">Content</label>
                <input type="text" className="form-control" id="content" name="content" onChange={(e)=>handleOnChange(e)}/>
            </div>
            <div className="d-flex flex-row justify-content-center">
                <button type="button" onClick={(e)=>clickHandeler(e)} className="btn btn-dark">Create</button>
            </div>
        </form>
        </div>
    )
}

export default NewBlog