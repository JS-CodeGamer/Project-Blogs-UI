import React, { useEffect, useState } from 'react'
import { users_backend } from 'utils/backends';
import { profiledummydata } from 'utils/dummy_data';

const MyProfile = () => {
    const media_url=process.env.REACT_APP_USERS_API_URL
    const [profile, setProfile] = useState({
        profile_pic:null
    });
    const [largeScreen, setlargeScreen] = useState(false);

    useEffect(() => {
        setlargeScreen(window.matchMedia("(max-width: 768px)").matches);
        // Uncomment for production deployment with backend
        // users_backend('user/', {})
        // .then(res => setProfile(res.data))
        // .catch((err)=>{
        //     console.error('err:', err);
        // });
        setProfile(profiledummydata)
    }, [])

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
                    largeScreen?
                    {minWidth:'100%'} :
                    {minWidth:'50%'}
                }>
                    {Object.entries(profile).map((k) => {
                        if (k[0] === 'last_login' || k[0] === 'user_category' || k[0] === 'profile_pic')
                            return "";
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
                    })}
                    <div className="container mt-4 mb-2 d-flex justify-content-center">
                        <button className='btn btn-dark'> Edit </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyProfile