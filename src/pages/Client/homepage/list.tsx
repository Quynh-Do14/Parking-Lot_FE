import { Col, Input, Row, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import parkingLotService from '../../../infrastructure/repositories/parking-lot/service/parking-lot.service'
import Constants from '../../../core/common/constants'
import { ROUTE_PATH } from '../../../core/common/appRouter'
import { FullPageLoading } from '../../../infrastructure/common/components/controls/loading'
import { AllowConfig } from '../../../infrastructure/common/components/controls/reentryAllowConfig'
import { AvailableConfig } from '../../../infrastructure/common/components/controls/valetParkingAvailableConfig'
import LayoutClient from '../../../infrastructure/common/layout/Layout-Client'
import { PaginationCommon } from '../../../infrastructure/common/pagination/Pagination'
import { Province } from '../../../infrastructure/utils/data'
import { isTokenStoraged } from '../../../infrastructure/utils/storage'

let timeout: any
const ListParkingPage = () => {
    const [listUser, setListUser] = useState<Array<any>>([])
    const [total, setTotal] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(Constants.PaginationClientConfigs.Size);
    const [searchText, setSearchText] = useState<string>("");
    const [selectAddress, setSelectAddress] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const storage = isTokenStoraged()
    useEffect(() => {
        if (!storage) {
            navigate(ROUTE_PATH.LOGIN);
        }
    }, [])
    const onGetListParkingLotAsync = async ({ name = "", address = "", size = pageSize, page = currentPage, startDate = "", endDate = "" }) => {
        const param = {
            page: page - 1,
            size: size,
            name: name,
            address: address,
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
    const onSearch = async (name = "", address = "", size = pageSize, page = 1, startDate = "", endDate = "") => {
        await onGetListParkingLotAsync({ name: name, address: address, size: size, page: page, startDate: startDate, endDate: endDate });
    };

    const onChangeSearchText = (e: any) => {
        setSearchText(e.target.value);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            onSearch(e.target.value, selectAddress, pageSize, currentPage, startDate, endDate).then((_) => { });
        }, Constants.DEBOUNCE_SEARCH);
    };

    const onChangeSelectAddress = (e: any) => {
        setSelectAddress(e);
        onSearch(searchText, e, pageSize, currentPage, startDate, endDate).then((_) => { });
    };

    useEffect(() => {
        onSearch().then(_ => { });
    }, [])
    const onChangePage = async (value: any) => {
        setCurrentPage(value)
        await onSearch(searchText, selectAddress, pageSize, value, startDate, endDate).then(_ => { });
    }
    const onPageSizeChanged = async (value: any) => {
        setPageSize(value)
        setCurrentPage(1)
        await onSearch(searchText, selectAddress, value, 1, startDate, endDate).then(_ => { });
    }

    const onNavigate = (id: any) => {
        navigate(`${(ROUTE_PATH.VIEW_PARKING_LOT_CLIENT).replace(`${Constants.UseParams.Id}`, "")}${id}`);
    }
    return (
        <LayoutClient>
            <div className='flex flex-col gap-4'>

                <div className='bg-[#fffffff3] border-2 p-6 rounded-[8px]'>
                    <Row gutter={[20, 20]} align={"bottom"}>
                        {/* <Col span={10}>
                            <div className='input-common'>
                                <div className='title mb-2'>
                                    <span className='label'>Tìm theo tên bãi đỗ xe</span>
                                </div>
                                <Input
                                    min={0}
                                    className={`w-full`}
                                    value={searchText}
                                    onChange={onChangeSearchText}
                                    placeholder={`Nhập tên bãi đỗ xe...`}
                                />
                            </div>
                        </Col> */}
                        <Col span={10}>
                            <div className='input-common'>
                                <div className='title mb-2'>
                                    <span className='label'>Tìm theo địa điểm</span>
                                </div>
                                <Select
                                    showSearch
                                    allowClear={true}
                                    showArrow
                                    value={selectAddress}
                                    listHeight={120}
                                    onChange={onChangeSelectAddress}
                                    placeholder={`Chọn địa chỉ`}
                                    getPopupContainer={trigger => trigger.parentNode}
                                    className={`w-full text-left`}
                                >
                                    {
                                        Province && Province.length && Province.map((item, index) => {
                                            return (
                                                <Select.Option
                                                    key={index}
                                                    value={String(item.value)}
                                                    title={item.label}
                                                >
                                                    {item.label}
                                                </Select.Option>
                                            )
                                        })
                                    }
                                </Select>
                            </div>
                        </Col>
                    </Row>

                </div>
                <div className='bg-[#fffffff3] border-2 p-2 rounded-[8px]'>
                    <Row gutter={[10, 10]} >
                        {listUser.map((it, index) => {
                            return (
                                <Col
                                    xl={8} lg={12} md={12} sm={12} xs={24}
                                    key={index}
                                >
                                    <div className='text-[#FFF] bg-[#1c3e66e0] rounded-[8px] border-2 border-[#c4c4c4] p-4'>
                                        <div className='mb-4'>
                                            <span className='mb-1'>Tên bãi: {it.name}</span>
                                        </div>
                                        <div className='mb-4'>
                                            <div className='mb-1'>Công ty chủ khoản:</div>
                                            <div className=''>{it.operatingCompanyName} </div>
                                        </div>
                                        <div className='flex justify-between items-start'>
                                            <div className='mb-4'>
                                                <div className='mb-1'>Địa chỉ:</div>
                                                <div className=''>{it.address} </div>
                                            </div>
                                            <div className='mb-4'>
                                                <div className='mb-1'>Số lượng:</div>
                                                <div className=''>{it.numberOfBlocks} Khu </div>
                                            </div>
                                        </div>
                                        <div className='mb-4'>
                                            <div>Cho phép quay lại:</div>
                                            <div>
                                                <AllowConfig reentryAllowed={it.reentryAllowed} />
                                            </div>
                                        </div>
                                        <div className='mb-4'>
                                            <div>Đặt vé trước:</div>
                                            <div>
                                                <AvailableConfig value={it.valetParkingAvailable} />
                                            </div>
                                        </div>
                                        <div
                                            onClick={() => onNavigate(it.id)}
                                            className='cursor-pointer mt-2
                                            bg-[#fe7524] p-2 rounded-[8px] 
                                            text-center text-[16px] transition 
                                            duration-300 hover:bg-[#8bc0f4]'>
                                            Đặt chỗ
                                        </div>
                                    </div>
                                </Col>
                            )
                        })}
                    </Row>
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
                </div>
                <FullPageLoading isLoading={loading} />
            </div>
        </LayoutClient>
    )
}

export default ListParkingPage