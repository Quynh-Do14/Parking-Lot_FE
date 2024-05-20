import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import "../../../../assets/styles/components/input.css"
import { validateFields } from '../../../helper/helper';
import { validateCMND, validateEmail, validatePhoneNumber } from '../../../helper/validate';
import { MessageError } from '../controls/MessageError';
type Props = {
    label: string,
    attribute: string,
    isRequired: boolean,
    setData: Function,
    dataAttribute: any,
    disabled: boolean,
    validate: any,
    setValidate: Function,
    submittedTime: any,
    data?: any
}
const InputPasswordCommon = (props: Props) => {
    const {
        label,
        attribute,
        isRequired,
        setData,
        dataAttribute,
        disabled = false,
        validate,
        setValidate,
        submittedTime,
        data
    } = props;
    const [value, setValue] = useState<string>("");

    const onChange = (e: any) => {
        setValue(e.target.value || "");
        setData({
            [attribute]: e.target.value || ''
        });
    };
    let labelLower = label?.toLowerCase();
    const onBlur = (isImplicitChange = false) => {
        let checkValidate
        if (isRequired) {
            validateFields(isImplicitChange, attribute, !value, setValidate, validate, !value ? `Vui lòng nhập ${labelLower}` : "");

            if (attribute.includes("email")) {
                checkValidate = validateEmail(value);
                validateFields(isImplicitChange, attribute, !checkValidate, setValidate, validate, !checkValidate ? value ? `Vui lòng nhập đúng định dạng ${labelLower}` : `Vui lòng nhập ${labelLower}` : "");
            }
            if (attribute.includes("phone")) {
                checkValidate = validatePhoneNumber(value);
                validateFields(isImplicitChange, attribute, !checkValidate, setValidate, validate, !checkValidate ? value ? `Vui lòng nhập đúng định dạng ${labelLower}` : `Vui lòng nhập ${labelLower}` : "");
            }
            if (attribute.includes("cccd") || attribute.includes("long")) {
                checkValidate = validateCMND(value);
                validateFields(isImplicitChange, attribute, !checkValidate, setValidate, validate, !checkValidate ? value ? `${label} bao gồm 12 số` : `Vui lòng nhập ${labelLower}` : "");
            }
            // if (attribute == "newPassword") {
            //     if (data?.confirmPassword !== data?.newPassword) {
            //         validateFields(false, "newPassword", !checkValidate, setValidate, validate, value ? `Mật khẩu xác nhận không trùng với mật khẩu mới` : "");
            //     }
            // };
            // if (attribute == "confirmPassword") {
            //     if (data?.confirmPassword !== data?.newPassword) {
            //         validateFields(false, "confirmPassword", !checkValidate, setValidate, validate, value ? `Mật khẩu xác nhận không trùng với mật khẩu mới` : "");
            //     }
            // };
        }
    };

    useEffect(() => {
        setValue(dataAttribute || '');

    }, [dataAttribute]);

    useEffect(() => {
        if (submittedTime != null) {
            onBlur(true);
        }
    }, [submittedTime]);
    return (
        <div>
            <div className='mb-4 input-common'>
                <div className='title mb-2'>
                    <span>
                        <span className='label'>{label}</span>
                        <span className='ml-1 is-required'>{isRequired ? "*" : ""} </span>
                    </span>
                </div>
                <div>
                    <Input.Password
                        size={"middle"}
                        value={value ? value : ""}
                        onChange={onChange}
                        onBlur={() => onBlur(false)}
                        disabled={disabled}
                        placeholder={`Nhập ${labelLower}`}
                        className={`${validate[attribute]?.isError ? "input-error" : ""}`}
                    />
                    <MessageError isError={validate[attribute]?.isError || false} message={validate[attribute]?.message || ""} />
                </div>
            </div>
        </div>
    )
};
export default InputPasswordCommon;