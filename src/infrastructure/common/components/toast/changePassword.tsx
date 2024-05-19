import { Col, Modal, Row } from 'antd'
import React, { useState } from 'react'
import { ButtonCommon } from '../button/button-common'
import authService from '../../../repositories/auth/service/auth.service'
import { WarningMessage } from './notificationToast'
import InputPasswordCommon from '../input/input-password'
import { useNavigate } from 'react-router-dom'
import { ROUTE_PATH } from '../../../../core/common/appRouter'
type Props = {
    // handleOk: Function,
    handleCancel: Function,
    visible: boolean,
    isLoading?: boolean,
}
const ChangePasswordModal = (props: Props) => {
    const { handleCancel, visible, isLoading } = props;
    const [validate, setValidate] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [submittedTime, setSubmittedTime] = useState<any>();

    const navigate = useNavigate();

    const [_data, _setData] = useState<any>({});
    const changePassword = _data;

    const setchangePassword = (data: any) => {
        Object.assign(changePassword, { ...data });
        _setData({ ...changePassword });
    };

    const isValidData = () => {
        let allRequestOK = true;

        setValidate({ ...validate });

        Object.values(validate).forEach((it: any) => {
            if (it.isError === true) {
                allRequestOK = false;
            }
        });
        return allRequestOK;
    };

    const onUpdateProfile = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await authService.changePassword(
                {
                    oldPassword: changePassword.oldPassword,
                    newPassword: changePassword.newPassword,
                    confirmPassword: changePassword.confirmPassword,
                },
                async () => {
                    handleCancel();
                    await authService.logout(
                        setLoading
                    )
                    navigate(ROUTE_PATH.LOGIN)
                },
                setLoading,
            )
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
    };

    return (
        <Modal
            key={"f-0"}
            centered
            visible={visible}
            closable={false}
            footer={false}
            onCancel={() => handleCancel()}
            width={"50%"}
        >
            <div className='main-page h-full flex-1 overflow-auto bg-white px-4 py-8'>
                <div className='bg-white scroll-auto'></div>
                <Row>
                    <Col span={24} className='border-add'>
                        <div className='legend-title'>Thay đổi mật khẩu</div>
                        <Row gutter={[30, 0]}>

                            <Col span={24}>
                                <InputPasswordCommon
                                    label={"Mật khẩu hiện tại"}
                                    attribute={"oldPassword"}
                                    isRequired={true}
                                    dataAttribute={changePassword.oldPassword}
                                    setData={setchangePassword}
                                    disabled={false}
                                    validate={validate}
                                    setValidate={setValidate}
                                    submittedTime={submittedTime}
                                />
                            </Col>
                            <Col span={24}>
                                <InputPasswordCommon
                                    label={"Mật khẩu mới"}
                                    attribute={"newPassword"}
                                    isRequired={true}
                                    dataAttribute={changePassword.newPassword}
                                    setData={setchangePassword}
                                    disabled={false}
                                    validate={validate}
                                    setValidate={setValidate}
                                    submittedTime={submittedTime}
                                    data={changePassword}
                                />
                            </Col>
                            <Col span={24}>
                                <InputPasswordCommon
                                    label={"Xác nhận mật khẩu"}
                                    attribute={"confirmPassword"}
                                    isRequired={true}
                                    dataAttribute={changePassword.confirmPassword}
                                    setData={setchangePassword}
                                    disabled={false}
                                    validate={validate}
                                    setValidate={setValidate}
                                    submittedTime={submittedTime}
                                    data={changePassword}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            <div className='container-btn main-page bg-white p-4 flex flex-col'>
                <Row justify={"center"}>
                    <Col className='mx-1'>
                        <ButtonCommon
                            onClick={handleCancel}
                            classColor="blue"
                            icon={null}
                            title={'Quay lại'}
                        />
                    </Col>
                    <Col className='mx-1'>
                        <ButtonCommon
                            onClick={onUpdateProfile}
                            classColor="orange"
                            icon={null}
                            title={'Cập nhật'}
                        />
                    </Col>
                </Row>
            </div >
        </Modal >
    )
}

export default ChangePasswordModal