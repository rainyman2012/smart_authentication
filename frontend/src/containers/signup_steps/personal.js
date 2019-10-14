import React from "react";
import { Row, Col, Slider, Icon, Spin, Steps, Button, message } from "antd";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";

// import { authSignup } from "../../store/actions/auth";

class PersonalForm extends React.Component {
  render() {
    return (
      <Row>
        <Col>
          <h1>Step 3</h1>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     create: (name, password1) => dispatch(authSignup(name, password1))
//   };
// };

export default connect(
  mapStateToProps,
  null
)(PersonalForm);
