import { Col, Modal, Row } from 'antd';
import React, { useEffect, useState } from 'react'
import parkingLotService from '../../../repositories/parking-lot/service/parking-lot.service';
import { FullPageLoading } from '../controls/loading';
import { convertDateShow, formatCurrencyVND } from '../../../helper/helper';
import { PaginationCommon } from '../../pagination/Pagination';
import { ButtonCommon } from '../button/button-common';
import DialogConfirmCommon from './dialogConfirm';
import Constants from '../../../../core/common/constants';
type Props = {
    handleCancel: Function,
    visible: boolean,
    isLoading?: boolean,
}
const ModalHistory = (props: Props) => {
    const { handleCancel, visible, isLoading = false } = props;

    const [historyShow, setHistoryShow] = useState<Array<any>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [total, setTotal] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(Constants.PaginationClientConfigs.Size);
    const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
    const [idSelected, setIdSelected] = useState(null);

    const onGetHistoryShowAsync = async ({ size = pageSize, page = 1 }) => {
        const param = {
            page: page - 1,
            size: size,
        }
        try {
            await parkingLotService.getParkingLotReservationsShow(
                param,
                setLoading
            ).then((res) => {
                setHistoryShow(res.content)
                setTotal(res.totalElements)
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    const onSearch = async (size = pageSize, page = 1) => {
        await onGetHistoryShowAsync({ size: size, page: page });
    };

    useEffect(() => {
        onSearch().then(() => { })
    }, [])

    const onChangePage = async (value: any) => {
        setCurrentPage(value)
        await onSearch(pageSize, value).then(_ => { });
    }
    const onPageSizeChanged = async (value: any) => {
        setPageSize(value)
        setCurrentPage(1)
        await onSearch(value, 1).then(_ => { });
    }


    const onDeleteParkingLotReversation = async () => {

        try {
            await parkingLotService.deleteParkingLotReservations(
                Number(idSelected),
                () => { },
                setLoading
            ).then((res) => {
                if (res) {
                    setIsDeleteModal(false);
                    onSearch().then(() => { })
                }
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    const onOpenModalDelete = (id: any) => {
        setIsDeleteModal(true);
        setIdSelected(id)
    };

    const onCloseModalDelete = () => {
        setIsDeleteModal(false);
    };

    return (
        <Modal
            key={"f-0"}
            centered
            visible={visible}
            closable={false}
            footer={false}
            onCancel={() => handleCancel()}
            width={"80%"}
        >
            <div className='flex flex-col gap-2'>
                <div className='text-center text-[20px] font-semibold text-[#475f7b] uppercase'>Lịch sử đặt chỗ</div>
                {
                    historyShow.map((it, index) => {
                        const conditionDate = () => {
                            const startTimestamp = new Date(it.startTimestamp);
                            const now = new Date()
                            if (startTimestamp > now) {
                                return true
                            }
                            else {
                                return false
                            }
                        }
                        return (
                            <Row gutter={[10, 0]} key={index} className='text-[#2a2a2a] bg-[#1c3e66e0] rounded-[8px] border-2 border-[#c4c4c4] p-4'>
                                <Col xs={24} sm={24} md={10} className='flex flex-col gap-2 bg-[#ffffff] border-2 border-[#c4c4c4] '>
                                    <div className='p-3'>
                                        <div className='text-[18px] font-semibold'>Thông tin bãi đỗ</div>
                                        <div>Tên bãi: {it.parkingSlot.block.parkingLot.name} - {it.parkingSlot.block.parkingLot.address} </div>
                                        <div>Khu: {it.parkingSlot.block.blockCode} - {it.parkingSlot.slotNumber} </div>
                                        <div>Giá vé: {formatCurrencyVND(String(it.cost))}</div>
                                        <div>Ngày đặt: {convertDateShow(it.bookingDate)} </div>

                                    </div>
                                </Col>
                                <Col xs={24} sm={24} md={10} className='flex flex-col gap-2 bg-[#ffffff] border-2 border-[#c4c4c4] '>
                                    <div className='p-3'>
                                        <div className='text-[18px] font-semibold'>Thông tin khách hàng</div>
                                        <div>Tên khách hàng: {it.confirmName} </div>
                                        <div>SĐT: {it.phoneNumber} </div>
                                        <div>Biển kiểm soát: {it.confirmVehicleNumber} </div>
                                        <div>Ngày bắt đầu: {convertDateShow(it.startTimestamp)} </div>
                                    </div>
                                </Col>
                                <Col xs={24} sm={24} md={4} className='flex flex-col justify-center items-center gap-2 bg-[#ffffff] border-2 border-[#c4c4c4] p-2'>
                                    {
                                        conditionDate()
                                        &&
                                        <div
                                            onClick={() => onOpenModalDelete(it.id)}
                                            className='text-[16px] text-center cursor-pointer font-semibold hover:text-[#fe7524] hover:underline '
                                        >
                                            Hủy đặt chỗ
                                        </div>
                                    }

                                </Col>
                            </Row>
                        )
                    })
                }
            </div>
            <div className='flex flex-col'>
                <PaginationCommon
                    total={total}
                    currentPage={currentPage}
                    onChangePage={onChangePage}
                    pageSize={pageSize}
                    onChangeSize={onPageSizeChanged}
                    disabled={false}
                    isClient={true}
                />
            </div>
            <DialogConfirmCommon
                message={"Bạn có muốn hủy đặt chỗ này"}
                titleCancel={"Bỏ qua"}
                titleOk={"Hủy đặt chỗ"}
                visible={isDeleteModal}
                handleCancel={onCloseModalDelete}
                handleOk={onDeleteParkingLotReversation}
                title={"Xác nhận"}
            />
            <FullPageLoading isLoading={loading} />
        </Modal>
    )
}

export default ModalHistory