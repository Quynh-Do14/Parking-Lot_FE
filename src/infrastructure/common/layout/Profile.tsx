import { Col, Modal, Row } from 'antd';
import InputTextCommon from '../components/input/input-text';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../repositories/auth/service/auth.service';
import { WarningMessage } from '../components/toast/notificationToast';
import UploadImage from '../components/input/upload-image';
import { ButtonCommon } from '../components/button/button-common';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ProfileState } from '../../../core/atoms/profile/profileState';
import InputDateCommon from '../components/input/input-date';
import { convertDateOnlyShow, formatCurrencyVND } from '../../helper/helper';

type Props = {
  // handleOk: Function,
  handleCancel: Function,
  visible: boolean,
  isLoading?: boolean,
}
const ProfileModal = (props: Props) => {
  const { handleCancel, visible, isLoading } = props;
  const [validate, setValidate] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [submittedTime, setSubmittedTime] = useState<any>();
  const [detailProfile, setDetailProfile] = useState<any>({});
  const [detailCustomer, setDetailCustomer] = useState<any>({});
  const [regularPass, setRegularPass] = useState<any>({});

  const [imageUrl, setImageUrl] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  const [, setDetailState] = useRecoilState(ProfileState)

  const [_data, _setData] = useState<any>({});
  const dataProfile = _data;

  const setDataProfile = (data: any) => {
    Object.assign(dataProfile, { ...data });
    _setData({ ...dataProfile });
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

  const onGetUserByIdAsync = async () => {
    try {
      await authService.profile(
        setLoading
      ).then((response) => {
        setDetailProfile(response.customer.user)
        setDetailCustomer(response.customer)
        setRegularPass(response.regularPass)
        setDetailState({
          user: response?.customer?.user,
          contactNumber: response?.customer?.contactNumber,
          vehicleNumber: response?.customer?.vehicleNumber,
          regularPass: response?.regularPass
        })
      })
    }
    catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    onGetUserByIdAsync().then(() => { })
  }, [])

  useEffect(() => {
    if (detailProfile) {
      setDataProfile({
        avatar: detailProfile.avatar,
        name: detailProfile.name,
        email: detailProfile.email,
        username: detailProfile.username,
      });
    }
    if (detailCustomer) {
      setDataProfile({
        contactNumber: detailCustomer.contactNumber,
        vehicleNumber: detailCustomer.vehicleNumber,
      });
    }
    if (regularPass) {
      setDataProfile({
        cost: regularPass.cost,
        durationInDays: regularPass.durationInDays,
        startDate: regularPass.startDate,
        endDate: regularPass.endDate,
        purchaseDate: regularPass.purchaseDate,
      });
    }
  }, [detailProfile, detailCustomer, regularPass]);

  const onUpdateProfile = async () => {
    await setSubmittedTime(Date.now());
    if (isValidData()) {
      await authService.updateProfile(
        {
          email: dataProfile.email,
          username: dataProfile.username,
          name: dataProfile.name,
          contactNumber: dataProfile.contactNumber,
          vehicleNumber: dataProfile.vehicleNumber,
        },
        onGetUserByIdAsync,
        setLoading
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
      width={"90%"}
    >
      <div className='main-page h-full flex-1 overflow-auto bg-white px-4 py-8'>
        <div className='bg-white scroll-auto'></div>
        <Row>
          <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={5} className='border-add flex justify-center'>
            <div className='legend-title'>Cập nhật ảnh</div>
            <UploadImage
              attributeImg={dataProfile.avatar}
              imageUrl={imageUrl}
              setAvatar={setAvatar}
              setImageUrl={setImageUrl}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={16} xl={18} xxl={19} className='border-add'>
            <div className='legend-title'>Cập nhật thông tin</div>
            <Row gutter={[30, 0]}>

              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <InputTextCommon
                  label={"Tên đăng nhập"}
                  attribute={"username"}
                  isRequired={false}
                  dataAttribute={dataProfile.username}
                  setData={setDataProfile}
                  disabled={true}
                  validate={validate}
                  setValidate={setValidate}
                  submittedTime={submittedTime}
                />
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <InputTextCommon
                  label={"Email"}
                  attribute={"email"}
                  isRequired={false}
                  dataAttribute={dataProfile.email}
                  setData={setDataProfile}
                  disabled={true}
                  validate={validate}
                  setValidate={setValidate}
                  submittedTime={submittedTime}
                />
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <InputTextCommon
                  label={"Tên khách hàng"}
                  attribute={"name"}
                  isRequired={true}
                  dataAttribute={dataProfile.name}
                  setData={setDataProfile}
                  disabled={false}
                  validate={validate}
                  setValidate={setValidate}
                  submittedTime={submittedTime}
                />
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <InputTextCommon
                  label={"Số điện thoại"}
                  attribute={"contactNumber"}
                  isRequired={true}
                  dataAttribute={dataProfile.contactNumber}
                  setData={setDataProfile}
                  disabled={false}
                  validate={validate}
                  setValidate={setValidate}
                  submittedTime={submittedTime}
                />
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <InputTextCommon
                  label={"Biển số xe"}
                  attribute={"vehicleNumber"}
                  isRequired={true}
                  dataAttribute={dataProfile.vehicleNumber}
                  setData={setDataProfile}
                  disabled={false}
                  validate={validate}
                  setValidate={setValidate}
                  submittedTime={submittedTime}
                />
              </Col>
            </Row>
          </Col>
          <Col span={24} className='border-add'>
            <div className='legend-title'>Thông tin vé tháng</div>
            {
              regularPass
                ?
                <Row gutter={[30, 0]}>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <InputTextCommon
                      label={"Giá vé"}
                      attribute={"cost"}
                      isRequired={true}
                      dataAttribute={formatCurrencyVND(String(dataProfile.cost))}
                      setData={setDataProfile}
                      disabled={true}
                      validate={validate}
                      setValidate={setValidate}
                      submittedTime={submittedTime}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <InputTextCommon
                      label={"Ngày mua vé"}
                      attribute={"purchaseDate"}
                      isRequired={true}
                      dataAttribute={convertDateOnlyShow(dataProfile.purchaseDate)}
                      setData={setDataProfile}
                      disabled={true}
                      validate={validate}
                      setValidate={setValidate}
                      submittedTime={submittedTime}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <InputTextCommon
                      label={"Ngày bắt đầu"}
                      attribute={"startDate"}
                      isRequired={true}
                      dataAttribute={convertDateOnlyShow(dataProfile.startDate)}
                      setData={setDataProfile}
                      disabled={true}
                      validate={validate}
                      setValidate={setValidate}
                      submittedTime={submittedTime}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <InputTextCommon
                      label={"Ngày kết thúc"}
                      attribute={"endDate"}
                      isRequired={true}
                      dataAttribute={convertDateOnlyShow(dataProfile.endDate)}
                      setData={setDataProfile}
                      disabled={true}
                      validate={validate}
                      setValidate={setValidate}
                      submittedTime={submittedTime}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <InputTextCommon
                      label={"Số ngày"}
                      attribute={"durationInDays"}
                      isRequired={true}
                      dataAttribute={dataProfile.durationInDays}
                      setData={setDataProfile}
                      disabled={true}
                      validate={validate}
                      setValidate={setValidate}
                      submittedTime={submittedTime}
                    />
                  </Col>
                </Row>
                :
                <p className='font-semibold text-[16px] text-[#1C3E66] my-3 text-center'>Chưa đặt vé tháng</p>
            }

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

export default ProfileModal