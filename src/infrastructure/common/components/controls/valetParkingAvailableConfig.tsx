import React from 'react';
import Constants from '../../../../core/common/constants';
type Props = {
    value: boolean
}
export const AvailableConfig = ({ value }: Props) => {
    switch (value) {
        case Constants.ValetParkingAvailable.Available.value:
            return (
                <div
                    className='bg-[#74f1a6] 
                    text-[#3b3b3b] px-2 py-1
                    font-semibold text-center
                    rounded-[2px]'
                >
                    {Constants.ValetParkingAvailable.Available.label}
                </div>
            )
        case Constants.ValetParkingAvailable.Unavailable.value:
            return (
                <div
                    className='bg-[#ff7b7b] 
                    text-[#FFFFFF] px-2 py-1
                    font-semibold text-center
                    rounded-[2px]'
                >
                    {Constants.ValetParkingAvailable.Unavailable.label}
                </div>
            )
        default:
            return <div></div>
    }
}
