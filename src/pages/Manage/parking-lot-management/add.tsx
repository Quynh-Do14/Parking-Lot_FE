import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd';
import { ROUTE_PATH } from '../../../core/common/appRouter';
import InputTextCommon from '../../../infrastructure/common/components/input/input-text';
import { ButtonCommon } from '../../../infrastructure/common/components/button/button-common';
import { FullPageLoading } from '../../../infrastructure/common/components/controls/loading';
import { useNavigate } from 'react-router-dom';
import { WarningMessage } from '../../../infrastructure/common/components/toast/notificationToast';
import MainLayout from '../../../infrastructure/common/layout/MainLayout';
import InputSelectCommon from '../../../infrastructure/common/components/input/select-common';
import Constants from '../../../core/common/constants';
import parkingLotService from '../../../infrastructure/repositories/parking-lot/service/parking-lot.service';
import { convertStringToBoolean } from '../../../infrastructure/helper/helper';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import InputNumberCommon from '../../../infrastructure/common/components/input/input-number';
import InputTextArrayCommon from '../../../infrastructure/common/components/input/input-array/input-text';
import InputNumberArrayCommon from '../../../infrastructure/common/components/input/input-array/input-number';
import { Province } from '../../../infrastructure/utils/data';

const AddParkingLotManagement = () => {
    const [validate, setValidate] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [submittedTime, setSubmittedTime] = useState<any>();
    const [listBlock, setListBlock] = useState<Array<any>>([
        {
            index: 0,
            blockCode: "",
            numberOfParkingSlots: 0
        },
    ])

    const [_data, _setData] = useState<any>({});
    const dataParking = _data;

    const navigate = useNavigate();

    const onBack = () => {
        navigate(ROUTE_PATH.PARKING_LOT)
    };
    const setDataParking = (data: any) => {
        Object.assign(dataParking, { ...data });
        _setData({ ...dataParking });
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

    const onAddParking = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await parkingLotService.addParkingLot({
                name: dataParking.name,
                address: dataParking.address,
                reentryAllowed: convertStringToBoolean(dataParking.reentryAllowed),
                operatingCompanyName: dataParking.operatingCompanyName,
                valetParkingAvailable: convertStringToBoolean(dataParking.valetParkingAvailable),
                blockAndParkingSlots: convertListBlock()
            },
                onBack,
                setLoading
            )
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
    };
    const onAddBlock = () => {
        setListBlock([
            ...listBlock,
            {
                index: Number(listBlock.length - 1) + 1,
                blockCode: "",
                numberOfParkingSlots: 0
            },
        ])
    }

    const onDeleteOption = (index: number) => {
        const spliceOption = [...listBlock];
        spliceOption.splice(index, 1)
        setListBlock(spliceOption)
    }
    const convertListBlock = () => {
        const arr = listBlock.map((it) => {
            return {
                block: {
                    blockCode: it.blockCode
                },
                numberOfParkingSlots: it.numberOfParkingSlots
            }
        })
        return arr
    }

    return (
        <MainLayout breadcrumb={"Quản lý bãi đỗ xe"} title={"Thêm bãi đỗ xe"} redirect={ROUTE_PATH.PARKING_LOT}>
            <div className='main-page h-full flex-1 overflow-auto bg-white px-4 py-8'>
                <div className='bg-white scroll-auto'>
                    <Row>
                        {/* <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={5} className='border-add flex justify-center'>
                            <div className='legend-title'>Thêm mới ảnh</div>
                            <UploadImage
                                attributeImg={dataParking.avatar}
                                imageUrl={imageUrl}
                                setAvatar={setAvatar}
                                setImageUrl={setImageUrl}
                            />
                        </Col> */}
                        <Col span={24} className='border-add'>
                            <div className='legend-title'>Thêm thông tin mới</div>
                            <Row gutter={[30, 0]}>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Tên bãi đỗ xe"}
                                        attribute={"name"}
                                        isRequired={true}
                                        dataAttribute={dataParking.name}
                                        setData={setDataParking}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Tên công ty"}
                                        attribute={"operatingCompanyName"}
                                        isRequired={true}
                                        dataAttribute={dataParking.operatingCompanyName}
                                        setData={setDataParking}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputSelectCommon
                                        label={"Địa chỉ"}
                                        attribute={"address"}
                                        isRequired={true}
                                        dataAttribute={dataParking.address}
                                        setData={setDataParking}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        listDataOfItem={Province} />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputSelectCommon
                                        label={"Cho phép quay lại"}
                                        attribute={"reentryAllowed"}
                                        isRequired={true}
                                        dataAttribute={dataParking.reentryAllowed}
                                        setData={setDataParking}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        listDataOfItem={Constants.ReentryAllowed.List}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputSelectCommon
                                        label={"Phải đặt chỗ trước"}
                                        attribute={"valetParkingAvailable"}
                                        isRequired={true}
                                        dataAttribute={dataParking.valetParkingAvailable}
                                        setData={setDataParking}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        listDataOfItem={Constants.ValetParkingAvailable.List}
                                    />
                                </Col>
                                <Col span={24}>
                                    <div
                                        className='flex gap-2 items-center cursor-pointer bg-[#e1e1e1] p-2 rounded-[4px]'
                                        onClick={onAddBlock}
                                    >
                                        <div className='text-[#094174] font-semibold text-[15px] '>Thêm khu vực </div>
                                        <PlusCircleOutlined className='text-[20px]' />
                                    </div>
                                    {
                                        listBlock.length ?
                                            listBlock.map((it, index) => {
                                                return (
                                                    <div key={index}>
                                                        <div className='flex gap-2 items-center justify-between'>
                                                            <div
                                                                className='text-[#094174] 
                                                                font-semibold text-[15px] py-2'
                                                            >
                                                                Khu vực {index + 1}
                                                            </div>
                                                            <button
                                                                disabled={Number(index) == 0 ? true : false}
                                                                onClick={() => onDeleteOption(index)}

                                                            >
                                                                <DeleteOutlined
                                                                    className={`${Number(index) == 0 ? "cursor-not-allowed" : "cursor-pointer"} text-[24px]`}
                                                                />
                                                            </button>
                                                        </div>
                                                        <Row gutter={[30, 0]}>
                                                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                                                <InputTextArrayCommon
                                                                    dataAttribute={it.blockCode}
                                                                    label={"Tên khu"}
                                                                    attribute={"blockCode"}
                                                                    isRequired={true}
                                                                    data={listBlock}
                                                                    setData={setListBlock}
                                                                    disabled={false}
                                                                    validate={validate}
                                                                    setValidate={setValidate}
                                                                    submittedTime={submittedTime}
                                                                    index={index}
                                                                />
                                                            </Col>
                                                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                                                <InputNumberArrayCommon
                                                                    dataAttribute={it.numberOfParkingSlots}
                                                                    label={"Số lượng chỗ"}
                                                                    attribute={"numberOfParkingSlots"}
                                                                    isRequired={true}
                                                                    data={listBlock}
                                                                    setData={setListBlock}
                                                                    disabled={false}
                                                                    validate={validate}
                                                                    setValidate={setValidate}
                                                                    submittedTime={submittedTime} index={index}
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </div>

                                                )
                                            })
                                            :
                                            null
                                    }
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
                            onClick={onAddParking}
                            classColor="orange"
                            icon={null}
                            title={'Thêm mới'}
                        />
                    </Col>
                </Row>
            </div >
            <FullPageLoading isLoading={loading} />
        </MainLayout >
    )
}

export default AddParkingLotManagement