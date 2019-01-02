import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";

import axios from 'axios';

import infoStyle from "assets/jss/material-kit-react/views/landingPageSections/infoStyle.jsx";

class InfoSection extends React.Component {

  constructor() {
    super();
    this.state = {
      msg: 'Loading...'
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem cs={12} sm={12} md={8}>
            <h2 className={classes.title}>More Info</h2>
            <h4 className={classes.description}>
              {this.state.msg}
              <br/>
              Coming soon.
            </h4>
          </GridItem>
        </GridContainer>
      </div>
    );
  }

  componentWillMount() {
    axios.get('indy-oracle-api-svc:8080/api/1.0/user')
        .then(response => this.setState({msg: response.data}));
  }
}

export default withStyles(infoStyle)(InfoSection);
