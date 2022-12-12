import React, { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { blogs_backend, users_backend } from 'utils/backends';

const Profile = () => {
    // Parse URL params
    const {userID} = useParams();
    const [sParams, setSParams] = useSearchParams();
    const curr = sParams.get('page')?parseInt(sParams.get('page')):0;

    // get profile data
    const media_url=process.env.REACT_APP_USERS_API_URL
    const [profile, setProfile] = useState({
        profile_pic:null
    });
    const [smallScreen, setsmallScreen] = useState(false);
    useEffect(() => {
        setsmallScreen(window.matchMedia("(max-width: 768px)").matches);
        users_backend(`user/${userID}`, {authHeader:false})
        .then(res => setProfile(res.data))
        .catch((err)=>{
            console.error('err:', err);
        });
    }, [userID])


    // get blog data
    const [blogres, setblogRes]= useState({
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
        blogs_backend(`blogs/?page%5Bnumber%5D=${curr}`, {authHeader:false})
        .then(res => {
            setblogRes(res.data);
        })
        .catch(err=>console.error(err));
    }, [curr]);

    // format blog data for showing
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
        <>
            <div className="d-flex flex-column align-items-center">
                <img
                    src={`${media_url.slice(0,-1)}${profile.profile_pic}`}
                    className="img-thumbnail rounded-circle"
                    style={{width:'15rem', height:'15rem'}}
                    alt=""
                />
                <div className="my-5 d-flex flex-column align-items-center border border-5 rounded-5" style={
                    smallScreen?
                    {minWidth:'100%'} :
                    {minWidth:'50%'}
                }>
                    {Object.entries(profile).map((k) => {
                        if (k[0] === 'username' || k[0] === 'email')
                            return(
                                <div className="my-2 d-flex flex-column align-items-center text-center">
                                    <b className='text-capitalize' style={{width:'10em'}}>
                                        {k[0].split("_").join(' ')}:
                                    </b>
                                    <div className="container  overflow-hidden">
                                        {k[1]}
                                    </div>
                                </div>
                            )
                        return ""
                    })}
                </div>
                <div>
                <ul className="list-group">
                    {blogres.data.map((blog)=>{
                        return (
                            <li className="list-group-item d-flex justify-content-between align-items-start" key={`${blog.id}`}>
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{blog.title}</div>
                                    {blog.content}
                                </div>
                                <div className="d-flex justify-content-end">
                                    <Link to={`/blog/${blog.id}`} className="btn btn-dark m-1" style={{width:"45%"}}>Read</Link>
                                </div>
                            </li>
                        )
                    })}
                </ul>
                <div className="container my-3 d-flex flex-row justify-content-evenly">
                    <button
                        type="button"
                        onClick={()=>setSParams(`page=${blogres.links.prev}`)}
                        className={"btn btn-outline-dark "+ (blogres.links.prev ? '':'disabled')}
                    >
                        {'<prev'}
                    </button>
                    <button type="button" className="btn btn-outline-dark" disabled> {blogres.meta.pagination.page} </button>
                    <button
                        type="button"
                        onClick={()=>setSParams(`page=${blogres.links.next}`)}
                        className={"btn btn-outline-dark "+ (blogres.links.next ? '':'disabled')}
                    >
                        {'next>'}
                    </button>
                </div>
                </div>
            </div>
        </>
    )
}

export default Profile