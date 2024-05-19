import React, { useState } from 'react'
import LayoutClient from '../../../infrastructure/common/layout/Layout-Client'
import { Col, Row } from 'antd'
import InputTextCommon from '../../../infrastructure/common/components/input/input-text'
import { ButtonCommon } from '../../../infrastructure/common/components/button/button-common'
import { FullPageLoading } from '../../../infrastructure/common/components/controls/loading'
import InputNumberCommon from '../../../infrastructure/common/components/input/input-number'
import InputDateCommon from '../../../infrastructure/common/components/input/input-date'
import { WarningMessage } from '../../../infrastructure/common/components/toast/notificationToast'
import regularPassService from '../../../infrastructure/repositories/regular-pass/service/regular-pass.service'
import { useNavigate } from 'react-router-dom'
import { ROUTE_PATH } from '../../../core/common/appRouter'
import { convertDateOnly } from '../../../infrastructure/helper/helper'

const RegularPass = () => {
    const [_data, _setData] = useState<any>({});
    const [validate, setValidate] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [submittedTime, setSubmittedTime] = useState<any>();

    const dataPurchase = _data;
    const setDataPurchase = (data: any) => {
        Object.assign(dataPurchase, { ...data });
        _setData({ ...dataPurchase });
    };

    const navigate = useNavigate();

    const onBack = () => {
        navigate(ROUTE_PATH.PARKING_LOT_CLIENT)
    };

    const isValidData = () => {
        let allRequestOK = true;

        setValidate({ ...validate });

        Object.values(validate).forEach((it: any) => {
            if (it.isError === true) {
                allRequestOK = false;
            }
        });
        return allRequestOK;
    };
    const onPurchaseAsync = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await regularPassService.addRegularPass({
                startDate: convertDateOnly(dataPurchase.startDate),
                durationInDays: dataPurchase.durationInDays,
            },
                onBack,
                setLoading
            )
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
    }
    return (
        <LayoutClient>
            <div className='main-page h-full  overflow-auto rounded-[8px] bg-white px-4 py-8'>
                <div className='bg-white scroll-auto'>
                    <Row>
                        <Col span={24} className='border-add'>
                            <div className='legend-title'>Thêm thông tin mới</div>
                            <Row gutter={[30, 0]}>

                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputDateCommon
                                        label={"Ngày bắt đầu"}
                                        attribute={"startDate"}
                                        isRequired={true}
                                        dataAttribute={dataPurchase.startDate}
                                        setData={setDataPurchase}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        disabledToDate={true}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputNumberCommon
                                        label={"Số ngày"}
                                        attribute={"durationInDays"}
                                        isRequired={true}
                                        dataAttribute={dataPurchase.durationInDays}
                                        setData={setDataPurchase}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
                <Row justify={"center"}>
                    <Col className='mx-1 mt-4'>
                        <ButtonCommon
                            onClick={onPurchaseAsync}
                            classColor="orange"
                            icon={null}
                            title={'Mua vé tháng'}
                        />
                    </Col>
                </Row>
            </div>
            <FullPageLoading isLoading={loading} />
        </LayoutClient>
    )
}

export default RegularPass