import './Alerts.css';
import React, { useContext } from 'react';
import { v4 as uuid } from 'uuid';
import AlertContext from '../../../context/alert/alertContext';

const Alerts = () => {
  const alertContext = useContext(AlertContext);

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert) => (
      <div className='alert-container'>
        <sl-alert key={uuid()} type={alert.type} open>
          {alert.icon !== '' && (
            <sl-icon slot='icon' name={alert.icon}></sl-icon>
          )}
          <strong>{alert.msg}</strong> <br />
          {alert.subMessage !== '' && alert.subMessage}
        </sl-alert>
      </div>
    ))
  );
};

export default Alerts;
