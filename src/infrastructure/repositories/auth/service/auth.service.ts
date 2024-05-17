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
            // if (error?.response?.data?.errors[0]?.defaultMessage) {
            //     FailMessage(messageConfig(error?.response?.data?.errors[0]?.defaultMessage), "")
            // }
            // if (error.response.data.message) {
            //     FailMessage(messageConfig(error.response.data.message), "")
            // }
            // else {
            console.error(error)
            FailMessage("Đăng nhập không thành công", messageConfig(error.response.data.message))
            // }
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

    // async register(data, setLoading) {
    //     setLoading(true)
    //     try {
    //         return await RequestService.post(apiRoutes.common.auth.register, {
    //             ...data
    //         }).then(response => {
    //             setLoading(false)
    //             SuccessMessage("Đăng kí thành công", "Hãy xác thực Email để tham gia thi")
    //             return response;
    //         });
    //     } catch (error) {
    //         if (error.response.data.message) {
    //             FailMessage(messageConfig(error.response.data.message), "")
    //         }
    //         if (error.response.data.errors[0]?.defaultMessage) {
    //             FailMessage(messageConfig(error.response.data.errors[0]?.defaultMessage), "")
    //         }
    //         else {
    //             FailMessage("Đăng kí không thành công", "Tài khoản của bạn chưa đúng")
    //         }
    //         console.error(error)
    //     } finally {
    //         setLoading(false);
    //     }
    // }
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
