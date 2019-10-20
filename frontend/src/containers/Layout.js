import React from "react";
import { Layout, Menu, message } from "antd";

import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout, authCheckState } from "../store/actions/auth";

const { Header, Content, Footer } = Layout;
class CustomLayout extends React.Component {
  handleLogout = () => {
    this.props.logout();
    message.success("loged out");
  };
  render() {
    const { authenticated } = this.props;
    return (
      <Layout>
        <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
          <div className="logo" />

          {!authenticated ? (
            <React.Fragment>
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["1"]}
                style={{ lineHeight: "64px" }}
              >
                <Menu.Item key="1">
                  <Link to="signup"> SignUp</Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="Login"> Login</Link>
                </Menu.Item>
              </Menu>
            </React.Fragment>
          ) : (
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["1"]}
              style={{ lineHeight: "64px" }}
            >
              <Menu.Item key="3">
                <Link to="#" onClick={this.handleLogout}>
                  Logout
                </Link>
              </Menu.Item>
            </Menu>
          )}
        </Header>
        <Content style={{ padding: "0 50px", marginTop: 64 }}>
          {this.props.children}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Two Language Smart Authentication ©2018 Created by Ehsan Ahmadi
        </Footer>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.token !== null,
    uuid: state.exercise.uuid
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    checkAuth: () => dispatch(authCheckState())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomLayout)
);
