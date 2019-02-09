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
import Danger from "components/Typography/Danger.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InputAdornment from "@material-ui/core/InputAdornment";
import PhoneNumberInput from "components/CustomInput/PhoneNumberInput.jsx";
import Help from "@material-ui/icons/Help";
import Tooltip from "@material-ui/core/Tooltip";

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

class SignUpPage extends React.Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      redirect: false,
      badEmail: false,
      badEmailMsg: '',
      badPassword: false,
      badPasswordMsg: '',
      uid: '',
      phoneNumber: '',
      codeWord: '',
      phoneNumber: '',
      codeWord: '',
      badCodeWord: false,
      badCodeWordMsg: ''
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;

    this.setState({ ...this.state, badEmail: false, badEmailMsg: '', badPassword: false, badPasswordMsg: '' });

    const isBadCodeWord = this.isBadCodeWord();
    if (isBadCodeWord) {
      return;
    } else {
      this.props.firebase
        .doCreateUserWithEmailAndPassword(email, password)
        .then(response => {
          this.props.signIn(response.user.email);
          this.setState({ ...this.state, uid: response.user.uid })
        })
        .catch(error => {
          switch(error.code) {
            case 'auth/invalid-email':
              this.setState({ ...this.state, badEmail: true, badEmailMsg: 'Invalid email format.' });
              break;
            case 'auth/weak-password':
              this.setState({ ...this.state, badPassword: true, badPasswordMsg: 'Weak password! Must be at least 6 characters.' });
              break;
            case 'auth/email-already-in-use':
              this.setState({ ...this.state, badEmail: true, badEmailMsg: 'Email already in use.' });
              break;
          }
        });

      this.props.firebase
        .doCreateUserEntry(this.state.uid, this.state.email, this.trimPhoneNumber(this.state.phoneNumber), this.state.codeWord);
    }
  };

  trimPhoneNumber(phoneNumber) {
    return phoneNumber.replace(/[\(\)\s-]/g, '');
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  isCodeWordInBadWordList() {
    const badWordList = ['fuck', 'fuk', 'shit', 'ass', 'bitch', 'penis', 'vagina', 'dick', 'cock', 'pussy'];

    var result = false;
    badWordList.forEach(word => {
      if (this.state.codeWord.toLowerCase().includes(word)) {
        result = true;
      }
    });

    return result;
  }

  isBadCodeWord() {
    this.setState({ ...this.state, badCodeWord: false, badCodeWordMsg: '' });
    if (this.state.codeWord.length > 0 && this.state.codeWord.length < 3) {
      this.setState({ ...this.state, badCodeWord: true, badCodeWordMsg: 'Code Word is too short, must be at least 3 characters.' });
      return true;
    } else if (this.state.codeWord.length > 10) {
      this.setState({ ...this.state, badCodeWord: true, badCodeWordMsg: 'Code Word is too long, it should be easy to remember.' });
      return true;
    } else if (this.isCodeWordInBadWordList()) {
      this.setState({ ...this.state, badCodeWord: true, badCodeWordMsg: 'Let\'s keep it kid-friendly, hero.' });
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { classes, ...rest } = this.props;

    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }

    const isInvalid =
      this.state.email === '' ||
      this.state.password !== this.state.confirmPassword ||
      this.state.password === '' ||
      this.state.phoneNumber.length < 14 ||
      this.state.codeWord === '';

    return (
      <Card className={classes.textCenter}>
        <CardHeader color="danger">Sign Up</CardHeader>

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
                    error: this.state.badEmail,
                    onChange: this.onChange
                  }}
                />
              </GridItem>
              <GridItem>
                {
                  this.state.badEmail ?
                  <Danger>
                    { this.state.badEmailMsg }
                  </Danger> :
                  null
                }
              </GridItem>

            </GridContainer>

            <GridContainer>

              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Password"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    name: "password",
                    type: "password",
                    value: this.state.password,
                    error: this.state.badPassword,
                    onChange: this.onChange
                  }}
                />
                {
                  this.state.badPassword ?
                  <Danger>
                    { this.state.badPasswordMsg }
                  </Danger> :
                  null
                }
              </GridItem>

              <GridItem xs={12} sm={12} md={6}>
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

              <GridItem xs={12} sm={12} md={6}>

                  <PhoneNumberInput
                      labelText="Phone Number"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: "phoneNumber",
                        type: "tel",
                        value: this.state.phoneNumber,
                        onChange: this.onChange,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip
                              id="phoneToolTip"
                              title="The number you will use to call upon the Oracle."
                              placement="left"
                              classes={{ tooltip: classes.tooltip }}
                            >
                              <Help />
                            </Tooltip>
                          </InputAdornment>
                        )
                      }}
                    />
                    
              </GridItem>

              <GridItem xs={12} sm={12} md={6}>

                  <CustomInput
                      labelText="Code Word"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: "codeWord",
                        value: this.state.codeWord,
                        onChange: this.onChange,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip
                              id="codeWordToolTip"
                              title="A publicly visible catch phrase to identify yourself with."
                              placement="left"
                              classes={{ tooltip: classes.tooltip }}
                            >
                              <Help />
                            </Tooltip>
                          </InputAdornment>
                        )
                      }}
                    />
                    {
                      this.state.badCodeWord ?
                      <Danger>
                        { this.state.badCodeWordMsg }
                      </Danger> :
                      null
                    }
                    
              </GridItem>

            </GridContainer>

            <GridContainer>

              <GridItem xs={12} sm={12} md={12}>
                <Button color="primary" type="submit" disabled={isInvalid}>Sign Up</Button>
              </GridItem>

            </GridContainer>

          </form>
        </CardBody>
      </Card>
    );
  }
}

const StatefulSignUpPage = connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
export default withStyles(basicsStyle)(StatefulSignUpPage);
