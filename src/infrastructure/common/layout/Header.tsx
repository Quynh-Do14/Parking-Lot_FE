import { Col, Dropdown, Menu, Row, Space } from 'antd'
import "../../../assets/styles/components/MainLayout.css";
import React, { useEffect, useState } from 'react'
import Constants from '../../../core/common/constants'
import { useLocation, useNavigate } from 'react-router-dom';
import car from '../../../assets/images/car.png';
import profile from "../../../assets/images/profile.png";
import authService from '../../repositories/auth/service/auth.service';
import { ROUTE_PATH } from '../../../core/common/appRouter';
import DialogConfirmCommon from '../components/modal/dialogConfirm';
import { isTokenStoraged } from '../../utils/storage';
import { useRecoilState } from 'recoil';
import { ProfileState } from '../../../core/atoms/profile/profileState';
import ProfileModal from './Profile';
import ChangePasswordModal from '../components/toast/changePassword';
import ModalHistory from '../components/modal/modalHistory';
const HeaderClient = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [dataProfile, setDataProfile] = useState<any>({});
    const [isOpenModalLogout, setIsOpenModalLogout] = useState<boolean>(false);
    const [isOpenModalProfile, setIsOpenModalProfile] = useState<boolean>(false);
    const [isOpenModalChangePassword, setIsOpenModalChangePassword] = useState<boolean>(false);
    const [isOpenModalHistoryShow, setIsOpenModalHistoryShow] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false)

    const [, setProfileState] = useRecoilState(ProfileState);
    const getProfileUser = async () => {
        try {
            await authService.profile(
                () => { }
            ).then((response) => {
                if (response) {
                    setDataProfile(response?.customer?.user)
                    setProfileState(
                        {
                            user: response?.customer?.user,
                            contactNumber: response?.customer?.contactNumber,
                            vehicleNumber: response?.customer?.vehicleNumber,
                            regularPass: response?.regularPass
                        }
                    )
                }
            })
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getProfileUser().then(() => { })
    }, [])


    const openModalLogout = () => {
        setIsOpenModalLogout(true);
    };

    const onCloseModalLogout = () => {
        setIsOpenModalLogout(false);
    };

    const onLogOut = async () => {
        setIsOpenModalLogout(false);
        try {
            await authService.logout(
                setLoading
            ).then(() => {
                navigate(ROUTE_PATH.LOGIN);
                window.location.reload();
            });
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        dataProfile.roles?.map((it: any) => {
            if (it.name == "ADMIN") {
                setIsAdmin(true)
            }
        })
    }, [dataProfile])

    const openModalProfile = () => {
        setIsOpenModalProfile(true);
    };

    const onCloseModalProfile = () => {
        setIsOpenModalProfile(false);
    };

    const openModalChangePassword = () => {
        setIsOpenModalChangePassword(true);
    };

    const onCloseModalChangePassword = () => {
        setIsOpenModalChangePassword(false);
    };
    const openModalHistoryShow = () => {
        setIsOpenModalHistoryShow(true);
    };

    const onCloseModalHistoryShow = () => {
        setIsOpenModalHistoryShow(false);
    };

    const listAction = () => {
        return (
            <Menu className='action-admin'>
                {
                    isAdmin
                    &&
                    <Menu.Item className='info-admin' onClick={() => { navigate(ROUTE_PATH.MAINLAYOUT) }}>
                        <div className='info-admin-title px-1 py-2 flex items-center hover:text-[#5e5eff]'>
                            <svg className='mr-1' fill="#808080" width="20px" height="20px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                <path d="M31,0H1A1,1,0,0,0,0,1V7.67a1,1,0,0,0,1,1H31a1,1,0,0,0,1-1V1A1,1,0,0,0,31,0ZM28.67,3.67H30V5H28.67ZM2,2H26.93a1,1,0,0,0-.26.67V6a1,1,0,0,0,.26.67H2Z" />
                                <path d="M31,11.67H1a1,1,0,0,0-1,1v6.66a1,1,0,0,0,1,1H31a1,1,0,0,0,1-1V12.67A1,1,0,0,0,31,11.67ZM18.67,15.33H30v1.34H18.67ZM2,13.67H16.93a1,1,0,0,0-.26.66v3.34a1,1,0,0,0,.26.66H2Z" />
                                <path d="M31,23.33H1a1,1,0,0,0-1,1V31a1,1,0,0,0,1,1H31a1,1,0,0,0,1-1V24.33A1,1,0,0,0,31,23.33ZM28.67,27H30v1.33H28.67ZM2,25.33H26.93a1,1,0,0,0-.26.67v3.33a1,1,0,0,0,.26.67H2Z" />
                            </svg>
                            Quản trị viên
                        </div>
                    </Menu.Item>
                }
                <Menu.Item className='info-admin' onClick={openModalProfile}>
                    <div className='info-admin-title px-1 py-2 flex items-center hover:text-[#5e5eff]'>
                        <svg className='mr-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="5" r="4" />
                            <path d="M12 9a9 9 0 0 1 9 9H3a9 9 0 0 1 9-9z" />
                        </svg>
                        Thông tin cá nhân
                    </div>
                </Menu.Item>
                <Menu.Item className='info-admin' onClick={openModalHistoryShow}>
                    <div className='info-admin-title px-1 py-2 flex items-center hover:text-[#5e5eff]'>
                        <svg className='mr-1' width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 3V6M17 3V6M7.10002 20C7.56329 17.7178 9.58104 16 12 16C14.419 16 16.4367 17.7178 16.9 20M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21ZM14 11C14 12.1046 13.1046 13 12 13C10.8954 13 10 12.1046 10 11C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11Z" stroke="#808080" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        Lịch sử đặt
                    </div>
                </Menu.Item>
                <Menu.Item className='info-admin' onClick={openModalChangePassword}>
                    <div className='info-admin-title px-1 py-2 flex items-center hover:text-[#5e5eff]'>
                        <svg className='mr-1' fill="#808080" height="20px" width="20px" version="1.1" id="Icon" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24" enable-background="new 0 0 24 24" >
                            <path d="M24,19v-2h-2.14c-0.09-0.36-0.24-0.7-0.42-1.02l1.52-1.52l-1.41-1.41l-1.52,1.52c-0.32-0.19-0.66-0.33-1.02-0.42V12h-2v2.14
                            c-0.36,0.09-0.7,0.24-1.02,0.42l-1.52-1.52l-1.41,1.41l1.52,1.52c-0.19,0.32-0.33,0.66-0.42,1.02H12v2h2.14
                            c0.09,0.36,0.24,0.7,0.42,1.02l-1.52,1.52l1.41,1.41l1.52-1.52c0.32,0.19,0.66,0.33,1.02,0.42V24h2v-2.14
                            c0.36-0.09,0.7-0.24,1.02-0.42l1.52,1.52l1.41-1.41l-1.52-1.52c0.19-0.32,0.33-0.66,0.42-1.02H24z M18,20c-1.1,0-2-0.9-2-2
                            s0.9-2,2-2s2,0.9,2,2S19.1,20,18,20z M11,7.41l3.29,3.29l1.41-1.41L12.41,6L13,5.41l2.29,2.29l1.41-1.41L14.41,4L15,3.41l3.29,3.29
                            l1.41-1.41L16.41,2l0.29-0.29l-1.41-1.41L6.89,8.7C6.19,8.26,5.38,8,4.5,8C2.02,8,0,10.02,0,12.5S2.02,17,4.5,17S9,14.98,9,12.5
                            c0-0.88-0.26-1.69-0.7-2.39L11,7.41z M4.5,15C3.12,15,2,13.88,2,12.5S3.12,10,4.5,10S7,11.12,7,12.5S5.88,15,4.5,15z"/>
                        </svg>
                        Đổi mật khẩu
                    </div>
                </Menu.Item>
                <Menu.Item className='info-admin' onClick={openModalLogout}>
                    <div className='info-admin-title px-1 py-2 flex items-center hover:text-[#fc5a5a]' >
                        <svg className='mr-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10" />
                            <polyline points="10 17 15 12 10 7" />
                            <line x1="15" y1="12" x2="3" y2="12" />
                        </svg>
                        Đăng xuất
                    </div>
                </Menu.Item>
            </Menu>
        )
    };

    return (
        <div className="header-common px-3 z-10">
            <Row justify="space-between">
                <div className="flex gap-4">
                    <div onClick={() => navigate(ROUTE_PATH.PARKING_LOT_CLIENT)} className="flex gap-4 m-auto cursor-pointer" >
                        <img src={car} alt="" />
                        <div className="text-xl m-auto font-bold uppercase whitespace-nowrap">Quản lý đỗ xe</div>
                    </div>
                    <div className="m-auto">
                        <ul className="gap-3 flex m-auto">
                            {Constants.MenuClient.List.map((item: any, index: number) => {
                                return (
                                    <li key={index} className={`cursor-pointer text-[15px] font-semibold capitalize ${location.pathname.includes(item.link) ? "active" : ""} `} onClick={() => navigate(item.link)} >
                                        <div >
                                            {item.label}

                                        </div>
                                    </li>


                                )
                            })}
                        </ul>
                    </div>
                </div>
                {
                    isTokenStoraged()
                        ?
                        <Row align={"middle"} >
                            <Col className='mr-2 flex flex-col align-bottom'>
                                <div className='user-name'>
                                    {dataProfile?.name}
                                </div>
                                {/* <div className='role'>
                                {dataProfile.roles[0]?.name}
                            </div> */}
                            </Col>
                            <Col>
                                <Dropdown overlay={listAction} trigger={['click']}>
                                    <a onClick={(e) => e.preventDefault()}>
                                        <Space>
                                            <img className='rounded-full cursor-pointer' width={50} height={50} src={dataProfile.avatar ? dataProfile.avatar : profile} alt='' />
                                        </Space>
                                    </a>
                                </Dropdown>
                            </Col>
                        </Row>
                        :
                        <div
                            onClick={() => navigate(ROUTE_PATH.LOGIN)}
                            className='cursor-pointer text-[16px] font-semibold capitalize border-[2px] border-[#EDEEF3] rounded-[12px] px-6 py-2'
                        >
                            Đăng nhập
                        </div>
                }

            </Row>
            <DialogConfirmCommon
                message={"Bạn có muốn đăng xuất khỏi hệ thống"}
                titleCancel={"Bỏ qua"}
                titleOk={"Đăng xuất"}
                visible={isOpenModalLogout}
                handleCancel={onCloseModalLogout}
                handleOk={onLogOut}
                title={"Xác nhận"}
            />
            <ProfileModal
                handleCancel={onCloseModalProfile}
                visible={isOpenModalProfile}
                isLoading={loading}
            />
            <ChangePasswordModal
                handleCancel={onCloseModalChangePassword}
                visible={isOpenModalChangePassword}
                isLoading={loading}
            />
            <ModalHistory
                handleCancel={onCloseModalHistoryShow}
                visible={isOpenModalHistoryShow}
                isLoading={loading}
            />
        </div>
    )
}

export default HeaderClient