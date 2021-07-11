import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert as BAlert } from 'react-bootstrap';

const Alert = ({ alerts }) =>
  alerts.map((alert) => (
    <BAlert key={alert.id} variant={alert.alertType}>
      {alert.msg}
    </BAlert>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);