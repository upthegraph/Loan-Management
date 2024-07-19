import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../hooks/UserContext';
import Loading from '../pages/Loading';

const PrivateRoute = ({ component: Component, adminRequired, ...rest }) => {
    const { user, loading } = useContext(UserContext);

    if (loading) {
        return <Loading />;
    }

    if (!user) {
        return <Redirect to="/login" />;
    }

    if (adminRequired && (user.username !== 'Admin' || user.email !== 'admin@gmail.com')) {
        return <Redirect to="/profile" />;
    }

    return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default PrivateRoute;
