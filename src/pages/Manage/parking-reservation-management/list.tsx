import React, { useEffect, useState } from 'react'
import { Col, Row, Table } from 'antd'

import Column from 'antd/es/table/Column'
import { PlusOutlined } from '@ant-design/icons'
import { FullPageLoading } from '../../../infrastructure/common/components/controls/loading'
import { ROUTE_PATH } from '../../../core/common/appRouter'
import { useNavigate } from 'react-router-dom';
import DialogConfirmCommon from '../../../infrastructure/common/components/modal/dialogConfirm'
import Constants from '../../../core/common/constants'
import MainLayout from '../../../infrastructure/common/layout/MainLayout'
import { InputSearchCommon } from '../../../infrastructure/common/components/input/input-search-common'
import { ButtonCommon } from '../../../infrastructure/common/components/button/button-common'
import { TitleTableCommon } from '../../../infrastructure/common/components/text/title-table-common'
import { PaginationCommon } from '../../../infrastructure/common/pagination/Pagination'
import { ActionCommon } from '../../../infrastructure/common/components/action/action-common'
import parkingLotService from '../../../infrastructure/repositories/parking-lot/service/parking-lot.service'
import { AllowConfig } from '../../../infrastructure/common/components/controls/reentryAllowConfig'
import { AvailableConfig } from '../../../infrastructure/common/components/controls/valetParkingAvailableConfig'

