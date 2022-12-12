import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { blogs_backend } from "utils/backends";


const MyBlogs = (props) => {
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
        blogs_backend(`blogs/u/?page%5Bnumber%5D=${curr}`, {authHeader:false})
        .then(res => {
            setRes(res.data);
        })
        .catch(err=>console.error(err));
    }, [curr]);

    // format response for showing
    const titlelinelength=50;
    const format = (str, len) => {
        if (typeof(str)==='string') {
            return str.length>len?(str.slice(0,len-3)+'...'):str
        } else {
            return ""
        }
    }
    return (
        <div>
        <ul className="list-group">
            {res.data.map((blog)=>{
                return (
                    <li className="list-group-item d-flex justify-content-between align-items-start" key={`${blog.id}`}>
                        <div className="ms-2 me-auto fw-bold">
                            {format(blog.title, titlelinelength)}
                        </div>
                        <div className="d-flex justify-content-between">
                            <Link to={`/blog/${blog.id}`} className="btn btn-dark m-1" style={{width:"45%"}}>Read</Link>
                            <Link to={`/blog/edit/${blog.id}`} className="btn btn-dark m-1" style={{width:"45%"}}>Edit</Link>
                        </div>
                    </li>
                )
            })}
        </ul>
        <div className="container my-3 d-flex flex-row justify-content-evenly">
            <button type="button" className="btn btn-outline-dark" onClick={()=>setSParams(`page=${res.links.first}`)} >{'<<First'}</button>
            <button type="button"
                onClick={()=>setSParams(`page=${res.links.prev}`)}
                className={"btn btn-outline-dark "+ (res.links.prev ? '':'disabled')}
            >
                {'<prev'}
            </button>
            <button type="button" className="btn btn-outline-dark" disabled> {'curr'} </button>
            <button
                type="button"
                onClick={()=>setSParams(`page=${res.links.next}`)}
                className={"btn btn-outline-dark "+ (res.links.next ? '':'disabled')}
            >
                {'next>'}
            </button>
            <button type="button" className="btn btn-outline-dark" onClick={()=>setSParams(`page=${res.links.last}`)} >{'Last>>'}</button>
        </div>
        </div>
    )
}

export default MyBlogs;