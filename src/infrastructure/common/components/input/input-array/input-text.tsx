import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import "../../../../../assets/styles/components/input.css"
import { validateFields } from '../../../../helper/helper';
import { validateCMND, validateEmail, validatePhoneNumber } from '../../../../helper/validate';
import { MessageError } from '../../controls/MessageError';
type Props = {
    label: string,
    attribute: string,
    dataAttribute?: any,
    isRequired: boolean,
    setData: Function,
    disabled: boolean,
    validate: any,
    setValidate: Function,
    submittedTime: any,
    setValidateAllItems?: Function,
    index: number,
    data: any,
}
const InputTextArrayCommon = (props: Props) => {
    const {
        label,
        attribute,
        dataAttribute,
        isRequired,
        setData,
        disabled = false,
        validate,
        setValidate,
        submittedTime,
        setValidateAllItems,
        index,
        data,
    } = props;
    const [value, setValue] = useState<string>("");

    if (setValidateAllItems) {
        setValidateAllItems([index], () => {
            if (disabled) {
                return {
                    index: index,
                    check: true
                };
            }
            let check = true;
            if (!value) {
                check = false;
            }
            return {
                index: index,
                check: check
            };;
        });
    }

    const onChange = (e: any) => {
        setData((prev: any) => {
            prev[index] = {
                ...prev[index],
                [attribute]: e.target.value || '',
            }
            return prev;
        });
        setValue(e.target.value || "");
    };

    let labelLower = label?.toLowerCase();
    const onBlur = (isImplicitChange = false) => {
        let checkValidate
        if (isRequired) {
            validateFields(isImplicitChange, `${attribute}${index}`, !value, setValidate, validate, !value ? `Vui lòng nhập ${labelLower}` : "");

            if (attribute.includes("email")) {
                checkValidate = validateEmail(value);
                validateFields(isImplicitChange, `${attribute}${index}`, !checkValidate, setValidate, validate, !checkValidate ? value ? `Vui lòng nhập đúng định dạng ${labelLower}` : `Vui lòng nhập ${labelLower}` : "");
            }
            if (attribute.includes("phone")) {
                checkValidate = validatePhoneNumber(value);
                validateFields(isImplicitChange, `${attribute}${index}`, !checkValidate, setValidate, validate, !checkValidate ? value ? `Vui lòng nhập đúng định dạng ${labelLower}` : `Vui lòng nhập ${labelLower}` : "");
            }
            if (attribute.includes("cccd")) {
                checkValidate = validateCMND(value);
                validateFields(isImplicitChange, `${attribute}${index}`, !checkValidate, setValidate, validate, !checkValidate ? value ? `${label} bao gồm 12 số` : `Vui lòng nhập ${labelLower}` : "");
            }
        }
    };

    useEffect(() => {
        if (dataAttribute) {
            setValue(dataAttribute)
        }
        else if (data[index]) {
            setValue(data[index][attribute]);
        }
    }, [index, data, attribute, dataAttribute]);


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
                    <Input
                        size={"middle"}
                        value={value ? value : ""}
                        onChange={onChange}
                        onBlur={() => onBlur(false)}
                        disabled={disabled}
                        placeholder={`Nhập ${labelLower}`}
                        className={`${validate[`${attribute}${index}`]?.isError ? "input-error" : ""}`}
                    />
                    <MessageError isError={validate[`${attribute}${index}`]?.isError || false} message={validate[`${attribute}${index}`]?.message || ""} />
                </div>
            </div>
        </div>
    )
};
export default InputTextArrayCommon;