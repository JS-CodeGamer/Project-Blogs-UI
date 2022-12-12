import React, { useState } from 'react'
import { users_backend } from 'utils/backends';

const RegisterForm = (props) => {
    const [formData, setformData] = useState({
        username:null,
        email:null,
        password:null,
        confirm_password:null
    });

    const [statusStr, setstatusStr] = useState("")
    const handleOnChange = (e)=> {
        e.stopPropagation();
        setformData({...formData, [e.target.id]:e.target.value,});
    };
    const clickHandeler = (e) => {
        e.stopPropagation();

        if (formData.username!==null && (formData.password === formData.confirm_password)) {
            // Signup with valid Data Input
            const {confirm_password, ...reqFromData} = formData;
            // Uncomment for production deployment with backend
            // users_backend('register/',
            // {
            //     data:reqFromData,
            //     method:'post',
            //     authHeader:false
            // })
            // .then(res => props.setPageIsSignin(true))
            // .catch((err)=>{
            //     console.error('err:', err)
            //     setstatusStr(err.response.data.message);
            // });
            props.setPageIsSignin(true)
        } else {
            // Password DONT match, show error
            setstatusStr("Passwords don't match");
        }
    }


    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{width:'100vw', height:'100vh'}}>
        <div className={'container w-50'+(props.largeScreen?'':' border border-5 rounded-5 p-5')}>
            <form>
                <div className="mu-5 d-flex flex-row justify-content-center text-capitalize text-danger">
                    {statusStr}
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" required className="form-control" id="username" onChange={(e)=>handleOnChange(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" required className="form-control" id="email" aria-describedby="emailHelp" onChange={(e)=>handleOnChange(e)}/>
                    <div id="emailHelp" className="form-text">We will never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" required className="form-control" id="password" onChange={(e)=>handleOnChange(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
                    <input type="password" required className="form-control" id="confirm_password" onChange={(e)=>handleOnChange(e)}/>
                </div>
                <div className="mu-3 d-flex flex-row justify-content-around">
                    <button type="button" onClick={(e)=>clickHandeler(e)} className="btn btn-dark">Sign Up</button>
                </div>
            </form>
            <p className="m-3 w-100 text-center">
                <span>
                    Already have an account?
                    <button type="button" onClick={() => props.setPageIsSignin(true)} className="mx-1 p-0 border-0 bg-transparent">
                        <b> Sign In </b>
                    </button>
                </span>
            </p>
        </div>
        </div>
    )
}

export default RegisterForm