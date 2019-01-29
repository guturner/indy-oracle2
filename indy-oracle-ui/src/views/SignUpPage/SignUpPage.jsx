import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";

class SignUpPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  onSubmit = event => {
    console.log('got here');
    const { email, password } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {

      })
      .catch(error => {
        console.log(error);
      });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  
  render() {
    const { classes, ...rest } = this.props;

    const isInvalid =
      this.state.email === '' ||
      this.state.password !== this.state.confirmPassword ||
      this.state.password === '';

    return (
      <Card>
        <CardBody>
          <form onSubmit={this.onSubmit}>

            <GridContainer>

              <GridItem xs={8} sm={8} md={8}>
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

              <GridItem xs={4} sm={4} md={4}>
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

              <GridItem xs={4} sm={4} md={4}>
                <CustomInput
                  labelText="Confirm Password"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    name: "confirmPassword",
                    type: "password",
                    value: this.state.confirmPassword,
                    onChange: this.onChange
                  }}
                />
              </GridItem>
            
            </GridContainer>

            <GridContainer>

              <GridItem xs={4} sm={4} md={4}>
                <Button type="submit" disabled={isInvalid}>Sign Up</Button>
              </GridItem>
            
            </GridContainer>

          </form>
        </CardBody>
      </Card>
    );
  }
}

export default withStyles(basicsStyle)(SignUpPage);
