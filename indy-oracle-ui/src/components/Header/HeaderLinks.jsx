import React from "react";

import { Link } from "react-router-dom";

import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

import { Apps, CloudDownload } from "@material-ui/icons";

import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";

import Auth from "auth/Auth.js";

class HeaderLinks extends React.Component {
  
  constructor() {
    super();
    this.state = {
      auth : new Auth(),
      key : Math.random()
    }
  }

  render() {
    const { classes, ...rest } = this.props;

    return (
    <List className={classes.list}>
      <ListItem key={this.state.key} className={classes.listItem}>
        {
          !this.state.auth.isAuthenticated() ?
          <Button className={classes.title} onClick={() => this.login()}>Login / Signup</Button> :
          null
        }
      </ListItem>
    </List>
  )};

  login() {
    this.state.auth.login();
    this.setState({ auth : new Auth(), key : Math.random() });
  }
}

export default withStyles(headerLinksStyle)(HeaderLinks);
