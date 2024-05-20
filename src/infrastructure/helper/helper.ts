import dayjs from "dayjs";
import moment from "moment";

export const validateFields = (isImplicitChange = false, key: any, isCheck: any, setError: Function, error: any, message: string) => {
    if (isImplicitChange) {
        error[key] = {
            isError: isCheck,
            message: message,
        };
    }
    else {
        setError({
            ...error,
            [key]: {
                isError: isCheck,
                message: message,
            }
        });
    }
};
export const reentryAllowedConfig = (reentryAllowed: boolean) => {
    if (reentryAllowed) {
        return "Được phép"
    }
}

export const convertStringToBoolean = (value: string) => {
    const booleanValue = value === 'true'; // Chuyển chuỗi 'true' và 'false' về boolean
    return booleanValue
};

export const convertDate = (date: any) => {
    if (date) {
        let dateFormat = new Date(date);
        return moment(dateFormat).format("YYYY-MM-DD hh:mm:ss");
    } return null;

};
export const convertDateShow = (date: any) => {
    if (date) {
        let dateFormat = new Date(date);
        return moment(dateFormat).format("hh:mm:ss DD-MM-YYYY");
    } return null;

};

export const convertDateOnlyShow = (date: any) => {
    if (date) {
        let dateFormat = new Date(date);
        return moment(dateFormat).format("DD-MM-YYYY");
    } return null;

};

export const convertDateOnly = (date: any) => {
    if (date) {
        let dateFormat = new Date(date);
        return moment(dateFormat).format("YYYY-MM-DD");
    } return null;

};
export const convertDateBooking = (date: any) => {
    if (date) {
        let dateFormat = new Date(date);
        return moment(dateFormat).format("YYYY-MM-DDThh:mm:ss");
    } return null;
};

export const formatCurrencyVND = (amount: string) => {
    // Định dạng số với phân cách hàng nghìn
    let formattedAmount = amount.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${formattedAmount} ₫`;
}