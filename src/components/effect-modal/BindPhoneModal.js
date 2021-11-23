import PropTypes from 'prop-types';
import { Modal, Form, Input, Checkbox, message } from 'antd';
import { useState } from 'react';
import "./style/BindPhoneModal.less";
import smsService from "@src/global/service/sms";

BindPhoneModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func
};

function BindPhoneModal(props) {
  const [locked, setLock] = useState(false);
  const [key, setKey] = useState('');
  const [countDownNumber, setCountDownNumber] = useState(0);

  const coundDownBoxDisable = countDownNumber !== 0;
  const [form] = Form.useForm();

  const countDownEvent = () => {
    let countDown = 60;
    const interval = setInterval(() => {
      countDown -= 1;
      setCountDownNumber(countDown);
      if (countDown === 0) {
        clearInterval(interval);
      }
    }, 1000);
  }

  const handleCountDown = async (e) => {
    e.preventDefault();
    if(coundDownBoxDisable){
      return false;
    }

    const phone = form.getFieldValue('phone');
    if(!/^1\d{10}$/.test(phone)) {
      message.error('手机号格式错误！');
      return false;
    }
    if(locked) {
      return;
    }
    setLock(true);
    try {
      const res = await smsService.smsRegisterCode({phone});
      message.success('验证码发送成功，请注意查看 ～ ');
      setKey(res.key);
      setLock(false);
      countDownEvent();
    } catch(e) {
      setLock(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const values = await form.validateFields();
      if(!key) {
        message.error("请点击发送验证码");
        return;
      }
      if(locked) {
        return;
      }
      setLock(true);
      await smsService.smsBindPhone({key, ...values});
      message.success('手机号绑定成功！');
      props.onCancel(false);
      setLock(false);
    } catch (errorInfo) {
      console.log(errorInfo)
      setLock(false);
    }
  }

  return (
    <Modal visible={props.visible} 
      width={416}
      centered={true}
      closable={false}
      footer={null}>
      <div className="bind-phone-modal">
        { props.onCancel && <i className="lar-cancel" onClick={() => props.onCancel(false)}></i>}
        <div className="lar-logo-container">
          <div className="lar-logo-element"></div>
        </div>
        <div className="modal-title">绑定手机</div>
        <Form
          name="basic"
          wrapperCol={{ span: 16 }}
          autoComplete="off"
          size="large"
          form={form}
        >
          <Form.Item
            className="form-item"
            name="phone"
            wrapperCol={{ span: 24 }}
            rules={[
              { required: true, message: '请输入手机号'},
              { pattern: /^1\d{10}$/, message: '手机号格式错误！'},
            ]}
          >
            <Input placeholder="请输入手机号" disabled={coundDownBoxDisable}/>
          </Form.Item>
          <Form.Item
            className="form-item"
            name="code"
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: '请输入4位短信验证码', len: 4}]}
          >
            <div className="form-code-container">
              <Input className="form-code-input" placeholder="请输入4位短信验证码" maxLength={4}/>
               <button className={`form-code-box ${coundDownBoxDisable ? 'disable' : ''}`}
                 onClick={(e) => handleCountDown(e)}>
                 { countDownNumber === 0  
                   ? '发送验证码'
                   : countDownNumber + '秒'
                 }
              </button>
            </div>
          </Form.Item>
          <Form.Item 
            className="form-item"
            name="remember" 
            wrapperCol={{ span: 24 }}
            valuePropName="checked"
            rules={[{ required: true, type: 'boolean', message: '请同意服务协议和隐私政策',
              validator: (rule, value) => {
                return value ? Promise.resolve() : Promise.reject()
              }
            }]}>
            <Checkbox>同意服务协议和隐私政策</Checkbox>
          </Form.Item>
        </Form>
        <div className="form-submit-btn-container">
          <div className="form-submit-btn active"onClick={handleSubmit}>完成</div>
        </div>
      </div>
    </Modal>
  );
}

export default BindPhoneModal;