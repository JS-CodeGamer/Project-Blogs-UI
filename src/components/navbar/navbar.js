import React, { useEffect, useState } from 'react'
import { NavLink, Outlet} from 'react-router-dom'
import { users_backend } from 'utils/backends'
import { isLoggedIn } from 'utils/helpers'
import { profiledummydata } from 'utils/dummy_data'

const Navbar = (props) => {
    const media_url=process.env.REACT_APP_USERS_API_URL
    const [profile, setProfile] = useState({
        profile_pic:null
    });

    useEffect(() => {
        // Uncomment for production deployment with backend
        // users_backend('user/', {})
        // .then(res => setProfile(res.data))
        // .catch((err)=>{
        //     console.error('err:', err);
        // });
        setProfile(profiledummydata);
    }, [])
    return (
        <>
        <nav className='navbar navbar-dark navbar-expand-lg bg-dark'>
        <div className='container-fluid'>
            <NavLink className='navbar-brand fs-4' to='/'> Blog </NavLink>
            <button
                className='navbar-toggler'
                type='button'
            >
                <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to='/'> Home </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to='/myblogs'> My Blogs </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to='/about'> About the creator </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to='/help'> Help </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to='/create'> New Blog </NavLink>
                    </li>
                </ul>
                {isLoggedIn() ?
                    (<form className='d-flex'>
                        <NavLink className='me-3 btn btn-outline-light rounded-circle' to='/profile/'>
                            <img
                                src={`${media_url.slice(0,-1)}${profile.profile_pic}`}
                                className="img-thumbnail rounded-circle"
                                style={{width:'2em', height:'100%'}}
                                alt=""
                            />
                        </NavLink>
                    </form>) :
                (<form className='d-flex'>
                    <NavLink className='me-3 btn btn-outline-light' to='/signin'> Sign In </NavLink>
                </form>)}
            </div>
        </div>
        </nav>
        <main className="container my-4 w-75 h-100">
            {<Outlet/>}
        </main>
        </>
    )
}

export default Navbar
