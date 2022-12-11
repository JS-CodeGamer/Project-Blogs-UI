import React, { useEffect, useState } from 'react'
import RegisterForm from './registerform';
import SigninForm from './signinform';

const Signin = () => {
    const [pageIsSignin, setPageIsSignin] = useState(true);
    const [largeScreen, setlargeScreen] = useState(false);

    useEffect(() => {
        setlargeScreen(window.matchMedia("(max-width: 768px)").matches);
    }, [])

    if (pageIsSignin)
        return <SigninForm setPageIsSignin={setPageIsSignin} largeScreen={largeScreen}/>
    else
        return <RegisterForm setPageIsSignin={setPageIsSignin}/>
}

export default Signin