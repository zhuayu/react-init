import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Modal, message } from 'antd';
import { IDENTITY_CONTENT } from "./UserTagModalDatas";
import "./style/UserTagModal.less";
import userService from "@src/global/service/user";

UserTagModal.propTypes = {
  identity: PropTypes.number,
  remark: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func
};

UserTagModal.defaultProps = {
  identity: 0,
  remark: ""
};

function UserTagModal(props) {
  const [locked, setLock] = useState(false);
  const [identiy, setIdentiy] = useState(props.identity);
  const [remark, setRemark] = useState(props.remark);
  const [mode, setMode] = useState(props.identity > 0 ? 'remark' : 'identity');
  const selectedIdentiy = IDENTITY_CONTENT.find(item => item.id === identiy);
  const remarkItems = selectedIdentiy ? selectedIdentiy.children : [];
  const hasSelectedRemark = remarkItems.some(item => item.name === remark);
  const [inputValue, setInputValue] = useState(hasSelectedRemark ? '' : remark);

  const handleClickIndentiy = (id) => {
    if(id !== identiy) {
      setIdentiy(id);
      setInputValue('');
    }
    setMode('remark');
  }

  const handleCLickRemark = (name) => {
    setRemark(name);
    setInputValue('');
  }

  const handleRemarkInputChange = (e) => {
    setInputValue(e.target.value);
    remark && setRemark('');
  }

  const handleSubmitIdentiy = () => {
    if((!hasSelectedRemark && inputValue.trim().length === 0) || locked) {
      return false;
    }

    const data = {
      identity: identiy,
      remark: hasSelectedRemark ? remark : inputValue
    }

    setLock(true);
    userService.updateUserInfo(data).then(() => {
      message.success('期待看到你的新家，设计吧少年！');
      props.onCancel();
    }).finally(() => {
      setLock(false);
    });
  }

  const indentityFormContent = (
    <div className="user-tag-modal">
      <div className="modal-logo"></div>
      <div className="modal-title">请问你的身份是？</div>
      <div className="modal-content">
        {IDENTITY_CONTENT.map(item => {
          return <div key={item.id}
            className={`identity-item ${identiy === item.id ? 'active' : ''}`}
            onClick={()=>handleClickIndentiy(item.id)}>
            {item.name}
          </div>
        })}
      </div>
    </div>
  );

  const remarkFormContent = (
    <div className="user-tag-modal">
      <div className="modal-back" onClick={() => setMode('identity')}></div>
      <div className="modal-title">请问你的目的是</div>
      <div className="modal-content">
        {remarkItems.map(item => {
          return <div key={item.id}
            className={`mark-item ${remark === item.name ? 'active' : ''}`}
            onClick={() => handleCLickRemark(item.name)}>
              <img 
                className="mark-item-image"
                src={remark === item.name
                  ? item.image_select.default
                  : item.image.default}
                alt={item.name}/>
              <div className="mark-item-title">{item.name}</div>
          </div>
        })}
        <input
          onChange={handleRemarkInputChange}
          className="mark-input"
          placeholder="其他情况请写在这里..."
          value={inputValue}
        />
        <button 
          className="mark-button" 
          onClick={handleSubmitIdentiy}
          disabled={!hasSelectedRemark && inputValue?.trim().length === 0}>
          完成
        </button>
      </div>
    </div>
  );

  return (
    <Modal visible={props.visible} 
      width={416}
      centered={true}
      closable={false}
      footer={null}>
      {mode === 'identity' 
        ? indentityFormContent 
        : remarkFormContent
      }
    </Modal>
  );
}

export default UserTagModal;