import axios from "axios";
import { getAccessToken, getRefreshToken } from "./helpers";

export const blogs_backend = (url, {data=null, method='get', authHeader=true}) => {
    const access = getAccessToken();
    url=process.env.REACT_APP_BLOGS_API_URL+url;
    const headers={
        'Authorization':`Bearer ${access}`
    }
    if (access && authHeader)
        return axios({url,data,method,headers})
    else
        return axios({url,data,method})
}
export const users_backend = (url, {data=null, method='get', authHeader=true}) => {
    const access = getAccessToken();
    url=process.env.REACT_APP_USERS_API_URL+url;
    console.log(url);
    const headers= {
                        'Authorization':`Bearer ${access}`
                    }
    if (access && authHeader)
        return axios({url,data,method,headers})
        .catch( err => {
            if (err.response.data.code==='token_not_valid') {
                refresh_token();
                return users_backend({url,data,method,headers})
            }
        })
    else
        return axios({url,data,method}).then(res=>{return res}).catch(err=>console.log(err))
}

const refresh_token = () => {
    console.log('refreshing tokens');
    users_backend('token/refresh/',{
        method:'post',
        data: {
            'refresh':`${getRefreshToken()}`
        },
    })
    .then(res => {
        localStorage.setItem("access", res.data["access"])
    })
}