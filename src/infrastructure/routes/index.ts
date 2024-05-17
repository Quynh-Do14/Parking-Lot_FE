import { ROUTE_PATH } from "../../core/common/appRouter";
import LoginPage from "../../pages/Auth/Login";
import HomePage from "../../pages/Client/homepage";
import AddParkingLotManagement from "../../pages/Manage/parking-lot-management/add";
import ListParkingLotManagement from "../../pages/Manage/parking-lot-management/list";
import ViewParkingLotManagement from "../../pages/Manage/parking-lot-management/view";
import AddUserManagement from "../../pages/Manage/user-management/add";
import ListUserManagement from "../../pages/Manage/user-management/list";
import ViewUserManagement from "../../pages/Manage/user-management/view";
import MainLayout from "../common/layout/MainLayout";

export const privateRoutes = [
    {
        path: ROUTE_PATH.HOMEPAGE,
        component: HomePage,
        private: false,
    },
    // {
    //     path: ROUTE_PATH.MAINLAYOUT,
    //     component: MainLayout,
    //     private: true,
    // },
    {
        path: ROUTE_PATH.LOGIN,
        component: LoginPage,
        private: false,
    },
    {
        path: ROUTE_PATH.USER,
        component: ListUserManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.ADD_USER,
        component: AddUserManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.VIEW_USER,
        component: ViewUserManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.PARKING_LOT,
        component: ListParkingLotManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.ADD_PARKING_LOT,
        component: AddParkingLotManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.VIEW_PARKING_LOT,
        component: ViewParkingLotManagement,
        private: true,
    },
]