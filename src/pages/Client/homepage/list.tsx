import { Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import parkingLotService from '../../../infrastructure/repositories/parking-lot/service/parking-lot.service'
import Constants from '../../../core/common/constants'
import { ROUTE_PATH } from '../../../core/common/appRouter'
import { FullPageLoading } from '../../../infrastructure/common/components/controls/loading'

let timeout: any
const ListParkingPage = () => {
    const [listUser, setListUser] = useState<Array<any>>([])
    const [total, setTotal] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [searchText, setSearchText] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const onGetListParkingLotAsync = async ({ name = "", size = pageSize, page = currentPage, startDate = "", endDate = "" }) => {
        const param = {
            page: page - 1,
            size: size,
            keyword: name,
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

    const onNavigate = (id: any) => {
        navigate(`${(ROUTE_PATH.VIEW_PARKING_LOT).replace(`${Constants.UseParams.Id}`, "")}${id}`);
    }
    return (
        <div className='px-[240px] home-page'>
            <Row gutter={[10, 5]}>
                {listUser.map((it, index) => {
                    return (
                        <Col
                            span={8}
                            key={index}
                            className='cursor-pointer text-[#FFF] font-semibold bg-[#1C3E66] border-2 border-[#c4c4c4] p-4 each-car'
                        >
                            <div className='mb-4'>
                                <div className='title mb-2'>Tên bãi</div>
                                <div></div>
                            </div>
                            <div className='mb-4'>
                                <div className='title mb-2'>Địa chỉ</div>
                                <div>{it.address} </div>
                            </div>
                        </Col>
                    )
                })}
            </Row>
            <FullPageLoading isLoading={loading} />
        </div>
    )
}

export default ListParkingPage