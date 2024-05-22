import { Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import "../../assets/styles/components/Register.css"
import { ROUTE_PATH } from '../../core/common/appRouter';
import { useNavigate } from 'react-router-dom';
import { FullPageLoading } from '../../infrastructure/common/components/controls/loading';
import { isTokenStoraged } from '../../infrastructure/utils/storage';
import InputTextCommon from '../../infrastructure/common/components/input/input-text';
import InputPasswordCommon from '../../infrastructure/common/components/input/input-password';
import authService from '../../infrastructure/repositories/auth/service/auth.service';
import { WarningMessage } from '../../infrastructure/common/components/toast/notificationToast';
const RegisterPage = () => {
    const [validate, setValidate] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [submittedTime, setSubmittedTime] = useState<any>();

    const [_data, _setData] = useState<any>({});
    const dataRegister = _data;

    const navigate = useNavigate();

    const setDataRegister = (data: any) => {
        Object.assign(dataRegister, { ...data });
        _setData({ ...dataRegister });
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


    const storage = isTokenStoraged()
    useEffect(() => {
        if (storage) {
            navigate(ROUTE_PATH.LOGIN);
        };
    }, [])

    const onLogin = async () => {
        await setSubmittedTime(new Date())
        if (isValidData()) {
            try {
                await authService.register(
                    {
                        username: dataRegister.username,
                        password: dataRegister.password,
                        name: dataRegister.name,
                        email: dataRegister.email,
                    },
                    setLoading
                ).then((response) => {
                    if (response) {
                        navigate(ROUTE_PATH.LOGIN)
                    }
                });
            } catch (error) {
                console.error(error);
            }
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
    }
    return (
        <div>
            <div className='register'>
                <div className={"container"} id="container">
                    <div className="overlay-container">
                        <div className="overlay">
                        </div>
                    </div>
                    <div className="form-container sign-in-container">
                        <div className='form-flex'>
                            <h1 className='mb-2 uppercase'>Đăng kí</h1>
                            <Row gutter={[5, 5]}>
                                <Col span={24}>
                                    <InputTextCommon
                                        label={"Tên đăng nhập"}
                                        attribute={"username"}
                                        isRequired={true}
                                        dataAttribute={dataRegister.username}
                                        setData={setDataRegister}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col span={24}>
                                    <InputTextCommon
                                        label={"Email"}
                                        attribute={"email"}
                                        isRequired={true}
                                        dataAttribute={dataRegister.email}
                                        setData={setDataRegister}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col span={24}>
                                    <InputTextCommon
                                        label={"Tên người dùng"}
                                        attribute={"name"}
                                        isRequired={true}
                                        dataAttribute={dataRegister.name}
                                        setData={setDataRegister}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col span={24}>
                                    <InputPasswordCommon
                                        label={"Mật khẩu"}
                                        attribute={"password"}
                                        isRequired={true}
                                        dataAttribute={dataRegister.password}
                                        setData={setDataRegister}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col span={24}>
                                    <div className='flex justify-end'>
                                        <div onClick={() => navigate(ROUTE_PATH.LOGIN)} className='text-[13px] text-right transition duration-300 cursor-pointer text-[#094174] hover:underline'>Đã có tài khoản??</div>
                                    </div>
                                </Col>
                            </Row>
                            <button onKeyPress={onLogin} className='w-full cursor-pointer' onClick={onLogin}>Đăng ký</button>
                        </div>
                    </div>
                </div>

            </div>
            <FullPageLoading isLoading={loading} />
        </div>
    )
}

export default RegisterPage