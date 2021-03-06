import React from "react";
import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux";

import { signOut } from "../../actions";

import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";

function mapStateToProps(state) {
  return {
    user: state.user
  };
};

function mapDispatchToProps(dispatch) {
  return {
    signOut: () => dispatch(signOut())
  };
};

class HeaderLinks extends React.Component {
  
  constructor() {
    super();

    this.state = {
      redirect: false,
      redirectPath: '',
      mounted: false
    }

    this.mounted = false;
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleSignIn = () => {
    this.setState({ redirect: true, redirectPath: '/auth' }, () => {
      setTimeout(() => { if (this.mounted) this.setState({ redirect: false, redirectPath: '' }) }, 0);
    });
  }

  handleSignOut = () => {
    this.props.firebase.doSignOut();
    this.setState({ redirect: true, redirectPath: '/' }, () => {
      setTimeout(() => { this.setState({ redirect: false, redirectPath: '' }) }, 0);
    });
    this.props.signOut();
  }

  render() {
    const { classes, ...rest } = this.props;

    if (this.state.redirect) {
      return <Redirect push to={this.state.redirectPath} />;
    }

    return (
      this.props.user === '' ?

      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <Button color="primary" onClick={this.handleSignIn} className={classes.boldButton}>
            Login / Signup
          </Button>
        </ListItem>
      </List>
      :
      <CustomDropdown
          noLiPadding
          buttonText={this.props.user}
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          dropdownList={[
            <Link to="/roster" className={classes.dropdownLink}>
              Roster
            </Link>,
            <Link to="/" onClick={this.handleSignOut} className={classes.dropdownLink}>
              Signout
            </Link>
          ]}
        />
  )};
}

const StatefulHeaderLinks = connect(mapStateToProps, mapDispatchToProps)(HeaderLinks);
export default withStyles(headerLinksStyle)(StatefulHeaderLinks);
