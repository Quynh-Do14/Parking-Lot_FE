import { Button, Col, Modal, Row } from 'antd';
import "../../../../assets/styles/components/modal.css"
type Props = {
    title: string,
    message: string,
    titleCancel: string,
    titleOk: string,
    handleOk: Function,
    handleCancel: Function,
    visible: boolean,
    isLoading?: boolean,
}
const DialogConfirmCommon = (props: Props) => {
    const { title, message, titleCancel, titleOk, handleOk, handleCancel, visible, isLoading = false } = props;

    return (
        <div>
            <Modal
                key={"f-0"}
                centered
                visible={visible}
                closable={false}
                footer={false}
                onCancel={() => handleCancel()}
            >
                <div className='modal-common'>
                    <div className='title py-2'>{title}</div>
                    <div className='message py-2'>{message}</div>
                    <Row justify={"center"} className='py-4'>
                        <Col>
                            <Button className={"btn-Cancel mx-2"} type='text' key="f-2" onClick={() => handleCancel()}>{titleCancel}</Button>
                        </Col>
                        <Col>
                            <Button disabled={isLoading} type='text' className={"btn-ok mx-2"} key="f-1" onClick={() => handleOk()}>{titleOk}</Button>
                        </Col>
                    </Row>
                </div>
            </Modal>
        </div>
    )
}
export default DialogConfirmCommon;