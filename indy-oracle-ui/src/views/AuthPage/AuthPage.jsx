import React from "react";

import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";

import Button from "components/CustomButtons/Button.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

import SignUpPage from "./SignUpPage.jsx";
import LoginPage from "./LoginPage.jsx";

import authStyle from "assets/jss/material-kit-react/views/authPage.jsx";

import { FirebaseContext } from '../../firebase';

class AuthPage extends React.Component {

    constructor() {
        super();

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
            <Parallax small filter />
            <div className={ classNames(classes.main, classes.mainRaised) }>

                <GridContainer spacing={40}>
                    
                    <GridItem xs={6} sm={6} md={6}>
                        <FirebaseContext.Consumer>
                            {firebase => <LoginPage firebase={firebase} />}
                        </FirebaseContext.Consumer>
                    </GridItem>

                    <GridItem xs={6} sm={6} md={6}>
                        <FirebaseContext.Consumer>
                            {firebase => <SignUpPage firebase={firebase} />}
                        </FirebaseContext.Consumer>
                    </GridItem>

                </GridContainer>

            </div>
            <Footer />
        </div>
        );
    }
}
  
export default withStyles(authStyle)(AuthPage);