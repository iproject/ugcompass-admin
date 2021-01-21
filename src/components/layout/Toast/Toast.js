import './Toast.css';
import React from 'react';

const Toast = ({ type, msg, subMsg }) => {
  return (
    <div className={`toast ${type ? 'toast--' + type : null}`}>
      <div className='toast__wrapper'>
        <div className='toast__message'>
          <strong>{msg}</strong>
        </div>
        <span className='toast__sub-message'>{subMsg}</span>
      </div>
    </div>
  );
};

export default Toast;
