export class Endpoint {
    static Auth = class {
        // static Login = "/auth/login";
        static Login = "/login"
        static Profile = "/profile"
    }
    static ParkingLot = class {
        static Get = "/parking-lots"
        static Add = "/parking-lots/add"
        static Update = "/parking-lots/update"
        static Delete = "/parking-lots/delete"
    }
}