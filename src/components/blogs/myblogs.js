import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { blogs_backend } from "utils/backends";
import { bloglistdummydata } from "utils/dummy_data";


const MyBlogs = (props) => {
    // Parse URL params
    const [sParams, setSParams] = useSearchParams();
    const curr = sParams.get('page')?parseInt(sParams.get('page')):0;

    // get data from backend
    const [res, setRes]= useState({
        links:{
            first:null,
            last:null,
            next:null,
            prev:null,
        },
        data:[{
            type:'',
            id:'',
            attributes:{
                title:"",
                author:"",
                content:"",
                created_at:'',
                updated_at:''
            }
        }],
        meta:{
            pagination: {
                page:1,
                pages:1
            }
        },
    });
    useEffect(() => {
        // TODO: Implement error checking in response
        // Uncomment for production deployment with backend
        // blogs_backend(`blogs/u/?page%5Bnumber%5D=${curr}`, {authHeader:false})
        // .then(res => {
        //     setRes(res.data);
        // })
        // .catch(err=>console.error(err));
        setRes(bloglistdummydata)
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
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={`${blog.id}`}>
                        <div className="ms-2 me-auto fw-bold">
                            {format(blog.attributes.title, titlelinelength)}
                        </div>
                        <div className="d-flex justify-content-between ms-5">
                            <Link to={`/blog/${blog.id}`} className="btn btn-dark m-1" style={{width:"45%"}}>Read</Link>
                            <Link to={`/blog/edit/${blog.id}`} className="btn btn-dark m-1" style={{width:"45%"}}>Edit</Link>
                        </div>
                    </li>
                )
            })}
        </ul>
        <div className="container my-3 d-flex flex-row justify-content-evenly">
            <button type="button" className="btn btn-outline-dark" onClick={()=>setSParams(`page=1`)} >{'<<First'}</button>
            <button type="button"
                onClick={()=>setSParams(`page=${res.meta.pagination.page-1}`)}
                className={"btn btn-outline-dark "+ (res.links.prev ? '':'disabled')}
            >
                {'<prev'}
            </button>
            <button type="button" className="btn btn-outline-dark" disabled> {'curr'} </button>
            <button
                type="button"
                onClick={()=>setSParams(`page=${res.meta.pagination.page+1}`)}
                className={"btn btn-outline-dark "+ (res.links.next ? '':'disabled')}
            >
                {'next>'}
            </button>
            <button type="button" className="btn btn-outline-dark" onClick={()=>setSParams(`page=${res.meta.pagination.pages}`)} >{'Last>>'}</button>
        </div>
        </div>
    )
}

export default MyBlogs;