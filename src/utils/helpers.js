export const getAccessToken = () => {
    const access=localStorage.getItem('access');
    return access;
}

export const getRefreshToken = () => {
    const refresh=localStorage.getItem('refresh');
    return refresh;
}

export const isLoggedIn = () => {
    return (getAccessToken()!==null);
}
