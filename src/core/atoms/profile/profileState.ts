import { atom } from "recoil";

export const ProfileState = atom({
    key: 'PROFILE_STATE', // unique ID (with respect to other atoms/selectors)
    default: {
        // isLoading: false,
        // uri: '',
        user: {
            username: "",
            email: "",
            avatar: "",
            name: "",
            roles: <Array<any>>[]
        },
        contactNumber: "",
        vehicleNumber: "",
        regularPass: <any>{}
    }, // default value (aka initial value)
});