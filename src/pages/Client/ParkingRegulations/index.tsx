import React from 'react'
import LayoutClient from '../../../infrastructure/common/layout/Layout-Client'
import { Col, Row } from 'antd'

const data = [
    "Phí đỗ xe: 1h/20.000 vnđ/1 lượt",
    "Tốc độ tối đa khi di chuyển trong bãi đỗ xe là 10 km/h.",
    "Tắt máy và khóa xe cẩn thận. Không để lại tài sản có giá trị trong xe.",
    "Cấm hút thuốc và sử dụng lửa trong khu vực bãi đỗ xe.",
    "Đỗ xe đúng vị trí quy định, không chiếm dụng hai chỗ đỗ xe hoặc đỗ xe tại các khu vực cấm.",
    "Các khu vực dành riêng cho người khuyết tật, xe đạp và xe máy phải được tôn trọng.",
    "Giữ gìn vệ sinh chung, không vứt rác bừa bãi.",
    "Chủ xe tự chịu trách nhiệm về tài sản cá nhân và xe của mình trong bãi đỗ.",
    "Bãi đỗ xe không chịu trách nhiệm về mất mát tài sản cá nhân để trong xe.Chủ xe cần tự bảo quản tài sản của mình.",
    "Các vi phạm quy định về đỗ xe sẽ bị phạt[số tiền]đồng / lần vi phạm.",
    "Nếu khách hàng không lấy xe ra khỏi bãi sau 1h mình hẹn trả, sẽ bị phạt tiền với mức phạt 20.000vnđ cho 1h",
    "Nếu vi phạm nhiều lần hoặc nghiêm trọng, bãi đỗ xe có quyền từ chối phục vụ.",
]
const ParkingRegulation = () => {
    return (
        <LayoutClient>
            <div className='main-page h-full  overflow-auto rounded-[8px] bg-white px-4 py-8'>
                <div className='bg-white scroll-auto flex flex-col gap-3'>
                    <p className='font-semibold text-[20px] uppercase text-[#1e1e1e] mb-3 text-center'>Quy tắc bãi đỗ xe</p>
                    <div className='flex justify-center'>
                        <Row gutter={[20, 20]}>
                            {
                                data.map((it, index) => {
                                    return (
                                        <Col xs={24} md={12}
                                            key={index}>
                                            <div className='font-semibold text-[16px] text-[#1e1e1e]'>
                                                - {it}
                                            </div>
                                        </Col>
                                    )
                                })
                            }
                        </Row>

                    </div>
                    <div className='flex flex-row gap-1'>
                        <div className='font-semibold text-[18px] text-[#1e1e1e]'>Thông tin liên lạc:</div>
                        <div className='text-[18px] text-[#1e1e1e]'>
                            Mọi thắc mắc hoặc vấn đề phát sinh, xin vui lòng liên hệ:
                        </div>
                        <div className='font-semibold text-[18px] text-[#1e1e1e] underline'>
                            0381231233
                        </div>
                    </div>
                </div>
            </div>

        </LayoutClient>
    )
}

export default ParkingRegulation