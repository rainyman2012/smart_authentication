import React from "react";
import { Row, Col, Menu, Dropdown, Icon, Steps, Button, message } from "antd";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";

// import { authSignup } from "../../store/actions/auth";

class LanguageForm extends React.Component {
  continue = e => {
    e.preventDefault();
    this.props.next();
  };

  handleLangMenuClick = e => {
    if (e.key === "en") {
      this.props.handleChange("language", "English");
      document.body.style.fontFamily = "Indie Flower";
      let htmlElement = document.getElementsByTagName("html")[0];
      htmlElement.dir = "ltr";
    } else {
      this.props.handleChange("language", "فارسی");
      document.body.style.fontFamily = "Amiri";
      let htmlElement = document.getElementsByTagName("html")[0];
      htmlElement.dir = "rtl";
    }
  };
  render() {
    const languageMenu = (
      <Menu onClick={this.handleLangMenuClick}>
        <Menu.Item key="fa">فارسی</Menu.Item>
        <Menu.Item key="en">English</Menu.Item>
      </Menu>
    );
    return (
      <div style={{ marginTop: "200px" }}>
        <Row type="flex" justify="center">
          <Col span="12">
            <Dropdown overlay={languageMenu}>
              <Button style={{ color: "red", width: "100%" }}>
                {this.props.values["language"]}
                <Icon type="down" />
              </Button>
            </Dropdown>
          </Col>
        </Row>
        <hr />
        <Row type="flex" justify="center">
          <Col span="12">
            <Button
              type="primary"
              style={{ width: "100%" }}
              size="medium"
              onClick={this.continue}
            >
              Continue
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default LanguageForm;
// const mapStateToProps = state => {
//   return {
//     loading: state.auth.loading,
//     error: state.auth.error,
//     token: state.auth.token
//   };
// };

// // const mapDispatchToProps = dispatch => {
// //   return {
// //     create: (name, password1) => dispatch(authSignup(name, password1))
// //   };
// // };

// export default connect(
//   mapStateToProps,
//   null
// )(LanguageForm);
