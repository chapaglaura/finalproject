import React, { Component } from "react";
import { Link } from "react-router-dom";

class Nav extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();

    this.props.onClick(e);
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" id="admin-nav">
        <h1 className="navbar-brand">
          <Link className="nav-link" to="/admin">
            Admin{" "}
          </Link>
        </h1>
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item active">
            <Link className="nav-link" to="/admin/student">
              Add Student
            </Link>
          </li>

          <li className="nav-item active">
            <Link className="nav-link" to="/admin/event">
              Add Event
            </Link>
          </li>

          <li className="nav-item active">
            <Link className="nav-link" to="/admin/project">
              Add Project
            </Link>
          </li>

          <li className="nav-item active">
            <Link className="nav-link" to="/admin/supervisor">
              Add Leader
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
