import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
    const { isAuthenticated, role: userRole } = useSelector((state) => state.auth);

    // If the user is not authenticated, redirect to the home page or login page
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    // If the role is defined and does not match the user's role, or if userRole is an array and doesn't include the required role, redirect
    if (role && (Array.isArray(userRole) ? !userRole.includes(role) : role !== userRole)) {
        return <Navigate to="/" replace />;
    }

    // If everything is fine, render the children components
    return children;
};

export default ProtectedRoute;