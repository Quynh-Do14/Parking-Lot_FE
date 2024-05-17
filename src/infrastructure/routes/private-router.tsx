import { Navigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../core/common/appRouter';
import { isTokenStoraged } from '../utils/storage';

export const PrivateRoute = ({ component: RoutePath }: any) => {
    let storage = isTokenStoraged();

    if (storage) {
        return RoutePath
    }

    return <Navigate to={ROUTE_PATH.LOGIN} />
}