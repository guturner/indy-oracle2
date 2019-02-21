import React from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";

import Button from "components/CustomButtons/Button.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import IndyHeader from "components/Header/IndyHeader.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

import SignUpPage from "./SignUpPage.jsx";
import LoginPage from "./LoginPage.jsx";

import authStyle from "assets/jss/material-kit-react/views/authPage.jsx";

import { FirebaseContext } from '../../firebase';

function mapStateToProps(state) {
    return {
        user: state.user
    };
};

class AuthPage extends React.Component {

    constructor() {
        super();

    }

    render() {
        const { classes, ...rest } = this.props;

        return (
        <div>
            <IndyHeader/>
            <Parallax filter image={require("assets/img/bg2.jpg")}>
                <div className={classes.container}>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <div>
                                <h1 className={classes.title}>
                                    We can be heroes.
                                </h1>
                            </div>
                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>
            <div className={ classNames(classes.main, classes.mainRaised) }>

                <GridContainer spacing={40}>
                    
                    <GridItem xs={12} sm={12} md={6}>
                        <FirebaseContext.Consumer>
                            {firebase => <LoginPage firebase={firebase} />}
                        </FirebaseContext.Consumer>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={6}>
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

const StatefulAuthPage = connect(mapStateToProps, null)(AuthPage)
export default withStyles(authStyle)(StatefulAuthPage);