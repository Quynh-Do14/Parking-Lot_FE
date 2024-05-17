import React from 'react';
type Props = {
    isError: boolean,
    message: string
}
export const MessageError = ({ isError = false, message }: Props) => {
    return (
        <>
            {
                isError === true && message && message.length ?
                    <div className="message-error">{message}</div>
                    :
                    null
            }
        </>
    );
};

