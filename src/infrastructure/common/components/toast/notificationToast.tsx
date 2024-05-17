import { notification } from "antd";
import {
    CheckCircleOutlined,
    InfoCircleOutlined,
} from '@ant-design/icons';

export const SuccessMessage = (message: string, description: string) => {
    notification.success({
        message: <div className="text-[#3bc955]">{message}</div>,
        description: <div className="text-[#3bc955]">{description}</div>,
        icon: <CheckCircleOutlined className="text-[#3bc955] text-[24px]" />,
    });
}

export const FailMessage = (message: string, description: string) => {
    notification.error({
        message: <div className="text-[#ff4750]">{message}</div>,
        description: <div className="text-[#ff4750]">{description}</div>,
        icon: <InfoCircleOutlined className="text-[#ff4750] text-[24px]" />,
        className: "fail-message",
    });
}
export const WarningMessage = (message: string, description: string) => {
    notification.info({
        message: <div className="text-[#eaa845]">{message}</div>,
        description: <div className="text-[#eaa845]">{description}</div>,
        icon: <InfoCircleOutlined className="text-[#eaa845] text-[24px]" />,
        className: "warning-message",
    });
}
