import { Navigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../core/common/appRouter';
import { isTokenStoraged } from '../utils/storage';
import { useRecoilValue } from 'recoil';
import { ProfileState } from '../../core/atoms/profile/profileState';
import { useEffect, useState } from 'react';

export const PrivateRoute = ({ component: RoutePath }: any) => {
    const storage = isTokenStoraged();
    const dataProfile = useRecoilValue(ProfileState);
    // const [isAdmin, setIsAdmin] = useState<boolean>(false)

    const isAdmin = dataProfile.user.roles?.some((role) => role?.name?.includes("ADMIN"));

    if (dataProfile.user.roles.length > 0) {
        if (storage && isAdmin) {
            return RoutePath
        }
        else {
            return <Navigate to={ROUTE_PATH.LOGIN} />
        }
    }
}