import React, { Component } from "react";
import API from "../../utils/API";
import AdminNav from "./AdminNav";

class Admin extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    API.getAny().then(res => {
      if (res.data.type !== "admin") {
        this.props.history.push("/");
      }
    });
  }

  logout = () => {
    API.logoutUser().then(res => {
      this.props.history.push("/");
    });
  };

  render() {
    //const example = this.state.example;
    return (
      <div>
        <AdminNav />
        <div className="card">
          <div className="card-body">
            Hello Administrator! Now you can add new leaders, students, events
            and projects.
            <br />
            Check the guide bellow if you have any doubts.{" "}
          </div>
        </div>
        <button className="btn btn-info" type="button" onClick={this.logout}>
          Log out
        </button>
      </div>
    );
  }
}

export default Admin;
