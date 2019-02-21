import React from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";

import Footer from "components/Footer/Footer.jsx";
import IndyHeader from "components/Header/IndyHeader.jsx";
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
            <IndyHeader/>
            <Parallax filter image={require("assets/img/bg3.jpg")}>
                <div className={classes.container}>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <div>
                                <h1 className={classes.title}>
                                    Meet your team.
                                </h1>
                            </div>
                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>
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