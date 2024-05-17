export const messageConfig = (message: string) => {
    switch (message) {
        // case "username_not_exists":
        //     return `Tài khoản người dùng đã tồn tại.
        //             Vui lòng sử dụng Email hoặc Tên đăng nhập khác`;
        // case "size must be between 6 and 40":
        //     return "Mật khẩu bắt buộc trong khoảng 6 - 40 kí tự";
        case "username_not_exists":
            return `Tài khoản không tồn tại. 
                    Vui lòng đăng kí tài khoản để sử dụng hệ thống`;
        case "wrong_password":
            return `Mật khẩu không chính xác. 
                    Vui lòng kiểm tra lại thông tin đăng nhập`;
        // case "User with given email does not exist":
        //     return `Tài khoản không tồn tại. 
        //             Vui lòng đăng kí tài khoản để sử dụng hệ thống`;
        // case "Your account have been unactive":
        //     return `Tài khoản của bạn chưa được kích hoạt`;
        default:
            return ""
    }
}
