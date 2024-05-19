import { Button } from 'antd'
import React from 'react'
import "../../../../assets/styles/components/button.css"
type Props = {
    classColor: "blue" | "gradient" | "grey" | "black" | "orange",
    onClick: Function,
    icon?: any,
    title: string
}
export const ButtonCommon = (props: Props) => {
    const {
        classColor,
        onClick,
        icon,
        title
    } = props;
    return (
        <div className='button-common'>
            <Button className={classColor} onClick={() => onClick()} icon={icon}>
                {title}
            </Button>
        </div>
    )
}
