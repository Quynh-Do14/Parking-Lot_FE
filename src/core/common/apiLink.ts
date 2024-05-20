export class Endpoint {
    static Auth = class {
        static Login = "/auth/login"
        static Register = "/auth/signup"
        static Profile = "/auth/profile"
        static ProfileUpdate = "/profile/update"
        static Customer = "/customers/update"
        static ChangePassword = "/auth/change-password"
    }
    static ParkingLot = class {
        static Get = "/parking-lots"
        static GetAdminShow = "/parking-lots/admin/show"
        static Add = "/parking-lots/admin/add"
        static Update = "/parking-lots/admin/update"
        static Delete = "/parking-lots/admin/delete"
        
        static GetReservations = "/parking-slot-reservations/add"
        static DeleteReservation = "/parking-slot-reservations/delete"
        static GetReservationAdmin = "/parking-slot-reservations/admin"
        static GetReservationShow = "/parking-slot-reservations/show"
    }
    static RegularPass = class {
        static Get = "/regular-passes/show"
        static Add = "/regular-passes/add"
        static Renew = "/regular-passes/renew"
        static GetAdmin = "/regular-passes/admin"
    }
    static Customer = class {
        static Get = "/customers/admin"
        static Add = "/customers/add"
        static Update = "/customers/update"
        static Delete = "/customers/delete"
    }
}