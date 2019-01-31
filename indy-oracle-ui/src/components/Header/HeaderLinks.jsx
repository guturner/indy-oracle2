import React from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";

import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

import { Apps, CloudDownload } from "@material-ui/icons";

import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";

function mapStateToProps(state) {
  return {
    user: state.user
  };
};

class HeaderLinks extends React.Component {
  
  constructor() {
    super();

    this.state = {
      redirect: false
    }
  }

  handleOnClick = () => {
    this.setState({ redirect: true })
  }

  render() {
    const { classes, ...rest } = this.props;

    if (this.state.redirect) {
      return <Redirect push to="/auth" />;
    }

    return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        {
          this.props.user === '' ?
          <Button color="primary" onClick={this.handleOnClick} className={classes.title}>
            Login / Signup
          </Button> :
          <div>{this.props.user}</div>
        }
      </ListItem>
    </List>
  )};
}

const StatefulHeaderLinks = connect(mapStateToProps, null)(HeaderLinks);
export default withStyles(headerLinksStyle)(StatefulHeaderLinks);
