import { Col, Modal, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import InputTextCommon from '../input/input-text';
import { ButtonCommon } from '../button/button-common';
import { useRecoilValue } from 'recoil';
import { ProfileState } from '../../../../core/atoms/profile/profileState';
import { WarningOutlined } from '@ant-design/icons';
type Props = {
    message: string,
    handleOk: Function,
    handleCancel: Function,
    visible: boolean,
    isLoading?: boolean,
    dataProfile: any
    setDataProfile: Function,
    validate: any,
    setValidate: Function,
    submittedTime: any,
}
const ModalInforReservation = (props: Props) => {
    const {
        message,
        handleOk,
        handleCancel,
        visible,
        isLoading,
        dataProfile,
        setDataProfile,
        validate,
        setValidate,
        submittedTime
    } = props;
    const profileState = useRecoilValue(ProfileState);
    return (
        <Modal
            key={"f-0"}
            centered
            visible={visible}
            closable={false}
            footer={false}
            onCancel={() => handleCancel()}
            width={"70%"}
        >
            <div className='main-page h-full flex-1 overflow-auto bg-white px-4 py-8'>
                <div className='bg-white scroll-auto flex flex-col gap-8'>
                    <div>
                        {
                            profileState.regularPass?.statusNow
                                ?
                                <div>
                                    <div className='text-center text-[18px] text-[#f75252] font-semibold'>Bạn đã có vé tháng</div>
                                    <div className='text-center text-[18px] text-[#f75252] font-semibold'>Bạn sẽ không phải thanh toán cho lần đặt vé này</div>
                                </div>
                                :
                                !profileState.regularPass?.statusNow && profileState.regularPass?.renewPair
                                    ?
                                    < div >
                                        <div className='text-center text-[18px] text-[#f75252] font-semibold'><WarningOutlined /> Bạn đã đăng kí vé tháng.</div>
                                        <div className='text-center text-[18px] text-[#f75252] font-semibold'> Nhưng thẻ của bạn chưa có hiệu lực bây giờ</div>
                                        <div className='text-center text-[18px] text-[#f75252] font-semibold'>Bạn sẽ phải thanh toán qua VNPAY </div>
                                    </div>
                                    :
                                    < div>
                                        <div className='text-center text-[18px] text-[#f75252] font-semibold'><WarningOutlined /> Bạn chưa đăng kí vé tháng</div>
                                        <div className='text-center text-[18px] text-[#f75252] font-semibold'>Bạn sẽ phải thanh toán qua VNPAY </div>
                                    </div>

                        }
                    </div>
                    <div className='text-[18px] text-[#475f7b] font-semibold'>{message} </div>
                    <Row>
                        <Col span={24} className='border-add'>
                            <div className='legend-title'>Điền thông tin</div>
                            <Row gutter={[30, 0]}>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Tên khách hàng"}
                                        attribute={"confirmName"}
                                        isRequired={true}
                                        dataAttribute={dataProfile.confirmName}
                                        setData={setDataProfile}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Số điện thoại"}
                                        attribute={"phoneNumber"}
                                        isRequired={true}
                                        dataAttribute={dataProfile.phoneNumber}
                                        setData={setDataProfile}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Biển số xe"}
                                        attribute={"confirmVehicleNumber"}
                                        isRequired={true}
                                        dataAttribute={dataProfile.confirmVehicleNumber}
                                        setData={setDataProfile}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                            </Row>
                        </Col >
                    </Row >
                    <div className='container-btn main-page bg-white p-4 flex flex-col'>
                        <Row justify={"center"}>
                            <Col className='mx-1'>
                                <ButtonCommon
                                    onClick={handleCancel}
                                    classColor="blue"
                                    icon={null}
                                    title={'Quay lại'}
                                />
                            </Col>
                            <Col className='mx-1'>
                                <ButtonCommon
                                    onClick={handleOk}
                                    classColor="orange"
                                    icon={null}
                                    title={'Thanh toán'}
                                />
                            </Col>
                        </Row>
                    </div >
                </div>
            </div >

        </Modal >
    )
}

export default ModalInforReservation