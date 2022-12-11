import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { blogs_backend } from 'utils/backends';

const AllBlogs = (props) => {
    const [res, setRes]= useState({
        count:null,
        prev:null,
        next:null,
        results:[{
            title:"",
            author:"",
            content:""
        }],
    });

    useEffect(() => {
        // TODO: Implement error checking in response
        blogs_backend('blogs/', {authHeader:false})
        .then(res => {
            setRes(res.data);
        })
        .catch(err=>console.error(err));
    }, []);

    const titlelinelength=50;
    const contentlinelength=80;
    const format = (str, len) => {
        return str.length>len?(str.slice(0,len-3)+'...'):str
    }

    return (
        <>
        <div className="row row-cols-1 row-cols-md-2 g-4">
            {res.results.map((blog)=>{
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
        {/*////////////////////////////////////////////////////////////////////////*/}
        {/*/////////////                              /////////////////////////////*/}
        {/*/////////////   //////   TODO   //////     /////////////////////////////*/}
        {/*/////////////    correct the code below    /////////////////////////////*/}
        {/*/////////////                              /////////////////////////////*/}
        {/*////////////////////////////////////////////////////////////////////////*/}
        <div className="container my-3 d-flex flex-row justify-content-around">
            <button>{'<<last'}</button>
            <button> {'curr'} </button>
            <button>{'next>>'}</button>
        </div>
        </>
    )
}

export default AllBlogs
