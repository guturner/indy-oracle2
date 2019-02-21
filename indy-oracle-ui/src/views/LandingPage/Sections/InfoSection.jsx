import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";

import infoStyle from "assets/jss/material-kit-react/views/landingPageSections/infoStyle.jsx";

class InfoSection extends React.Component {

  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem cs={12} sm={12} md={8}>
            <h2 className={classes.title}>Who Are We</h2>
            <h4 className={classes.description}>
              Criminals beware, Indy Oracle is online. 
              <br/><br/>
              We are a group of individuals volunteering to keep cosplayers safe.
              Conventions are a world of fun, but oftentimes they are held in highly populated cities - like Indianapolis.
              While we all like to believe our city is safe, that's not always the case.
              <br/><br/>
              The Indy Oracle offers a way of connecting cosplayers in need with thoroughly-vetted volunteers ready to help.
              Whether that's walking with you to your car, calling an Uber, or getting in touch with the venue's security - that's up to you!
            </h4>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(infoStyle)(InfoSection);
