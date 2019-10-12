import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { exerciseCreate, setGAClientId } from "../store/actions/exercise";

class ExerciseForm extends React.Component {
  state = {
    name: "",
    password1: "",
    uuid: "",
    clientid: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, password1 } = this.state;
    this.props.create(name, password1);
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { name, password1 } = this.state;
    const { error, loading, uuid } = this.props;

    if (uuid) {
      return <Redirect to="/" />;
    }

    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Create Your Exercise{" "}
          </Header>{" "}
          {error && <p> {this.props.error.message} </p>}
          <React.Fragment>
            <Form size="large" onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  onChange={this.handleChange}
                  value={name}
                  name="name"
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Enter your name"
                />
                <Form.Input
                  onChange={this.handleChange}
                  fluid
                  value={password1}
                  name="password1"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                />
                <Button
                  color="teal"
                  fluid
                  size="large"
                  loading={loading}
                  disabled={loading}
                >
                  Create{" "}
                </Button>{" "}
              </Segment>{" "}
            </Form>{" "}
            <p>{this.state.clientid}</p>
          </React.Fragment>{" "}
        </Grid.Column>{" "}
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.exercise.loading,
    error: state.exercise.error,
    uuid: state.exercise.uuid
  };
};

const mapDispatchToProps = dispatch => {
  return {
    create: (name, password1) => dispatch(exerciseCreate(name, password1)),
    setClientId: clientId => dispatch(setGAClientId(clientId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExerciseForm);
