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
        case "username_exists":
            return `Tài khoản đã tồn tại. 
                    Vui lòng đăng kí tài khoản khác`;
        case "email_exists":
            return `Email đã được sử dụng. 
                    Vui lòng đăng kí email khác khác`;
        case "change_password_fail":
            return `Mật khẩu hiện tại không chính xác`;
        case "confirm_password_not_match":
            return `Mật khẩu xác nhận không chính xác`;
        case "Cannot delete booking > 1 hour":
            return `Đã quá thời gian hủy đặt chỗ (Chỉ có thể hủy trong vòng 1 tiếng sau khi đặt)`
        default:
            return "Đã có lỗi xảy ra"
    }
}
