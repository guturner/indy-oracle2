import React from "react";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";

import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";

import InfoSection from "./Sections/InfoSection.jsx";

import { FirebaseContext } from '../../firebase';

class LandingPage extends React.Component {

  constructor() {
    super();
    this.state = {
      phoneNumber: 'ORCL'
    };
  }
  
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          color="transparent"
          rightLinks={<HeaderLinks />}
          brand="The Indy Oracle"
          fixed
          changeColorOnScroll={{
            height: 400,
            color: "white"
          }}
          {...rest}
        />
        <Parallax filter>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={8}>
                {/* <h1 className={classes.title} onMouseEnter={() => this.onMouseEnter()} onMouseLeave={() => this.onMouseLeave()}>
                  317-584-{this.state.phoneNumber}
                </h1>
                <h4>
                  Coming soon.
                </h4> */}
                
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <InfoSection />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  onMouseEnter() {
    this.setState({phoneNumber: '6725'});
  }

  onMouseLeave() {
    this.setState({phoneNumber: 'ORCL'});
  }
}

export default withStyles(landingPageStyle)(LandingPage);
