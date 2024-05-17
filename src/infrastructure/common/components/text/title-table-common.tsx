import React from 'react'
type Props = {
    title: string,
    width: string
}
export const TitleTableCommon = (props: Props) => {
    const { title, width } = props;
    return (
        <div className='white-space-nowrap' style={{ width: width }}>{title} </div>
    )
}
