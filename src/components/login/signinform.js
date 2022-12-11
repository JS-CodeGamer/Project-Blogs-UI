import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { users_backend } from 'utils/backends';

const SigninForm = (props) => {
    const navigate = useNavigate();
    const [formData, setformData] = useState({
        username_email:null,
        password:null,
    });
    const [statusStr, setstatusStr] = useState("")

    const handleOnChange = (e)=> {
        e.stopPropagation();
        setformData({...formData, [e.target.id]:e.target.value,});
    };
    const clickHandeler = (e) => {
        e.stopPropagation();
        users_backend('signin/',
        {
            data:formData,
            method:'post',
            authHeader:false
        })
        .then(res => {
                localStorage.setItem("access", res.data["access"])
                localStorage.setItem("refresh", res.data["refresh"])
                navigate(-1);
        })
        .catch((err)=>{
            console.error('err:', err);
            setstatusStr(err.response.data.message);
        });
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{width:'100vw', height:'100vh'}}>
        <div className={'container w-50'+(props.largeScreen?'':' border border-5 rounded-5 p-5')}>
            <form>
                <div className="mu-5 d-flex flex-row justify-content-center text-capitalize text-danger">
                    {statusStr}
                </div>
                <div className="mb-3">
                    <label htmlFor="login_identifier" className="form-label">Username</label>
                    <input required type="text" className="form-control" id="login_identifier" onChange={(e)=>handleOnChange(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input required type="password" className="form-control" id="password" onChange={(e)=>handleOnChange(e)}/>
                </div>
                <div className="mu-3 d-flex flex-row justify-content-around">
                    <button type="button" onClick={(e)=>clickHandeler(e)} className="btn btn-dark">Sign In</button>
                </div>
            </form>
            <p className="m-3 w-100 text-center">
                <span>
                    No Account?
                    <button type="button" onClick={() => props.setPageIsSignin(false)} className="mx-1 p-0 border-0 bg-transparent">
                        <b> Create One </b>
                    </button>
                </span>
            </p>
            </div>
        </div>
    )
}

export default SigninForm