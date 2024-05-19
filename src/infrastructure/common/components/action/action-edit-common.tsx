import React from 'react';
import "../../../../assets/styles/components/action.css"
import { Tooltip } from 'antd';
type Props = {
    onClickDetail: Function,
}
export const ActionEditCommon = (props: Props) => {
    const { onClickDetail } = props;
    return (
        <div className='action-common flex justify-center whitespace-nowrap'>
            <Tooltip className="custom-tooltip" color={'#fff'} overlayInnerStyle={{ color: "#475f7b" }} title={"Sửa"}>
                <div onClick={() => onClickDetail()} className='option p-1 cursor-pointer'>
                    <div className='option-select'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-4 w-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                        </svg>
                    </div>
                </div>
            </Tooltip>
        </div>
    )
}
