import { Endpoint } from "../../../../core/common/apiLink";
import { FailMessage, SuccessMessage } from "../../../common/components/toast/notificationToast";
import { RequestService } from "../../../utils/response";
import { saveToken } from "../../../utils/storage";

class RegularPassService {
    async getRegularPass(params: object, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .get(Endpoint.RegularPass.Get, {
                    ...params
                })
                .then(response => {
                    if (response) {
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    };

    async addRegularPass(data: object, onBack: Function, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .post(Endpoint.RegularPass.Add,
                    data
                )
                .then(response => {
                    if (response) {
                        window.open(response.vnpayUrl, '_blank');
                        onBack()
                        SuccessMessage("Đặt vé thành công", "")
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error) {
            FailMessage("Đặt vé không thành công", "Vui lòng kiểm tra thông tin")
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    async renewRegularPass(data: object, onBack: Function, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .put(Endpoint.RegularPass.Renew,
                    data
                )
                .then(response => {
                    if (response) {
                        window.open(response.vnpayUrl, '_blank');
                        onBack()
                        SuccessMessage("Gia hạn thành công", "")
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error) {
            FailMessage("Gia hạn không thành công", "Vui lòng kiểm tra thông tin")
            console.error(error)
        } finally {
            setLoading(false);
        }
    }
    async getRegularPassAdmin(params: object, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .get(Endpoint.RegularPass.GetAdmin, {
                    ...params
                })
                .then(response => {
                    if (response) {
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    };
}

export default new RegularPassService();
