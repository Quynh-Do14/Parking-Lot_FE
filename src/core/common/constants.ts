import { CalendarOutlined, ContainerOutlined, DatabaseOutlined, EnvironmentOutlined, MessageOutlined, ProjectOutlined, ScheduleOutlined, TableOutlined, TagOutlined, TagsOutlined, UserOutlined } from "@ant-design/icons";
import { ROUTE_PATH } from "./appRouter";

export default class Constants {
    static Menu = class {
        static List = [
            {
                label: "Quản lý khách hàng",
                link: ROUTE_PATH.CUSTOMER,
                icon: UserOutlined
            },
            {
                label: "Quản lý bãi đỗ xe",
                link: ROUTE_PATH.PARKING_LOT,
                icon: TableOutlined
            },

            {
                label: "Quản lý đặt chỗ",
                link: ROUTE_PATH.PARKING_RESERVATION,
                icon: CalendarOutlined
            },
            {
                label: "Quản lý vé tháng",
                link: ROUTE_PATH.REGULAR_PASS_ADMIN,
                icon: TagOutlined
            },
        ]
    };
    static MenuClient = class {
        static List = [
            {
                label: "Bãi gửi xe",
                link: ROUTE_PATH.PARKING_LOT_CLIENT,
            },
            {
                label: "Đặt vé tháng",
                link: ROUTE_PATH.REGULAR_PASS,
            },
            {
                label: "Quy định đỗ xe",
                link: ROUTE_PATH.PARKING_REGULATIONS,
            },
        ]
    };
    static TOKEN = "token";
    static DEBOUNCE_SEARCH = 800;

    static Params = class {
        static limit = "limit";
        static page = "page";
        static searchName = "searchName";
        static search = "search";
        static idDanhMuc = "idDanhMuc";
        static parentId = "parentId"
    }

    static PaginationClientConfigs = class {
        static Size = 6;
        static LimitSize = 60;
        static AllSize = 9000;
        static PageSizeList = [
            { label: "6", value: 6 },
            { label: "12", value: 12 },
            { label: "48", value: 48 },
        ]
    };

    static PaginationConfigs = class {
        static Size = 10;
        static SizeSearchPage = 8;
        static LimitSize = 60;
        static AllSize = 9000;
        static PageSizeList = [
            { label: "10", value: 10 },
            { label: "20", value: 20 },
            { label: "50", value: 50 },
        ]
    };

    static UseParams = class {
        static Id = ":id"
    }

    static ReentryAllowed = class {
        static Allowed = class {
            static value = true;
            static label = "Được phép";
        }
        static NotAllowed = class {
            static value = false;
            static label = "Không được phép";
        }
        static List = [
            { label: "Được phép", value: true },
            { label: "Không được phép", value: false },
        ]
    }

    static ValetParkingAvailable = class {
        static Available = class {
            static value = true;
            static label = "Phải đặt trước";
        }
        static Unavailable = class {
            static value = false;
            static label = "Không phải đặt trước";
        }
        static List = [
            { label: "Phải đặt trước", value: true },
            { label: "Không phải đặt trước", value: false },
        ]
    }

    static Gender = class {
        static MALE = class {
            static value = "MALE";
            static label = "Nam";
        }
        static FEMALE = class {
            static value = "FEMALE";
            static label = "Nữ";
        }
        static List = [
            { label: "Nam", value: "MALE" },
            { label: "Nữ", value: "FEMALE" },
        ]
    }
};