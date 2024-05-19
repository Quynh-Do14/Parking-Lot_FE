import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd';
import { ROUTE_PATH } from '../../../core/common/appRouter';
import InputTextCommon from '../../../infrastructure/common/components/input/input-text';
import { ButtonCommon } from '../../../infrastructure/common/components/button/button-common';
import { FullPageLoading } from '../../../infrastructure/common/components/controls/loading';
import { useNavigate, useParams } from 'react-router-dom';
import { WarningMessage } from '../../../infrastructure/common/components/toast/notificationToast';
import MainLayout from '../../../infrastructure/common/layout/MainLayout';
import UploadAvatar from '../../../infrastructure/common/components/input/upload-image';
import UploadImage from '../../../infrastructure/common/components/input/upload-image';
import customerService from '../../../infrastructure/repositories/customer/service/customer.service';

const ViewCustomerManagement = () => {
    const [validate, setValidate] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [submittedTime, setSubmittedTime] = useState<any>();
    const [imageUrl, setImageUrl] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [detailCustomer, setDetailCustomer] = useState<any>({});
    const [detailInfo, setDetailInfo] = useState<any>({});
    const param = useParams();

    const [_data, _setData] = useState<any>({});
    const dataCustomer = _data;

    const navigate = useNavigate();

    const onBack = () => {
        navigate(ROUTE_PATH.CUSTOMER)
    };
    const setDataCustomer = (data: any) => {
        Object.assign(dataCustomer, { ...data });
        _setData({ ...dataCustomer });
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

    const onGetUserByIdAsync = async () => {
        try {
            await customerService.getCustomerById(
                Number(param.id),
                setLoading
            ).then((res) => {
                setDetailCustomer(res);
                // setDetailInfo(re)
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        onGetUserByIdAsync().then(() => { })
    }, [])
    useEffect(() => {
        if (detailCustomer) {
            setDataCustomer({
                avatar: detailCustomer.avatar,
                name: detailCustomer.name,
                email: detailCustomer.email,
                username: detailCustomer.username,
            });
        }
        if (detailCustomer) {
            setDataCustomer({
                contactNumber: detailCustomer.contactNumber,
                vehicleNumber: detailCustomer.vehicleNumber,
            });
        }
    }, [detailCustomer]);

    const onUpdateCustomer = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await customerService.updateCustomer(
                Number(param.id),
                {
                    name: dataCustomer.name,
                    contactNumber: dataCustomer.contactNumber,
                    vehicleNumber: dataCustomer.vehicleNumber,
                },
                onBack,
                setLoading
            )
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
    };

    return (
        <MainLayout breadcrumb={"Quản lý khách hàng"} title={"Thông tin khách hàng"} redirect={ROUTE_PATH.CUSTOMER}>
            <div className='main-page h-full flex-1 overflow-auto bg-white px-4 py-8'>
                <div className='bg-white scroll-auto'>
                    <Row>
                        <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={5} className='border-add flex justify-center'>
                            <div className='legend-title'>Cập nhật ảnh</div>
                            <UploadImage
                                attributeImg={dataCustomer.avatar}
                                imageUrl={imageUrl}
                                setAvatar={setAvatar}
                                setImageUrl={setImageUrl}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={16} xl={18} xxl={19} className='border-add'>
                            <div className='legend-title'>Cập nhật thông tin</div>
                            <Row gutter={[30, 0]}>

                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Tên đăng nhập"}
                                        attribute={"username"}
                                        isRequired={true}
                                        dataAttribute={dataCustomer.username}
                                        setData={setDataCustomer}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Email"}
                                        attribute={"email"}
                                        isRequired={true}
                                        dataAttribute={dataCustomer.email}
                                        setData={setDataCustomer}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Tên khách hàng"}
                                        attribute={"name"}
                                        isRequired={true}
                                        dataAttribute={dataCustomer.name}
                                        setData={setDataCustomer}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Số điện thoại"}
                                        attribute={"contactNumber"}
                                        isRequired={true}
                                        dataAttribute={dataCustomer.contactNumber}
                                        setData={setDataCustomer}
                                        disabled={false}
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
                                        dataAttribute={dataCustomer.vehicleNumber}
                                        setData={setDataCustomer}
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
                    <Col className='mx-1'>
                        <ButtonCommon
                            onClick={onUpdateCustomer}
                            classColor="orange"
                            icon={null}
                            title={'Cập nhật'}
                        />
                    </Col>
                </Row>
            </div >
            <FullPageLoading isLoading={loading} />
        </MainLayout >
    )
}

export default ViewCustomerManagement