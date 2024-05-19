
export const clearToken = () => {
    sessionStorage.removeItem("token");
};

export const isTokenStoraged = () => {
    return !!sessionStorage.getItem("token");
};

export const getTokenStoraged = () => {
    return sessionStorage.getItem("token");
};

export const saveToken = (token: string) => {
    sessionStorage.setItem("token", token);
};

export const getStorage = (data: string) => {
    return sessionStorage.getItem(data);
};

export const setStorage = (key: string, value: string) => {
    return sessionStorage.setItem(key, value);
};
