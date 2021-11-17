import PropTypes from 'prop-types';
import { Modal, Form, Input, Checkbox } from 'antd';
import "./style/BindPhoneModal.less";

BindPhoneModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func
};

function BindPhoneModal(props) {

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
        >
          <Form.Item
            className="form-item"
            name="phone"
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: '请输入手机号', validator: (rule, value, callback) =>{
              if(/^1[3456789]\d{9}$/.test(value)) {
                return Promise.resolve();
              }else{
                return  Promise.reject();
              }
            }}]}
          >
            <Input placeholder="请输入手机号"/>
          </Form.Item>
          <Form.Item
            className="form-item"
            name="code"
            wrapperCol={{ span: 24 }}
            rules={[
               { required: true, message: '请输入4位短信验证码', validator: (rule, value, callback) => {
                 if(value.length === 4) {
                   return Promise.resolve();
                 }else{
                   return  Promise.reject();
                 }
               }},
            ]}
          >
            <div className="form-code-container">
              <Input className="form-code-input" placeholder="请输入4位短信验证码" maxLength={4}/>
              <div className="form-code-box">发送验证码</div>
            </div>
          </Form.Item>
          <Form.Item 
            className="form-item"
            name="remember" 
            wrapperCol={{ span: 24 }}
            valuePropName="checked"
            rules={[{ required: true, message: '请同意服务协议和隐私政策' }]}>
            <Checkbox>同意服务协议和隐私政策</Checkbox>
          </Form.Item>
          <div className="form-submit-btn-container">
            <div className="form-submit-btn active">完成</div>
          </div>
        </Form>
      </div>
    </Modal>
  );
}

export default BindPhoneModal;