import React from "react";
import { Layout, Menu } from "antd";

import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";
import { dataClear } from "../store/actions/exercise";
const { Header, Content, Footer } = Layout;
class CustomLayout extends React.Component {
  render() {
    const { authenticated } = this.props;
    return (
      <Layout>
        <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
          <div className="logo" />
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
            <Menu.Item key="3">
              <Link to="Logout"> Logout</Link>
            </Menu.Item>
          </Menu>
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
    logout: () => dispatch(dataClear())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomLayout)
);
