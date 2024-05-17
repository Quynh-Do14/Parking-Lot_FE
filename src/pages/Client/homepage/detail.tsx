import { Col, Row } from 'antd';
import React from 'react'
import carIcon from "../../../assets/images/car.png"
const DetailParkingPage = () => {

    const viewStarEvaluate = (slot: number) => {
        const stars = [];
        for (let i = 0; i < slot; i++) {
            stars.push(
                <Col
                    key={i}
                    className='cursor-pointer bg-[#1C3E66] border-2 border-[#c4c4c4] p-4 each-car'
                    span={4}>
                    <div className='flex items-center justify-center gap-1'>
                        <img src={carIcon} />
                        <div className='font-semibold text-[16px] text-[#FFF]'>- {i + 1} </div>
                    </div>
                </Col>
            );
        }
        return stars
    }
    return (
        <div className='px-[240px] home-page'>
            <p>Bãi đỗ xe Lê Văn Khải</p>
            <div className='flex justify-center'>
                <Row>
                    {viewStarEvaluate(50)}
                </Row>
            </div>
        </div>

    )
}

export default DetailParkingPage