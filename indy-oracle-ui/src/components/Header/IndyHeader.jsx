import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";

import indyHeaderStyle from "assets/jss/material-kit-react/components/indyHeaderStyle.jsx";

import { Link } from "react-router-dom";

import { FirebaseContext } from '../../firebase';

class IndyHeader extends React.Component {
 
  render() {
    const { classes, ...rest } = this.props;

    return (
      <Header
        color="transparent"
        rightLinks={
          <FirebaseContext.Consumer>
              {firebase => <HeaderLinks firebase={firebase} />}
          </FirebaseContext.Consumer>
        }
        brand={
          <Link className={classes.headerLink} to="/">The Indy Oracle</Link>
        }
        fixed
        { ...rest }
      />
    );
  }
}

export default withStyles(indyHeaderStyle)(IndyHeader);
