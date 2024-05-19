import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});
axiosInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${(token)}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error?.config;

        // if (error?.response?.status === 401 && !originalRequest._retry) {
        //   if (sessionStorage.getItem("token")) return await refreshToken(originalRequest);
        // }

        return Promise.reject(error);
    }
);

// const refreshToken = async (originalRequest) => {
//   originalRequest._retry = true;

//   try {
//     const token = sessionStorage.getItem("token");
//     const response = await axiosInstance.post(config.apiRoutes.common.auth.refresh_token, {
//       refreshToken: token?.refreshToken,
//       accessToken: token?.accessToken,
//     });
//     if (!response) {
//       sessionStorage.removeItem("token");
//       notification.error({
//         message: "Thông báo",
//         description: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại",
//       });
//       myHistory.replace(config.routes.web.login);
//       return Promise.reject();
//     }
//     const { refreshToken, accessToken } = response.data;
//     sessionStorage.setItem("token", { refreshToken, accessToken });
//     originalRequest.headers.Authorization = `Bearer ${token?.accessToken}`;

//     return axios(originalRequest);
//   } catch (error) {
//     console.log("🚀 ~ error refresh: ", error);
//     myHistory.replace(config.routes.web.login);
//     sessionStorage.removeItem("token");
//     notification.error({
//       message: "Thông báo",
//       description: "Bạn vui lòng đăng nhập để tiếp tục",
//     });
//     return Promise.reject(error);
//   }
// };

export default axiosInstance;
