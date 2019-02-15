import React from "react";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";

import Paper from '@material-ui/core/Paper';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';

import UserService from "services/user.svc";

import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";

function mapDispatchToProps(dispatch) {
    return {
      
    };
  };
  
function mapStateToProps(state) {
  return {
    user: state.user
  };
};

class UserTable extends React.Component {

    constructor() {
      super();
      this.state = {
        columns: [
            { name: 'email', title: 'Email' },
            { name: 'phoneNumber', title: 'Phone Number' },
            { name: 'volunteer', title: 'Volunteer' },
            { name: 'admin', title: 'Admin'}
        ],
        rows: [

        ]
      };
  
      this.userService = new UserService();
      this.userService.getUsersObfuscated(this.setUsers);
    }
  
    render() {
      const { classes } = this.props;
  
      return (
        <Paper>
        <Grid
          rows={this.state.rows}
          columns={this.state.columns}
        >
          <Table />
          <TableHeaderRow />
        </Grid>
      </Paper>
      );
    }
  
    setUsers = (users) => {
      this.setState({ ...this.state, rows: users });
    };
  }
  
  const StatefulUserTable = connect(mapStateToProps, mapDispatchToProps)(UserTable);
  export default withStyles(basicsStyle)(StatefulUserTable);