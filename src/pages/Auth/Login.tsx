import { Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import "../../assets/styles/components/Login.css"
import { ROUTE_PATH } from '../../core/common/appRouter';
import { useNavigate } from 'react-router-dom';
import { FullPageLoading } from '../../infrastructure/common/components/controls/loading';
import { isTokenStoraged } from '../../infrastructure/utils/storage';
import InputTextCommon from '../../infrastructure/common/components/input/input-text';
import InputPasswordCommon from '../../infrastructure/common/components/input/input-password';
import authService from '../../infrastructure/repositories/auth/service/auth.service';
import { WarningMessage } from '../../infrastructure/common/components/toast/notificationToast';
const LoginPage = () => {
    const [validate, setValidate] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [submittedTime, setSubmittedTime] = useState<any>();

    const [_data, _setData] = useState<any>({});
    const dataLogin = _data;

    const navigate = useNavigate();

    const setDataLogin = (data: any) => {
        Object.assign(dataLogin, { ...data });
        _setData({ ...dataLogin });
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
            navigate(ROUTE_PATH.PARKING_LOT_CLIENT);
        };
    }, [])

    const onLogin = async () => {
        await setSubmittedTime(new Date())
        if (isValidData()) {
            try {
                await authService.login(
                    {
                        username: dataLogin.username,
                        password: dataLogin.password,
                    },
                    setLoading
                ).then((response) => {
                    if (response) {
                        navigate(ROUTE_PATH.PARKING_LOT_CLIENT)
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
            <div className='login'>
                <div className={"container"} id="container">
                    <div className="form-container sign-in-container">
                        <div className='form-flex'>
                            <h1 className='mb-4 uppercase'>Đăng nhập</h1>
                            <Row gutter={[10, 10]} justify={"end"}>
                                <Col span={24}>
                                    <InputTextCommon
                                        label={"Tên đăng nhập"}
                                        attribute={"username"}
                                        isRequired={true}
                                        dataAttribute={dataLogin.username}
                                        setData={setDataLogin}
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
                                        dataAttribute={dataLogin.password}
                                        setData={setDataLogin}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col span={24}>
                                    <div className='flex justify-end'>
                                        {/* <div className='text-[13px] text-right transition duration-300 cursor-pointer text-[#094174] hover:underline'>Đổi mật khẩu</div> */}
                                        <div onClick={() => navigate(ROUTE_PATH.REGISTER)} className='text-[13px] text-right transition duration-300 cursor-pointer text-[#094174] hover:underline'>Bạn chưa có tài khoản??</div>
                                    </div>
                                </Col>
                            </Row>
                            <button onKeyPress={onLogin} className='w-full cursor-pointer' onClick={onLogin}>Đăng nhập</button>
                        </div>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                        </div>
                    </div>
                </div>

            </div>
            <FullPageLoading isLoading={loading} />
        </div>
    )
}

export default LoginPage