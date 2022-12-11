import React, { createContext, useContext, useEffect } from 'react'

const contextprovidor = createContext({});


const GlobalContext = () => {
    const [smallScreen, setSmallScreen] = useState(false);

    useEffect(() => {
        setSmallScreen(window.matchMedia("(max-width: 768px)").matches);
    }, []);

    return (
        <div>GlobalContext</div>
    )
}

export default GlobalContext