let timeout: any
const ListParkingLotManagement = () => {
    const [listUser, setListUser] = useState<Array<any>>([])
    const [total, setTotal] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [searchText, setSearchText] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [idSelected, setIdSelected] = useState(null);
    const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);


    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onGetListParkingLotAsync = async ({ name = "", size = pageSize, page = currentPage, startDate = "", endDate = "" }) => {
        const param = {
            page: page - 1,
            size: size,
            keyword: name,
            // startDate: startDate,
            // endDate: endDate,
        }
        try {
            await parkingLotService.getParkingLot(
                param,
                setLoading
            ).then((res) => {
                setListUser(res.content)
                setTotal(res.totalElements)
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    const onSearch = async (name = "", size = pageSize, page = 1, startDate = "", endDate = "") => {
        await onGetListParkingLotAsync({ name: name, size: size, page: page, startDate: startDate, endDate: endDate });
    };

    const onChangeSearchText = (e: any) => {
        setSearchText(e.target.value);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            onSearch(e.target.value, pageSize, currentPage, startDate, endDate).then((_) => { });
        }, Constants.DEBOUNCE_SEARCH);
    };

    useEffect(() => {
        onSearch().then(_ => { });
    }, [])
    const onChangePage = async (value: any) => {
        setCurrentPage(value)
        await onSearch(searchText, pageSize, value, startDate, endDate).then(_ => { });
    }
    const onPageSizeChanged = async (value: any) => {
        setPageSize(value)
        setCurrentPage(1)
        await onSearch(searchText, value, 1, startDate, endDate).then(_ => { });
    }

    const onOpenModalDelete = (id: any) => {
        setIsDeleteModal(true);
        setIdSelected(id)
    };

    const onCloseModalDelete = () => {
        setIsDeleteModal(false);
    };
    const onDeleteUser = async () => {
        setIsDeleteModal(false);
        try {
            await parkingLotService.deleteParkingLot(
                Number(idSelected),
                setLoading
            ).then((res) => {
                if (res) {
                    onSearch().then(() => { })
                }
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    const onNavigate = (id: any) => {
        navigate(`${(ROUTE_PATH.VIEW_PARKING_LOT).replace(`${Constants.UseParams.Id}`, "")}${id}`);
    }
    return (
        <MainLayout breadcrumb={"Quản lý bãi đỗ xe"} title={"Danh sách bãi đỗ xe"} redirect={""}>
            <div className='flex flex-col header-page'>
                <Row className='filter-page mb-2 py-2-5' gutter={[10, 10]} justify={"space-between"} align={"middle"}>
                    <Col xs={24} sm={24} lg={16}>
                        <Row align={"middle"} gutter={[10, 10]}>
                            <Col xs={24} sm={12} lg={12}>
                                <InputSearchCommon
                                    placeholder="Tìm kiếm theo tỉnh thành..."
                                    value={searchText}
                                    onChange={onChangeSearchText}
                                    disabled={false}
                                />
                            </Col>
                        </Row>

                    </Col>
                    <Col>
                        <ButtonCommon
                            icon={<PlusOutlined />}
                            classColor="orange"
                            onClick={() => navigate(ROUTE_PATH.ADD_PARKING_LOT)}
                            title={"Thêm mới"} />
                    </Col>
                </Row>
            </div>
            <div className='flex-1 overflow-auto bg-[#FFFFFF] content-page'>
                <Table
                    dataSource={listUser}
                    pagination={false}
                    className='table-common'
                >
                    <Column
                        title={"STT"}
                        dataIndex="stt"
                        key="stt"
                        width={"5%"}
                        render={(val, record, index) => (
                            <div style={{ textAlign: "center" }}>
                                {index + 1 + pageSize * (currentPage - 1)}
                            </div>
                        )}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Tên"
                                width={'150px'}
                            />
                        }
                        key={"name"}
                        dataIndex={"name"}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Địa chỉ"
                                width={'150px'}
                            />
                        }
                        key={"address"}
                        dataIndex={"address"}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Trực thuộc công ty"
                                width={'200px'}
                            />
                        }
                        key={"operatingCompanyName"}
                        dataIndex={"operatingCompanyName"}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Cho phép quay lại"
                                width={'160px'}
                            />
                        }
                        key={"reentryAllowed"}
                        dataIndex={"reentryAllowed"}
                        render={(value) => {
                            return (
                                <AllowConfig reentryAllowed={value} />
                            )
                        }}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Số khu vực"
                                width={'100px'}
                            />
                        }
                        key={"numberOfBlocks"}
                        dataIndex={"numberOfBlocks"}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Bắt buộc đặt chỗ trước"
                                width={'160px'}
                            />
                        }
                        key={"valetParkingAvailable"}
                        dataIndex={"valetParkingAvailable"}
                        render={(value) => {
                            return (
                                <AvailableConfig value={value} />
                            )
                        }}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Chỗ đã sử dụng"
                                width={'120px'}
                            />
                        }
                        key={"usedSlots"}
                        dataIndex={"usedSlots"}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Thao tác"
                                width={"60px"}
                            />
                        }
                        width={"60px"}
                        fixed="right"
                        align='center'
                        render={(action, record: any) => (
                            // <Space
                            //     size="small"
                            // >
                            //     <Dropdown
                            //         trigger={["hover"]}
                            //         placement="bottomRight"
                            //         overlay={listAction(record)}
                            //     >
                            //         <MenuOutlined className="pointer" />
                            //     </Dropdown>
                            // </Space>
                            <ActionCommon
                                onClickDetail={() => onNavigate(record.id)}
                                onClickDelete={() => onOpenModalDelete(record.id)}
                            />
                        )}
                    />
                </Table>
            </div>
            <div className='flex flex-col'>
                <PaginationCommon
                    total={total}
                    currentPage={currentPage}
                    onChangePage={onChangePage}
                    pageSize={pageSize}
                    onChangeSize={onPageSizeChanged}
                    disabled={false}
                />
            </div>
            <DialogConfirmCommon
                message={"Bạn có muốn xóa bãi đỗ xe này ra khỏi hệ thống"}
                titleCancel={"Bỏ qua"}
                titleOk={"Xóa bãi đỗ xe"}
                visible={isDeleteModal}
                handleCancel={onCloseModalDelete}
                handleOk={onDeleteUser}
                title={"Xác nhận"}
            />
            <FullPageLoading isLoading={loading} />
        </MainLayout >
    )
}

export default ListParkingLotManagement