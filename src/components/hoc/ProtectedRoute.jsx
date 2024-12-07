import { useUser } from '../../core/access/userContext';

const ProtectedRoute = ({ component: Component, permission, ...rest }) => {
    const { hasPermission } = useUser();

    if (!hasPermission(permission)) {
        return null;
    }
    return Component;
};

export default ProtectedRoute;
