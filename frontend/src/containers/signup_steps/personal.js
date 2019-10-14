import React from "react";
import {
  Form,
  Input,
  Menu,
  Icon,
  Dropdown,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete
} from "antd";
import { connect } from "react-redux";
import { HOSTNAME } from "../../static";
import { NavLink, Redirect } from "react-router-dom";
import axios from "axios";

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

// import { authSignup } from "../../store/actions/auth";

class PersonalForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.handleChange("realName", values.realName);
        this.props.handleChange("gender", values.gender);
        this.props.submit();
      }
    });
  };

  handleSelectChange = value => {
    console.log(value);
    // this.props.form.setFieldsValue({
    //   realname: `Hi, ${value === "m" ? "man" : "lady"}!`
    // });
  };
  nameLengthLimit = (rule, value, callback) => {
    if (value.length <= 3 && value.length > 0)
      callback("Your Name and family must greater than 3 letter");
    else {
      callback();
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 0
        }
      }
    };

    return (
      <div style={{ marginTop: "200px" }}>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item
            hasFeedback
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            {getFieldDecorator("realName", {
              rules: [
                {
                  required: true,
                  message: "Please input your first name and last name!"
                },
                {
                  validator: this.nameLengthLimit
                }
              ]
            })(<Input placeholder="first name and last name" />)}
          </Form.Item>

          <Form.Item
            hasFeedback
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            {getFieldDecorator("gender", {
              rules: [
                {
                  required: true,
                  message: "Please select your gender!"
                }
              ]
            })(
              <Select
                placeholder="Select your gender"
                onChange={this.handleSelectChange}
              >
                <Option value="m">male</Option>
                <Option value="f">female</Option>
                <Option value="b">bisexual</Option>
              </Select>
            )}
          </Form.Item>

          <Form.Item
            {...tailFormItemLayout}
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center"
            }}
          >
            <Button type="primary" htmlType="submit">
              Continue
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedPersonalForm = Form.create({ name: "register" })(PersonalForm);

// export default AuthForm;
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
)(WrappedPersonalForm);
