import './Alerts.css';
import React from 'react';
import { Message } from 'semantic-ui-react';

import { connect } from 'react-redux';

const Alert = ({ alerts }) => {
  return (
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div className='alert-container' key={alert.id}>
        <Message color={alert.type} floating>
          <Message.Header>{alert.msg}</Message.Header>
          {alert.subMessage !== '' && <p>{alert.subMessage}</p>}
        </Message>
      </div>
    ))
  );
};

const mapStateToProps = (state) => {
  return {
    alerts: state.alerts,
  };
};

export default connect(mapStateToProps, null)(Alert);
