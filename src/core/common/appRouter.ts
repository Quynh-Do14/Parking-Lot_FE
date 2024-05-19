const PREFIX = "";

export const ROUTE_PATH = {

    LOGIN: `${PREFIX}/login`,
    REGISTER: `${PREFIX}/register`,
    ///Client
    HOMEPAGE: `${PREFIX}/`,
    PARKING_LOT_CLIENT: `${PREFIX}/parking-lot-client`,

    VIEW_PARKING_LOT_CLIENT: `${PREFIX}/parking-lot-client/view/:id`,

    REGULAR_PASS: `${PREFIX}/regular-pass`,
    ///Management
    MAINLAYOUT: `${PREFIX}/main-layout`,

    CUSTOMER: `${PREFIX}/customer`,
    VIEW_CUSTOMER: `${PREFIX}/customer/view/:id`,
    ADD_CUSTOMER: `${PREFIX}/customer/add`,

    PARKING_LOT: `${PREFIX}/parking-lot`,
    VIEW_PARKING_LOT: `${PREFIX}/parking-lot/view/:id`,
    ADD_PARKING_LOT: `${PREFIX}/parking-lot/add`,

    PARKING_SLIP: `${PREFIX}/parking-slip`,
    VIEW_PARKING_SLIP: `${PREFIX}/parking-slip/view/:id`,
    ADD_PARKING_SLIP: `${PREFIX}/parking-slip/add`,

}