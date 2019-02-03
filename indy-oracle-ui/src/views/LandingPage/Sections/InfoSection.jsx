import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";

import SampleService from "services/sample.svc";

import infoStyle from "assets/jss/material-kit-react/views/landingPageSections/infoStyle.jsx";

class InfoSection extends React.Component {

  constructor() {
    super();
    this.state = {
      msg: 'Loading...'
    };

    this.sampleService = new SampleService();
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
    this.sampleService.getGreeting(this.setMsg);
  }

  setMsg = (msg) => {
    this.setState({ ...this.state, msg: msg });
  };
}

export default withStyles(infoStyle)(InfoSection);
