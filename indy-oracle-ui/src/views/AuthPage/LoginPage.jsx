import React from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";

import { signIn } from "../../actions";

import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";

function mapDispatchToProps(dispatch) {
  return {
    signIn: user => dispatch(signIn(user))
  };
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
};

class LoginPage extends React.Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      redirect: false
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(response => {
        this.props.signIn(response.user.email);
        this.setState({ ...this.state, redirect: true });
      })
      .catch(error => {
        console.log(error);
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  
  render() {
    const { classes, ...rest } = this.props;

    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }

    const isInvalid =
      this.state.email === '' ||
      this.state.password === '';

    return (
      <Card className={classes.textCenter}>
        <CardHeader color="danger">Login</CardHeader>

        <CardBody xs={12} sm={12} md={12}>
          <form onSubmit={this.onSubmit}>

            <GridContainer>

              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="Email Address"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    name: "email",
                    value: this.state.email,
                    onChange: this.onChange
                  }}
                />
              </GridItem>

            </GridContainer>

            <GridContainer>

              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="Password"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    name: "password",
                    type: "password",
                    value: this.state.password,
                    onChange: this.onChange
                  }}
                />
              </GridItem>

            </GridContainer>

            <GridContainer>

              <GridItem xs={12} sm={12} md={12}>
                <Button color="primary" type="submit" disabled={isInvalid}>Login</Button>
              </GridItem>

            </GridContainer>

          </form>
        </CardBody>
      </Card>
    );
  }
}

const StatefulLoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPage);
export default withStyles(basicsStyle)(StatefulLoginPage);