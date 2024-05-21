import HeaderClient from "./Header"
import "../../../assets/styles/components/MainLayout.css";
import bg from "../../../assets/images/bg.jpg"
const LayoutClient = ({ ...props }: any) => {
    return (
        <div className="main-layout-client">
            <HeaderClient />
            <div className="content-layout-client">
                <div className="overlay"></div>
                <div className=" flex flex-col scroll-auto z-10">{props.children}</div>

            </div>
        </div>

    )
}

export default LayoutClient