import { Button, Row, Col, Slider, Icon, Spin } from "antd";
import React, { Component } from "react";

import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchData, setGAClientId } from "../store/actions/exercise";

class HomepageLayout extends React.Component {
  componentDidMount() {
    if (this.props.match.params.uuid) {
      this.props.fetchData(this.props.match.params.uuid);
    }
    var clientid = "";
    window.ga(function(tracker) {
      clientid = tracker.get("clientId");
    });
    this.props.setClientId(clientid);
    console.log("clientid is: ", clientid);
  }
  render() {
    return (
      <Row>
        <Col>
          <h3 style={{ fontSize: "2em" }}>your uuid is :</h3>

          {this.props.serverError ? "Your exercise didnt find" : null}
          {this.props.uuid ? <p>{this.props.uuid}</p> : null}
          {this.props.name ? <p>{this.props.name}</p> : null}
          {this.props.clientId ? <p>{this.props.clientId}</p> : null}
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    uuid: state.exercise.uuid,
    name: state.exercise.name,
    clientId: state.exercise.clientId,
    serverError: state.exercise.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: uuid => dispatch(fetchData(uuid)),
    setClientId: clientId => dispatch(setGAClientId(clientId))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomepageLayout)
);
