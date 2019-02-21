import React from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";

import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import IndyHeader from "components/Header/IndyHeader.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";

import InfoSection from "./Sections/InfoSection.jsx";

function mapStateToProps(state) {
  return {
    user: state.user
  };
};

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
        <IndyHeader/>
        <Parallax filter image={require("assets/img/bg.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                { 
                  this.props.user !== '' ?
                  <div>
                    <h1 className={classes.title} onMouseEnter={() => this.onMouseEnter()} onMouseLeave={() => this.onMouseLeave()}>
                      317-597-{this.state.phoneNumber}
                    </h1>
                    <h4>
                      ALPHA
                    </h4>
                  </div> :
                  <div>
                    <h1 className={classes.title}>
                      It's dangerous to go alone...
                    </h1>
                  </div>
                }
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

const StatefulLandingPage = connect(mapStateToProps, null)(LandingPage);
export default withStyles(landingPageStyle)(StatefulLandingPage);
