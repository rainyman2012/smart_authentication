import React from "react";
import {
  Form,
  Input,
  Menu,
  Icon,
  Upload,
  Select,
  Row,
  Col,
  message,
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

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

class PersonalForm extends React.Component {
  state = {
    image: null
  };
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

  handleDeleteImage = e => {
    this.props.handleChange("image", null);
    this.setState({ image: null });
  };

  onChange = info => {
    console.log("Im in OnChange", info);

    const nextState = {};
    switch (info.file.status) {
      case "uploading":
        nextState.selectedFileList = [info.file];
        break;
      case "done":
        nextState.selectedFile = info.file;
        nextState.selectedFileList = [info.file];
        break;

      default:
        // error or removed
        nextState.selectedFile = null;
        nextState.selectedFileList = [];
    }
    getBase64(info.file.originFileObj, result => {
      console.log("converting to base 64");
      this.setState({ image: result });
      this.props.handleChange("image", result);
    });
  };

  nameLengthLimit = (rule, value, callback) => {
    if (value.length <= 3 && value.length > 0)
      callback("Your Name and family must greater than 3 letter");
    else {
      callback();
    }
  };

  dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  handlePreview = e => {
    console.log("in_preview", e);
  };

  normFile = e => {
    console.log("IM IN NORMFILE", e);

    const isJpgOrPng =
      e.file.type === "image/jpeg" || e.file.type === "image/png";

    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }

    const isLt2M = e.file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
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
    // let userImage = "#";
    // if (this.props.values.image) {
    //   userImage = this.props.values.image;
    // }
    console.log("in personal", this.state.image);
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
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            {!this.state.image ? (
              getFieldDecorator("dragger", {
                valuePropName: "fileList",
                getValueFromEvent: this.normFile
              })(
                <Upload.Dragger
                  name="files"
                  customRequest={this.dummyRequest}
                  onChange={this.onChange}
                >
                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                  </p>
                  <p className="ant-upload-text" style={{ height: "85px" }}>
                    Select file to this area to upload
                  </p>
                </Upload.Dragger>
              )
            ) : (
              <div style={{ textAlign: "center" }}>
                <img
                  id="yourImage"
                  src={this.state.image}
                  alt="your image"
                  width="200px"
                  height="200px"
                />
                <div>
                  <Button
                    type="danger"
                    style={{ color: "white" }}
                    onClick={this.handleDeleteImage}
                  >
                    delete
                  </Button>
                </div>
              </div>
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
