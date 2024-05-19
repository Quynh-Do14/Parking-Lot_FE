import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd';
import { ROUTE_PATH } from '../../../core/common/appRouter';
import InputTextCommon from '../../../infrastructure/common/components/input/input-text';
import { ButtonCommon } from '../../../infrastructure/common/components/button/button-common';
import { FullPageLoading } from '../../../infrastructure/common/components/controls/loading';

import MainLayout from '../../../infrastructure/common/layout/MainLayout';
import Constants from '../../../core/common/constants';
import parkingLotService from '../../../infrastructure/repositories/parking-lot/service/parking-lot.service';
import InputTextArrayCommon from '../../../infrastructure/common/components/input/input-array/input-text';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import InputNumberArrayCommon from '../../../infrastructure/common/components/input/input-array/input-number';
import { Province } from '../../../infrastructure/utils/data';
import { useNavigate, useParams } from 'react-router-dom';

const ViewParkingReservationManagement = () => {
    const [validate, setValidate] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [submittedTime, setSubmittedTime] = useState<any>();
    const [reservation, setReservation] = useState<any>({});
    const [dataReservation, setDataReservation] = useState<any>({});

    const param = useParams();
    const navigate = useNavigate();

    const onBack = () => {
        navigate(ROUTE_PATH.PARKING_RESERVATION)
    };
    const onGetListParkingLotAdminByIdAsync = async () => {
        try {
            await parkingLotService.getParkingLotReservationsAdminById(
                Number(param.id),
                setLoading
            ).then((res) => {
                setReservation(res)
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        onGetListParkingLotAdminByIdAsync().then(() => { })
    }, [])

    useEffect(() => {
        if (reservation) {
            setDataReservation({
                name: reservation?.customer?.user?.name,
                parkingLotName: reservation?.parkingSlot?.block?.parkingLot?.name,
                contactNumber: reservation?.customer?.contactNumber,
                block: reservation?.parkingSlot?.block?.blockCode,

                operatingCompanyName: reservation?.parkingSlot?.block?.parkingLot?.operatingCompanyName,
                startDate: reservation?.customer?.user?.name,
                vehicleNumber: reservation?.customer?.vehicleNumber,
                durationInMinutes: reservation?.durationInMinutes,
            });
        };
    }, [reservation]);

    return (
        <MainLayout breadcrumb={"Quản lý đặt chỗ"} title={"Thông tin đặt chỗ"} redirect={ROUTE_PATH.PARKING_LOT}>
            <div className='main-page h-full flex-1 overflow-auto bg-white px-4 py-8'>
                <div className='bg-white scroll-auto'>
                    <Row>
                        <Col span={24} className='border-add'>
                            <div className='legend-title'>Chi tiết </div>
                            <Row gutter={[30, 0]}>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Tên khách hàng"}
                                        attribute={"name"}
                                        isRequired={true}
                                        dataAttribute={dataReservation.name}
                                        setData={setDataReservation}
                                        disabled={true}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"SĐT khách hàng"}
                                        attribute={"contactNumber"}
                                        isRequired={true}
                                        dataAttribute={dataReservation.contactNumber}
                                        setData={setDataReservation}
                                        disabled={true}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Tên bãi đỗ"}
                                        attribute={"parkingLotName"}
                                        isRequired={true}
                                        dataAttribute={dataReservation.parkingLotName}
                                        setData={setDataReservation}
                                        disabled={true}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Tên khu"}
                                        attribute={"block"}
                                        isRequired={true}
                                        dataAttribute={dataReservation.block}
                                        setData={setDataReservation}
                                        disabled={true}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Cty chủ khoản"}
                                        attribute={"operatingCompanyName"}
                                        isRequired={true}
                                        dataAttribute={dataReservation.operatingCompanyName}
                                        setData={setDataReservation}
                                        disabled={true}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Ngày bắt đầu"}
                                        attribute={"startDate"}
                                        isRequired={true}
                                        dataAttribute={dataReservation.startDate}
                                        setData={setDataReservation}
                                        disabled={true}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Biển số xe"}
                                        attribute={"vehicleNumber"}
                                        isRequired={true}
                                        dataAttribute={dataReservation.vehicleNumber}
                                        setData={setDataReservation}
                                        disabled={true}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Thời gian đỗ"}
                                        attribute={"durationInMinutes"}
                                        isRequired={true}
                                        dataAttribute={dataReservation.durationInMinutes}
                                        setData={setDataReservation}
                                        disabled={true}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className='container-btn main-page bg-white p-4 flex flex-col'>
                <Row justify={"center"}>
                    <Col className='mx-1'>
                        <ButtonCommon
                            onClick={onBack}
                            classColor="blue"
                            icon={null}
                            title={'Quay lại'}
                        />
                    </Col>
                </Row>
            </div >
            <FullPageLoading isLoading={loading} />
        </MainLayout >
    )
}

export default ViewParkingReservationManagement