import axiosInstance from "../../core/api/axiosInstance";

export const RequestService = {
    async get(url: any, params = {}) {
        let resp = await axiosInstance.get(url, {
            params,
        });
        return resp.data;
    },
    async post(url: any, obj = {}) {
        let resp = await axiosInstance.post(url, { ...obj });
        return resp.data;
    },
    async postForm(url: any, formData: any) {
        let resp = await axiosInstance.postForm(url, formData);
        return resp.data;
    },
    async put(url: any, obj = {}) {
        let resp = await axiosInstance.put(url, { ...obj });
        return resp.data;
    },
    async putForm(url: any, formData: any) {
        let resp = await axiosInstance.putForm(url, formData);
        return resp.data;
    },
    async patch(url: any, obj = {}) {
        let resp = await axiosInstance.patch(url, { ...obj });
        return resp.data;
    },
    async patchForm(url: any, formData: any) {
        let resp = await axiosInstance.patchForm(url, formData);
        return resp.data;
    },
    async delete(url: any) {
        let resp = await axiosInstance.delete(url);
        return resp.data;
    },
};
