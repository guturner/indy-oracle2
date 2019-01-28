import React from "react";

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
      <form onSubmit={this.onSubmit}>
        
        <input
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />

        <input
          name="password"
          value={this.state.password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />

        <input
          name="confirmPassword"
          value={this.state.confirmPassword}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />

        <button type="submit" disabled={isInvalid}>Sign Up</button>

      </form>
    );
  }
}

export default SignUpPage;
