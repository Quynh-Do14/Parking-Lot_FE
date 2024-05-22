import { Button, Col, DatePicker, InputNumber, Row } from 'antd';
import { useEffect, useState } from 'react'
import carIcon from "../../../assets/images/car.png"
import noCarIcon from "../../../assets/images/no-car.png"
import parkingLotService from '../../../infrastructure/repositories/parking-lot/service/parking-lot.service';
import { useNavigate, useParams } from 'react-router-dom';
import { FullPageLoading } from '../../../infrastructure/common/components/controls/loading';
import LayoutClient from '../../../infrastructure/common/layout/Layout-Client';
import { AllowConfig } from '../../../infrastructure/common/components/controls/reentryAllowConfig';
import { AvailableConfig } from '../../../infrastructure/common/components/controls/valetParkingAvailableConfig';
import { ROUTE_PATH } from '../../../core/common/appRouter';
import Constants from '../../../core/common/constants';
import moment from 'moment';
import { ButtonCommon } from '../../../infrastructure/common/components/button/button-common';
import { convertDate, convertDateBooking, convertDateShow } from '../../../infrastructure/helper/helper';
import DialogConfirmCommon from '../../../infrastructure/common/components/modal/dialogConfirm';
import ModalInforReservation from '../../../infrastructure/common/components/modal/modalInforReservation';
import { useRecoilValue } from 'recoil';
import { ProfileState } from '../../../core/atoms/profile/profileState';
import { WarningMessage } from '../../../infrastructure/common/components/toast/notificationToast';
import { isTokenStoraged } from '../../../infrastructure/utils/storage';
const DetailParkingPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [detailParking, setDetailParking] = useState<any>({});
    const [suggestions, setSuggestions] = useState<Array<any>>([]);
    const [startDate, setStartDate] = useState<string>("");
    const [duration, setDuration] = useState<number>(0);
    const [dataAvailable, setDataAvailabel] = useState<Array<any>>([])
    const [idSelected, setIdSelected] = useState<number>(0);
    const [isReverationModal, setIsReverationModal] = useState<boolean>(false);

    const [_data, _setData] = useState<any>({});
    const [submittedTime, setSubmittedTime] = useState<any>();
    const [validate, setValidate] = useState<any>({});
    const navigate = useNavigate();

    const storage = isTokenStoraged()
    useEffect(() => {
        if (!storage) {
            navigate(ROUTE_PATH.LOGIN);
        }
    }, [])

    const dataProfile = _data;

    const setDataProfile = (data: any) => {
        Object.assign(dataProfile, { ...data });
        _setData({ ...dataProfile });
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
    const dataProfileState = useRecoilValue(ProfileState);

    useEffect(() => {
        if (dataProfileState) {
            setDataProfile({
                confirmName: dataProfileState.user.name,
                phoneNumber: dataProfileState.contactNumber,
                confirmVehicleNumber: dataProfileState.vehicleNumber,
            });
        }
    }, [dataProfileState]);


    const disabledDate = (current: any) => {
        return current && current < moment().startOf('day');
    };
    // const disabledDateTime = () => {
    //     const current = moment();
    //     const disableHours: any[] = [];
    //     const disableMinutes: any[] = [];

    //     for (let i = 0; i < current.hour(); i++) {
    //         disableHours.push(i);
    //     }

    //     if (current.isSame(moment(), 'hour')) {
    //         for (let i = 0; i < current.minute(); i++) {
    //             disableMinutes.push(i);
    //         }
    //     }
    //     return {
    //         disabledHours: () => disableHours,
    //         disabledMinutes: () => disableMinutes,
    //     };
    // };

    const onChangeDate = (date: any,) => {
        setStartDate(date)
    }

    const onChangeDuration = (value: any) => {
        setDuration(value)
    }

    const param = useParams();

    const onGetParkingByIdAsync = async () => {
        try {
            await parkingLotService.getParkingLotById(
                Number(param.id),
                setLoading
            ).then((res) => {
                setDetailParking(res.parkingLot)
                setSuggestions(res.suggestions)
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        onGetParkingByIdAsync().then(() => { })
    }, [])

    const onGetParkingReservationsByIdAsync = async () => {
        const params = {
            id: param.id,
            startTimestamp: convertDate(startDate),
            durationInMinutes: duration,
        }
        try {
            await parkingLotService.getParkingLotReservations(
                params,
                setLoading
            ).then((res) => {
                setDataAvailabel(res)
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    const onReservationsAsync = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            const data = {
                parkingSlot: {
                    id: idSelected
                },
                startTimestamp: convertDateBooking(startDate),
                durationInMinutes: duration,
                confirmName: dataProfile.confirmName,
                phoneNumber: dataProfile.phoneNumber,
                confirmVehicleNumber: dataProfile.confirmVehicleNumber,
            }
            try {
                await parkingLotService.addParkingLotReservations(
                    data,
                    () => {
                        onCloseModalReveration();
                        onGetParkingReservationsByIdAsync();
                    },
                    setLoading
                ).then((response) => {
                    if (!dataProfileState.regularPass?.statusNow || dataProfileState.regularPass == null) {
                        window.open(response.vnpayUrl, '_blank');
                    }
                    setDataAvailabel(response)
                })
            }
            catch (error) {
                console.error(error)
            }
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
    }

    const onOpenModalReveration = (id: number) => {
        setIsReverationModal(true);
        setIdSelected(id)
    };

    const onCloseModalReveration = () => {
        setIsReverationModal(false);
    };
    const viewStarEvaluate = (slot: number) => {
        const stars = [];
        for (let i = 0; i < slot; i++) {
            stars.push(
                <Col
                    xl={4} lg={6} md={8} sm={12} xs={24}
                    key={i}
                >
                    <div
                        className='cursor-pointer bg-[#1C3E66] 
                        border-2 border-[#c4c4c4] p-4 transition
                        duration-300 hover:bg-[#818181] w-full'>

                        <div className='flex items-center justify-center gap-1'>
                            <img src={carIcon} />
                            <div className='font-semibold text-[16px] text-[#FFF]'>- {i + 1} </div>
                        </div>
                    </div>
                </Col>
            );
        }
        return stars
    }
    useEffect(() => {
        if (dataAvailable && dataAvailable.length) {
            dataAvailable.sort((a, b) => {
                return Number(a.block.id) - Number(b.block.id)
            })
        }
    }, [dataAvailable])

    return (
        <LayoutClient>
            <div className='flex flex-col gap-4'>
                <p className='font-semibold text-[20px] uppercase text-[#FFF] mb-3 text-center'>{detailParking.name} - {detailParking.address}</p>
                <div className='bg-[#fffffff3] border-2 p-6 rounded-[8px]'>
                    <Row gutter={[20, 20]} align={"bottom"}>
                        <Col span={10}>
                            <div className='input-common'>
                                <div className='title mb-2'>
                                    <span className='label'>Chọn ngày đặt </span>
                                </div>
                                <DatePicker
                                    allowClear={false}
                                    size="middle"
                                    className='w-full input-date-common'
                                    value={startDate}
                                    placeholder={`Chọn ngày đặt chỗ`}
                                    onChange={onChangeDate}
                                    disabledDate={disabledDate}
                                    // showTime={{ disabledTime: disabledDateTime }}
                                    format={"DD/MM/YYYY hh:mm:ss A"}
                                    showTime={{
                                        format: 'hh:mm:ss A', // Định dạng 12 giờ cho TimePicker
                                        use12Hours: true, // Đảm bảo rằng TimePicker sử dụng định dạng 12 giờ
                                    }}
                                />
                            </div>
                        </Col>
                        <Col span={10}>
                            <div className='input-common'>
                                <div className='title mb-2'>
                                    <span className='label'>Chọn thời gian đỗ xe (phút)</span>
                                </div>
                                <InputNumber
                                    min={0}
                                    className={`w-full`}
                                    value={duration}
                                    onChange={onChangeDuration}
                                    placeholder={`Nhập thời gian đỗ xe`}
                                />
                            </div>
                        </Col>
                        <Col span={4}>
                            <ButtonCommon
                                classColor="orange"
                                onClick={onGetParkingReservationsByIdAsync}
                                title={"Tìm kiếm"} />
                        </Col>
                    </Row>

                </div>
                {
                    startDate && duration
                        ?
                        dataAvailable && dataAvailable.length
                            ?
                            dataAvailable && dataAvailable.map((it, index) => {
                                return (
                                    <div key={index} className='bg-[#fffffff3] border-2 p-6 rounded-[8px]'>
                                        <p className='font-semibold text-[20px] text-[#1e1e1e] mb-3'>{it.block.blockCode} - {it.block.numberOfParkingSlots} chỗ</p>

                                        <div className='flex justify-center'>
                                            <Row gutter={[5, 5]} justify={'start'} className='w-full'>
                                                {/* {viewStarEvaluate(it.block.numberOfParkingSlots)} */}
                                                {
                                                    it?.availableParkingSlots?.map((item: any, indexX: number) => {
                                                        return (
                                                            <Col
                                                                xl={4} lg={6} md={8} sm={12} xs={24}
                                                                key={indexX}
                                                            >
                                                                {
                                                                    item.slotAvailable
                                                                        ?
                                                                        <div
                                                                            className='cursor-pointer bg-[#1C3E66] border-2 border-[#c4c4c4] py-4 transition duration-300 hover:bg-[#818181] w-full'
                                                                            onClick={() => onOpenModalReveration(item.id)}
                                                                        >
                                                                            <div className='flex items-center justify-center gap-1 flex-nowrap'>
                                                                                <img src={noCarIcon} />
                                                                                <div className='font-semibold text-[16px] text-[#FFF]'>- {item.slotNumber} </div>
                                                                                <div className='font-semibold text-[16px] text-[#FFF]'>- Đặt chỗ </div>
                                                                            </div>
                                                                        </div>

                                                                        :
                                                                        <div
                                                                            className='cursor-not-allowed bg-[#6f6c6c] border-2 border-[#c4c4c4] py-4 w-full'>
                                                                            <div className='flex items-center justify-center gap-1 flex-nowrap'>
                                                                                <img src={carIcon} />
                                                                                <div className='font-semibold text-[16px] text-[#FFF]'>- {item.slotNumber} </div>
                                                                            </div>
                                                                        </div>

                                                                }

                                                            </Col>
                                                        )
                                                    })
                                                }

                                            </Row>
                                        </div>
                                    </div>
                                )
                            })
                            :
                            <div className='bg-[#fffffff3] border-2 p-6 rounded-[8px]'>
                                <p className='font-semibold text-[16px] text-[#1C3E66] my-3 text-center'>Không có bãi gửi xe nào khả dụng</p>
                            </div>
                        :
                        <div className='bg-[#fffffff3] border-2 p-6 rounded-[8px]'>
                            <p className='font-semibold text-[16px] text-[#1C3E66] my-3 text-center'>Vui lòng nhập ngày đặt chỗ vào thời gian đỗ xe (phút) </p>
                        </div>
                }


                <div className='bg-[#fffffff3] border-2 p-6 rounded-[8px]'>
                    {
                        suggestions.length
                            ?
                            <div>
                                <p className='font-semibold text-[16px] text-[#1C3E66] my-3'>Bãi xe liên quan</p>
                                <Row gutter={[10, 10]}>
                                    {suggestions.length && suggestions.map((it: any, index: number) => {
                                        return (
                                            <Col
                                                lg={8} md={12} sm={12} xs={24}
                                                key={index}
                                            >
                                                <div className='text-[#FFF] bg-[#1c3e66e0] rounded-[8px] border-2 border-[#c4c4c4] p-4'>
                                                    <div className='mb-4'>
                                                        <div className='mb-1'>Tên bãi:</div>
                                                        <div className='text-[16px]'>{it.name} </div>
                                                    </div>
                                                    <div className='mb-4'>
                                                        <div className='mb-1'>Công ty chủ khoản:</div>
                                                        <div className='text-[16px]'>{it.operatingCompanyName} </div>
                                                    </div>
                                                    <div className='flex justify-between items-start'>
                                                        <div className='mb-4'>
                                                            <div className='mb-1'>Địa chỉ:</div>
                                                            <div className='text-[16px]'>{it.address} </div>
                                                        </div>
                                                        <div className='mb-4'>
                                                            <div className='mb-1'>Số lượng:</div>
                                                            <div className='text-[16px]'>{it.numberOfBlocks} Khu </div>
                                                        </div>
                                                    </div>
                                                    <div className='flex justify-between items-center'>
                                                        <div>
                                                            <div className='mb-1'>Cho phép quay lại:</div>
                                                            <div>
                                                                <AllowConfig reentryAllowed={it.reentryAllowed} />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className='title mb-1 text-right'>Đặt vé trước:</div>
                                                            <div>
                                                                <AvailableConfig value={it.valetParkingAvailable} />
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <a
                                                        href={`${(ROUTE_PATH.VIEW_PARKING_LOT_CLIENT).replace(`${Constants.UseParams.Id}`, "")}${it.id}`}>
                                                        <div
                                                            className='cursor-pointer mt-2
                                                            bg-[#fe7524] p-2 rounded-[8px] 
                                                            text-center text-[16px] transition 
                                                            duration-300 hover:bg-[#8bc0f4]'>
                                                            Đặt chỗ
                                                        </div>
                                                    </a>
                                                </div>
                                            </Col>
                                        )
                                    })}
                                </Row>
                            </div>
                            :
                            <p className='font-semibold text-[16px] text-[#1C3E66] my-3 text-center'>Chưa có bãi xe liên quan</p>
                    }
                </div>
            </div>
            <ModalInforReservation
                message={`Bạn có muốn đặt chỗ này vào ngày ${convertDateShow(startDate)} với khoảng thời gian ${duration} phút`}
                handleOk={onReservationsAsync}
                handleCancel={onCloseModalReveration}
                visible={isReverationModal}
                isLoading={loading}
                dataProfile={dataProfile}
                setDataProfile={setDataProfile}
                validate={validate}
                setValidate={setValidate}
                submittedTime={submittedTime}
            />
            <FullPageLoading isLoading={loading} />
        </LayoutClient>
    )
}

export default DetailParkingPage