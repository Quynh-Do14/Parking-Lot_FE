import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
/**
 * Full page loading
 */
type Props = {
    isLoading?: boolean,
    size?: string,
    tip?: any,
    color?: string
}

export const FullPageLoading = (props: Props) => {
    const { isLoading } = props;
    return (
        <>
            {isLoading === true ? (
                <div className={"full-page-loading"}>
                    <LoadingRegion size={"large"} tip={null} />
                </div>
            ) : null}
        </>
    );
};

/**
 * Loading spin
 */

export const LoadingRegion = (props: Props) => {
    const { tip, color } = props;

    return (
        <>
            <Spin
                tip={tip}
                // size={size}
                style={{ color: color }}
                indicator={<LoadingOutlined spin />}
            />
            {/* <p style={{ color: color }}>Loading</p> */}
        </>
    );
};
