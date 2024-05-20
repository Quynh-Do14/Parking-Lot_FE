import React, { useEffect, useState } from 'react'
import LayoutClient from '../../../infrastructure/common/layout/Layout-Client'
import { Col, Row } from 'antd'
import { ButtonCommon } from '../../../infrastructure/common/components/button/button-common'
import { FullPageLoading } from '../../../infrastructure/common/components/controls/loading'
import InputNumberCommon from '../../../infrastructure/common/components/input/input-number'
import { WarningMessage } from '../../../infrastructure/common/components/toast/notificationToast'
import regularPassService from '../../../infrastructure/repositories/regular-pass/service/regular-pass.service'
import { useNavigate } from 'react-router-dom'
import { ROUTE_PATH } from '../../../core/common/appRouter'
import { convertDateOnly } from '../../../infrastructure/helper/helper'
import { isTokenStoraged } from '../../../infrastructure/utils/storage'
import { useRecoilValue } from 'recoil'
import { ProfileState } from '../../../core/atoms/profile/profileState'
import InputDateRegularPassCommon from '../../../infrastructure/common/components/input/input-date-regular-pass'

const RegularPass = () => {
    const [_data, _setData] = useState<any>({});
    const [validate, setValidate] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [submittedTime, setSubmittedTime] = useState<any>();

    const profileState = useRecoilValue(ProfileState)
    const navigate = useNavigate();

    const storage = isTokenStoraged()
    useEffect(() => {
        if (!storage) {
            navigate(ROUTE_PATH.LOGIN);
        }
    }, [])

    const dataPurchase = _data;
    const setDataPurchase = (data: any) => {
        Object.assign(dataPurchase, { ...data });
        _setData({ ...dataPurchase });
    };

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
            if (profileState.regularPass) {
                await regularPassService.renewRegularPass({
                    startDate: convertDateOnly(dataPurchase.startDate),
                    durationInDays: dataPurchase.durationInDays,
                },
                    onBack,
                    setLoading
                )
            }
            else {
                await regularPassService.addRegularPass({
                    startDate: convertDateOnly(dataPurchase.startDate),
                    durationInDays: dataPurchase.durationInDays,
                },
                    onBack,
                    setLoading
                )
            }
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
    }

    return (
        <LayoutClient>
            <div className='main-page h-full  overflow-auto rounded-[8px] bg-white px-4 py-8'>
                <div className='bg-white scroll-auto flex flex-col gap-3'>
                    <div className='text-center text-[20px] font-semibold text-[#475f7b] uppercase'> {profileState.regularPass ? "Gia hạn vé tháng" : "Đăng ký vé tháng mới"} </div>
                    <Row>
                        <Col span={24} className='border-add'>
                            <div className='legend-title'>Thêm thông tin mới</div>
                            <Row gutter={[30, 0]}>

                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputDateRegularPassCommon
                                        label={"Ngày bắt đầu"}
                                        attribute={"startDate"}
                                        isRequired={true}
                                        dataAttribute={dataPurchase.startDate}
                                        setData={setDataPurchase}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
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
                    <div>
                        {profileState.regularPass ?
                            <div>
                                <div className='text-center text-[16px] font-semibold text-[#f45c5c]'>Tài khoản của bạn đã có vé tháng </div>
                                <div className='text-center text-[16px] font-semibold text-[#f45c5c]'>Hãy gia hạn để có thế tiếp tục sử dụng vé tháng </div>
                            </div>
                            :
                            <div>
                                <div className='text-center text-[16px] font-semibold text-[#f45c5c]'>Bạn chưa có vé tháng</div>
                                <div className='text-center text-[16px] font-semibold text-[#f45c5c]'>Hãy đăng ký để có thể sử dụng vé tháng </div>
                            </div>
                        }
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

            </div>
            <FullPageLoading isLoading={loading} />
        </LayoutClient>
    )
}

export default RegularPass