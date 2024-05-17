import { atom } from "recoil";

export const ProfileState = atom({
    key: 'PROFILE_STATE', // unique ID (with respect to other atoms/selectors)
    default: {
        // isLoading: false,
        // uri: '',
        data: {
            username: "",
            email: "",
            avatar: "",
            name: ""
        }
    }, // default value (aka initial value)
});