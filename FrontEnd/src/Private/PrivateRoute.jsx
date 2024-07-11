import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    return currentUser ? <Component {...rest} /> : <Navigate to="/" />;
};

export default PrivateRoute;
