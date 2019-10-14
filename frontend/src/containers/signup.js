import React from "react";
import { Row, Col, Slider, Icon, Spin } from "antd";
import { Steps, Button, message } from "antd";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import AuthForm from "./signup_steps/auth";
import PersonalForm from "./signup_steps/personal";
import LanguageForm from "./signup_steps/language";
import { authSignup } from "../store/actions/auth";
const { Step } = Steps;

class SignUpForm extends React.Component {
  state = {
    language: "English",
    username: "",
    password: "",
    email: "",
    realName: "",
    sex: "",
    step: 1
  };

  nextStep = () => {
    const step = this.state.step + 1;
    this.setState({ step });
  };

  prevStep = () => {
    const step = this.state.step - 1;
    this.setState({ step });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, password1 } = this.state;
    this.props.create(name, password1);
  };

  handleChange = (field, value) => {
    this.setState({
      [field]: value
    });
  };

  render() {
    const { step } = this.state;
    const { language, username, password, email, realName, sex } = this.state;
    const values = { language, username, password, email, realName, sex };

    switch (step) {
      case 1:
        return (
          <LanguageForm
            next={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
        break;
      case 2:
        return (
          <AuthForm
            next={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
        break;
      case 3:
        return <PersonalForm />;
        break;
      default:
        return (
          <LanguageForm
            next={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
    }
  }
}

export default SignUpForm;
// const mapStateToProps = state => {
//   return {
//     loading: state.auth.loading,
//     error: state.auth.error,
//     token: state.auth.token
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     create: (name, password1) => dispatch(authSignup(name, password1))
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(SignUpForm);
