import React from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";

import Footer from "components/Footer/Footer.jsx";
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

import UserTable from "../RosterPage/UserTable.jsx";

import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";

import { FirebaseContext } from '../../firebase';

function mapStateToProps(state) {
    return {
        user: state.user
    };
};

class RosterPage extends React.Component {

    constructor() {
        super();

    }

    render() {
        const { classes, ...rest } = this.props;

        if (this.props.user === '') {
            return <Redirect push to="/auth" />
        }

        return (
        <div>
            <Header
            color="transparent"
            rightLinks={
                <FirebaseContext.Consumer>
                    {firebase => <HeaderLinks firebase={firebase} />}
                </FirebaseContext.Consumer>
            }
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
                    
                    <GridItem xs={12} sm={12} md={12}>
                        <UserTable/>
                    </GridItem>

                </GridContainer>
                
            </div>
            <Footer />
        </div>
        );
    }
}

const StatefulRosterPage = connect(mapStateToProps, null)(RosterPage)
export default withStyles(basicsStyle)(StatefulRosterPage);