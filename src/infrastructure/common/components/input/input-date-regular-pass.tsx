/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Col, DatePicker, Row } from 'antd';
import moment from 'moment';
import { MessageError } from '../controls/MessageError';
import { validateFields } from '../../../helper/helper';
import dayjs from 'dayjs';
import { useRecoilValue } from 'recoil';
import { ProfileState } from '../../../../core/atoms/profile/profileState';
type Props = {
    label: string,
    attribute: string,
    isRequired: boolean,
    setData: Function,
    dataAttribute: string,
    disabled: boolean,
    validate: any,
    setValidate: Function,
    submittedTime: any,
    showTime?: boolean,
    showHour?: boolean,
}
const InputDateRegularPassCommon = (props: Props) => {
    const {
        label,
        attribute,
        setData,
        validate,
        setValidate,
        isRequired,
        disabled = false,
        dataAttribute,
        submittedTime,
        showTime = false,
        showHour = false,
    } = props;
    const [value, setValue] = useState("");
    const profileState = useRecoilValue(ProfileState);


    const disabledDate = (current: any) => {
        if (profileState?.regularPass) {
            if (moment(new Date(profileState?.regularPass?.endDate)) > moment().startOf('day')) {
                return moment(new Date(profileState?.regularPass?.startDate)) > current || current > moment(new Date(profileState?.regularPass?.endDate));
            }
            else {
                return current && current < moment().startOf('day');
            }
        }
        else {
            return current && current < moment().startOf('day');
        }
    };

    const onChange = async (dateString: any) => {
        setValue(dateString || null);
        setData({
            [attribute]: dateString || ''
        });
    }
    let labelLower = label.toLowerCase();
    const onBlur = (isImplicitChange = false) => {
        if (isRequired) {
            validateFields(isImplicitChange, attribute, !value, setValidate, validate, !value ? `Vui lòng nhập ${labelLower}` : "");
        }
    }
    // useEffect(() => {
    //     if (dataAttribute) {
    //         setValue(dayjs(dataAttribute, "DD-MM-YYYY HH:mm:ss") || null);
    //     }
    // }, [dataAttribute]);

    useEffect(() => {
        if (submittedTime != null) {
            onBlur(true);
        }
    }, [submittedTime]);


    return (
        <div className='mb-4 input-common'>
            <div className='title mb-2'>
                <span>
                    <span className='label'>{label}</span>
                    <span className='ml-1 is-required'>{isRequired ? "*" : ""} </span>
                </span>
            </div>
            <div>
                <DatePicker
                    allowClear={false}
                    size="middle"
                    className={`${validate[attribute]?.isError ? "input-error" : ""} w-full input-date-common`}
                    value={value}
                    placeholder={`Chọn ${label}`}
                    // onChange={(values) => setValue(values)}
                    onChange={onChange}
                    disabledDate={disabledDate}
                    disabled={disabled}
                    format={`${showHour ? "DD/MM/YYYY hh:mm:ss" : "DD/MM/YYYY"}`}
                    showTime={showTime}
                />

                <MessageError isError={validate[attribute]?.isError || false} message={validate[attribute]?.message || ""} />
            </div>
        </div>
    );

};
export default InputDateRegularPassCommon;