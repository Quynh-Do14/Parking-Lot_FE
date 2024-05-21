import { Endpoint } from "../../../../core/common/apiLink";
import { FailMessage, SuccessMessage } from "../../../common/components/toast/notificationToast";
import { messageConfig } from "../../../helper/message";
import { RequestService } from "../../../utils/response";
import { saveToken } from "../../../utils/storage";

class AuthService {
    async login(data: any, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .post(Endpoint.Auth.Login, {
                    ...data
                })
                .then(response => {
                    if (response) {
                        saveToken(response.token)
                    }
                    setLoading(false)
                    SuccessMessage("Đăng nhập thành công", "")
                    return response;
                });
        } catch (error: any) {
            console.error(error)
            FailMessage("Đăng nhập không thành công", messageConfig(error.response.data.message))
        } finally {
            setLoading(false);
        }
    }
    async logout(setLoading: Function) {
        setLoading(true)
        try {
            sessionStorage.clear();
            SuccessMessage("Đăng xuất thành công", "")
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
            // window.location.reload()
            // window.location.href(config.routes.web.home)
        };
    };


    async profile(setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService.
                get(Endpoint.Auth.Profile).then(response => {
                    return response;
                });
        }
        catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    async updateProfile(data: any, onBack: Function, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .put(Endpoint.Auth.ProfileUpdate, {
                    ...data
                })
                .then(response => {
                    if (response) {
                        onBack();
                        SuccessMessage("Cập nhật thành công", "")
                    }
                    setLoading(false);
                    return response;
                });
        } catch (error: any) {
            console.error(error)
            FailMessage("Cập nhật không thành công", "Vui lòng kiểm tra thông tin")
        } finally {
            setLoading(false);
        }
    }

    async register(data: object, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService.post(Endpoint.Auth.Register, {
                ...data
            }).then(response => {
                setLoading(false)
                SuccessMessage("Đăng kí thành công", "")
                return response;
            });
        } catch (error: any) {
            FailMessage("Đăng nhập không thành công", messageConfig(error.response.data.message))
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    async changePassword(data: object, onBack: Function, setLoading: Function) {
        try {
            return await RequestService.put(Endpoint.Auth.ChangePassword,
                { ...data },
            ).then(response => {
                setLoading(false)
                SuccessMessage("Thay đổi mật khẩu thành công", "")
                onBack()
                return response;
            });
        } catch (error: any) {
            FailMessage("Thay đổi mật khẩu không thành công", messageConfig(error.response.data.message))
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    // async verifyEmail(token, setLoading, callBack) {
    //     setLoading(true)
    //     try {
    //         return await RequestService.post(`${apiRoutes.common.auth.verify_email}/${token}`).then(
    //             (response) => {
    //                 if (response) {
    //                     SuccessMessage("Xác thực Email thành công")
    //                     return response;
    //                 }
    //             });
    //     }
    //     catch (error) {
    //         FailMessage("Xác thực không thành công", "")
    //         console.error(error)
    //     } finally {
    //         setLoading(false);
    //         callBack()
    //     }
    // }

    // async forgotPassword(email, setLoading) {
    //     setLoading(true)
    //     try {
    //         return await RequestService.post(`${apiRoutes.common.auth.forgot_password}?email=${email}`,
    //             {},
    //         ).then((response) => {
    //             if (response) {
    //                 setLoading(false)
    //                 SuccessMessage("Gửi Email thành công", "Yêu cầu thiết lập lại mật khẩu của bạn gửi thành công. Kiểm tra Email để thiết lập lại mật khẩu")
    //                 return response;
    //             }
    //         });
    //     } catch (error) {
    //         FailMessage("Gửi Email không thành công", "Kiểm tra lại thông tin Email")
    //         console.error(error)
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    // async resetPassword(email, token, setLoading, setIsSuccessDialog) {
    //     setLoading(true)
    //     try {
    //         return await RequestService.post(`${apiRoutes.common.auth.reset_password}?newPassword=${email}&token=${token}`,
    //             {},
    //         ).then(response => {
    //             setLoading(false)
    //             SuccessMessage("Thay đổi mật khẩu thành công", "")
    //             setIsSuccessDialog(true)
    //             return response;
    //         });
    //     } catch (error) {
    //         FailMessage("Thay đổi mật khẩu không thành công", "Kiểm tra lại thông tin")
    //         console.error(error)
    //         setIsSuccessDialog(false)
    //     } finally {
    //         setLoading(false);
    //     }
    // }

}

export default new AuthService();
