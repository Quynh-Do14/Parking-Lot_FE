import React from 'react';
import Constants from '../../../../core/common/constants';
type Props = {
    reentryAllowed: boolean
}
export const StatusUser = ({ reentryAllowed }: Props) => {
    switch (reentryAllowed) {
        case Constants.ReentryAllowed.Allowed.value:
            return (
                <div
                    className='bg-[#08a045] 
                    text-[#FFFFFF] px-2 py-1
                    font-semibold text-center
                    rounded-[2px]'
                >
                    {Constants.ReentryAllowed.Allowed.label}
                </div>
            )
        case Constants.ReentryAllowed.NotAllowed.value:
            return (
                <div
                    className='bg-[#ff4747] 
                    text-[#FFFFFF] px-2 py-1
                    font-semibold text-center
                    rounded-[2px]'
                >
                    {Constants.ReentryAllowed.NotAllowed.label}
                </div>
            )
        default:
            return <div></div>
    }
}
