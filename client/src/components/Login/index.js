import React, { Component } from "react";
import API from "../../utils/API";
import LoginNav from "./LoginNav";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount () {
    API.getAny()
    .then(res => {
      const { type, _id } = res.data;
      switch (type) {
        case 'student':
        case 'supervisor':
        this.props.history.push(`/${type}/${_id}`)
          break;

          case 'admin':
          this.props.history.push('/admin');
          break;
      
        default:
          break;
      }
    })
  }

  render() {
    return (
      <div>
        <LoginNav />
        <div className="card">
          <div className="card-body">
            Hello! <br /> <br />
            Welcome to the USSR - Unified Social Service Register. Please log-in
            by choosing your role from the links in the navigation bar above.{" "}
            <br />
            <br />
            The USSR system aims to simplify the tracking of Social Service
            hours for universities, students and institutions.
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
