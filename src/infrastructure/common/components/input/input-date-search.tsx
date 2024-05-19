import { SearchOutlined } from '@ant-design/icons';
import { DatePicker, Input } from 'antd';
import React from 'react'
import "../../../../assets/styles/components/input.css"
type Props = {
    placeholder: string,
    value: string
    onChange: any,
    disabled: boolean,
}
export const InputDateSearchCommon = (props: Props) => {
    const {
        placeholder,
        value,
        onChange,
        disabled,
    } = props;
    return (
        <div className='input-common'>
            <DatePicker
                className='w-full'
                size={"middle"}
                value={value ? value : ""}
                onChange={onChange}
                disabled={disabled}
                placeholder={placeholder}
                format={"DD/MM/YYYY"}
            />
        </div>
    )
}
