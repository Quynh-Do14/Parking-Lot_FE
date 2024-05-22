import { ROUTE_PATH } from "../../core/common/appRouter";
import LoginPage from "../../pages/Auth/Login";
import DetailParkingPage from "../../pages/Client/homepage/detail";
import ListParkingPage from "../../pages/Client/homepage/list";
import AddParkingLotManagement from "../../pages/Manage/parking-lot-management/add";
import ListParkingLotManagement from "../../pages/Manage/parking-lot-management/list";
import ViewParkingLotManagement from "../../pages/Manage/parking-lot-management/view";
import MainLayout from "../common/layout/MainLayout";
import ListCustomerManagement from "../../pages/Manage/customer-management/list";
import AddCustomerManagement from "../../pages/Manage/customer-management/add";
import ViewCustomerManagement from "../../pages/Manage/customer-management/view";
import RegularPass from "../../pages/Client/RegularPass";
import RegisterPage from "../../pages/Auth/Register";
import ListParkingReservationManagement from "../../pages/Manage/parking-reservation-management/list";
import ViewParkingReservationManagement from "../../pages/Manage/parking-reservation-management/view";
import ListRegularPassManagement from "../../pages/Manage/regular-pass/list";
import ViewRegularPassManagement from "../../pages/Manage/regular-pass/view";
import ParkingRegulation from "../../pages/Client/ParkingRegulations";

export const privateRoutes = [

    {
        path: ROUTE_PATH.LOGIN,
        component: LoginPage,
        private: false,
    },
    {
        path: ROUTE_PATH.REGISTER,
        component: RegisterPage,
        private: false,
    },

    ///Client
    // {
    //     path: ROUTE_PATH.HOMEPAGE,
    //     component: HomePage,
    //     private: false,
    // },
    {
        path: ROUTE_PATH.PARKING_LOT_CLIENT,
        component: ListParkingPage,
        private: false,
    },
    {
        path: ROUTE_PATH.VIEW_PARKING_LOT_CLIENT,
        component: DetailParkingPage,
        private: false,
    },
    {
        path: ROUTE_PATH.REGULAR_PASS,
        component: RegularPass,
        private: false,
    },
    {
        path: ROUTE_PATH.PARKING_REGULATIONS,
        component: ParkingRegulation,
        private: false,
    },
    ///Management
    {
        path: ROUTE_PATH.MAINLAYOUT,
        component: MainLayout,
        private: true,
    },
    {
        path: ROUTE_PATH.CUSTOMER,
        component: ListCustomerManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.ADD_CUSTOMER,
        component: AddCustomerManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.VIEW_CUSTOMER,
        component: ViewCustomerManagement,
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
    {
        path: ROUTE_PATH.PARKING_RESERVATION,
        component: ListParkingReservationManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.VIEW_PARKING_RESERVATION,
        component: ViewParkingReservationManagement,
        private: true,
    },

    {
        path: ROUTE_PATH.REGULAR_PASS_ADMIN,
        component: ListRegularPassManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.VIEW_REGULAR_PASS_ADMIN,
        component: ViewRegularPassManagement,
        private: true,
    },
]