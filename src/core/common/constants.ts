import { ContainerOutlined, DatabaseOutlined, EnvironmentOutlined, MessageOutlined, ProjectOutlined, ScheduleOutlined, TagsOutlined, UserOutlined } from "@ant-design/icons";
import { ROUTE_PATH } from "./appRouter";

export default class Constants {
    static Menu = class {
        static List = [
            {
                label: "Quản lý người dùng",
                link: ROUTE_PATH.USER,
                icon: UserOutlined
            },
            {
                label: "Quản lý bãi đỗ xe",
                link: ROUTE_PATH.PARKING_LOT,
                icon: UserOutlined
            },
            {
                label: "Quản lý khách hàng",
                link: "/ab",
                icon: UserOutlined
            },
            {
                label: "Quản lý đặt chỗ",
                link: "/ab",
                icon: UserOutlined
            },
            {
                label: "Quản lý báo cáo thống kê",
                link: "/ab",
                icon: UserOutlined
            },
            // {
            //     label: "Quản lý nhà hàng",
            //     link: ROUTE_PATH.RESTAURANT,
            //     icon: <ScheduleOutlined />
            // },
            // {
            //     label: "Quản lý khách sạn",
            //     link: ROUTE_PATH.HOTEL,
            //     icon: <ScheduleOutlined />
            // },
            // {
            //     label: "Quản lý lễ hội",
            //     link: ROUTE_PATH.FESTIVAL,
            //     icon: <ScheduleOutlined />
            // },
            // {
            //     label: "Quản lý đặc sản",
            //     link: ROUTE_PATH.SPECIALTY,
            //     icon: <TagsOutlined />
            // },
            // {
            //     label: "Quản lý tin tức",
            //     link: ROUTE_PATH.NEWS,
            //     icon: <ContainerOutlined />
            // },
            // {
            //     label: "Quản lý đánh giá",
            //     link: ROUTE_PATH.EVALUATE,
            //     icon: <ContainerOutlined />
            // },
            // {
            //     label: "Quản lý quận huyện",
            //     link: ROUTE_PATH.DISTRICT,
            //     icon: <ProjectOutlined />
            // },
        ]
    };
    static TOKEN = "token";
    static DEBOUNCE_SEARCH = 800;

    static Params = class {
        static limit = "limit";
        static page = "page";
        static searchName = "searchName";
        static search = "search";
        static idQuanHuyen = "idQuanHuyen";
        static idDanhMuc = "idDanhMuc";
        static parentId = "parentId"
    }

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