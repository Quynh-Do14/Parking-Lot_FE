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

const ViewRegularPassManagement = () => {
    const [loading, setLoading] = useState<boolean>(false);
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
                // name: reservation.name,
                // address: reservation.address,
                // reentryAllowed: reservation.reentryAllowed,
                // operatingCompanyName: reservation.operatingCompanyName,
                // valetParkingAvailable: reservation.valetParkingAvailable,
            });
        };
    }, [reservation]);

    return (
        <MainLayout breadcrumb={"Quản lý bãi đỗ xe"} title={"Thông tin bãi đỗ xe"} redirect={ROUTE_PATH.PARKING_LOT}>
            <div className='main-page h-full flex-1 overflow-auto bg-white px-4 py-8'>
                <div className='bg-white scroll-auto'>
                    <Row>
                        <Col span={24} className='border-add'>
                            <div className='legend-title'>Chi tiết </div>
                            <Row gutter={[30, 0]}>
                                {/* <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Tên bãi đỗ xe"}
                                        attribute={"name"}
                                        isRequired={true}
                                        dataAttribute={dataReservation.name}
                                        setData={setDataReservation}
                                        disabled={false}
                                        validate={null}
                                        setValidate={() => { }}
                                        submittedTime={null}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Tên công ty"}
                                        attribute={"operatingCompanyName"}
                                        isRequired={true}
                                        dataAttribute={dataReservation.operatingCompanyName}
                                        setData={setDataReservation}
                                        disabled={false}
                                        validate={null}
                                        setValidate={() => { }}
                                        submittedTime={null}
                                    />
                                </Col> */}
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

export default ViewRegularPassManagement