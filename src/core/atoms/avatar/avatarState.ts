import { atom } from "recoil";

export const AvatarState = atom({
    key: 'AVATAR_STATE', // unique ID (with respect to other atoms/selectors)
    default: {
        // isLoading: false,
        // uri: '',
        data: <any>null
    }, // default value (aka initial value)
});