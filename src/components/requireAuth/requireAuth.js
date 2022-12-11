import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from 'utils/helpers';

export const RequireAuth = (props) => {
    const navigate = useNavigate();

    if (!isLoggedIn()) {
        return navigate('/signin');
    } else if(props.children)
        return props.children;
    else
        navigate(-1);
}