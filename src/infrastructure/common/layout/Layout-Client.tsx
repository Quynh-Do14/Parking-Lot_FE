import HeaderClient from "./Header"
import "../../../assets/styles/components/MainLayout.css";
import bg from "../../../assets/images/bg.jpg"
const LayoutClient = ({ ...props }: any) => {
    return (
        <div className="main-layout-client">
            <HeaderClient />
            <div className="content-layout-client flex flex-col scroll-auto">
                {props.children}
            </div>
        </div>

    )
}

export default LayoutClient