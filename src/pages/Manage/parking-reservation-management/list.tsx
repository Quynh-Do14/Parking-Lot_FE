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
import { InputDateSearchCommon } from '../../../infrastructure/common/components/input/input-date-search'
import { ActionEditCommon } from '../../../infrastructure/common/components/action/action-edit-common'

let timeout: any
const ListParkingReservationManagement = () => {
    const [listUser, setListUser] = useState<Array<any>>([])
    const [total, setTotal] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [searchText, setSearchText] = useState<string>("");
    const [dateStr, setDateStr] = useState<string>("");

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onGetListParkingLotAdminAsync = async ({ name = "", size = pageSize, page = currentPage, dateStr = "" }) => {
        const param = {
            page: page - 1,
            size: size,
            dateStr: dateStr,
        }
        try {
            await parkingLotService.getParkingLotReservationsAdmin(
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
    const onSearch = async (name = "", size = pageSize, page = 1, dateStr = "") => {
        await onGetListParkingLotAdminAsync({ name: name, size: size, page: page, dateStr: dateStr });
    };

    // const onChangeSearchText = (e: any) => {
    //     setSearchText(e.target.value);
    //     clearTimeout(timeout);
    //     timeout = setTimeout(() => {
    //         onSearch(e.target.value, pageSize, currentPage, dateStr, endDate).then((_) => { });
    //     }, Constants.DEBOUNCE_SEARCH);
    // };
    const onChangeDate = (date: any, dateString: any) => {
        setDateStr(date)
        onSearch("", pageSize, currentPage, dateString).then((_) => { });
    }
    useEffect(() => {
        onSearch().then(_ => { });
    }, [])
    const onChangePage = async (value: any) => {
        setCurrentPage(value)
        await onSearch(searchText, pageSize, value, dateStr).then(_ => { });
    }
    const onPageSizeChanged = async (value: any) => {
        setPageSize(value)
        setCurrentPage(1)
        await onSearch(searchText, value, 1, dateStr).then(_ => { });
    }

    const onNavigate = (id: any) => {
        navigate(`${(ROUTE_PATH.VIEW_PARKING_RESERVATION).replace(`${Constants.UseParams.Id}`, "")}${id}`);
    }
    return (
        <MainLayout breadcrumb={"Quản lý đặt bãi"} title={"Danh sách đặt bãi"} redirect={""}>
            <div className='flex flex-col header-page'>
                <Row className='filter-page mb-2 py-2-5' gutter={[10, 10]} justify={"space-between"} align={"middle"}>
                    <Col xs={24} sm={24} lg={16}>
                        <Row align={"middle"} gutter={[10, 10]}>
                            <Col xs={24} sm={12} lg={12}>
                                <InputDateSearchCommon
                                    placeholder="Chọn thời gian đặt chỗ ..."
                                    value={dateStr}
                                    onChange={onChangeDate}
                                    disabled={false}
                                />
                            </Col>
                        </Row>

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
                                title="Khách hàng"
                                width={'150px'}
                            />
                        }
                        key={"customer"}
                        dataIndex={"customer"}
                        render={(val) => {
                            return (
                                <div>{val?.user.name} </div>
                            )
                        }}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Tên bãi đỗ"
                                width={'200px'}
                            />
                        }
                        key={"parkingSlot"}
                        dataIndex={"parkingSlot"}
                        render={(val) => {
                            return (
                                <div>{val?.block?.parkingLot?.name} </div>
                            )
                        }}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Tên khu"
                                width={'200px'}
                            />
                        }
                        key={"parkingSlot"}
                        dataIndex={"parkingSlot"}
                        render={(val) => {
                            return (
                                <div>{val?.block?.blockCode} </div>
                            )
                        }}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Ngày dặt chỗ"
                                width={'150px'}
                            />
                        }
                        key={"bookingDate"}
                        dataIndex={"bookingDate"}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Biển số xe"
                                width={'200px'}
                            />
                        }
                        key={"customer"}
                        dataIndex={"customer"}
                        render={(val) => {
                            return (
                                <div>{val.vehicleNumber} </div>
                            )
                        }}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Thời gian đỗ"
                                width={'160px'}
                            />
                        }
                        key={"durationInMinutes"}
                        dataIndex={"durationInMinutes"}
                        render={(value) => {
                            return (
                                <div>{value} phút </div>
                            )
                        }}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="SĐT khách hàng"
                                width={'120px'}
                            />
                        }
                        key={"customer"}
                        dataIndex={"customer"}
                        render={(val) => {
                            return (
                                <div>{val.contactNumber} </div>
                            )
                        }}
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
                            <ActionEditCommon
                                onClickDetail={() => onNavigate(record.id)}
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
            <FullPageLoading isLoading={loading} />
        </MainLayout >
    )
}

export default ListParkingReservationManagement