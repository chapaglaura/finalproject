import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

class Supervisor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      students: [],
      name: "",
      project: {
        name: "",
        id: ""
      },
      username: ""
    };
  }

  componentDidMount() {
    API.getAny().then(res => {
      if (res.data.type !== "supervisor") {
        this.props.history.push("/");
      } else {
        API.getByUserID(res.data.type, res.data._id).then(res => {
          console.log(res);
          const { name, organization, project, area, username } = res.data;
          this.setState({
            name,
            project: {
              id: project
            },
            username
          });
          API.getByProject("checkin", project).then(res => {
            console.log(res);
            this.setState({
              students: [...res.data]
            });
          });
          API.getById("project", project).then(res => {
            this.setState({
              project: {
                name: res.data.dbModel.name
              }
            });
          });
        });
      }
    });

    // API.getAll("student")
    //   .then(res => {
    //     console.log(res);
    //     this.setState({ students: res.data, id: "", project: "", checkin: "" });
    //   })

    //   .catch(err => {
    //     console.log(err);
    //   });

    // API.getOne("supervisor", this.props.match.params.id)
    //   .then(res => {
    //     this.setState({ supervisor: res.data, id: "", project: "" });
    //   })

    //   .catch(err => {
    //     console.log(err);
    //   });
  }

  // getStudent = () => {
  //     const supervisor = this.state.supervisor;
  //     const student = this.state.students;
  //     console.log(supervisor,student);
  //     const listElements = student.map((element) => {
  //         if (supervisor && supervisor.dbModel.project==element.project)
  //         return (
  //             <li key={element._id}>
  //                 <Link to={`/api/student/${element._id}`}>
  //                     <p>
  //                         {element.name} + <button> in </button>
  //                     </p>
  //                 </Link>
  //             </li>
  //         );
  //     });

  //     if (listElements.length === 0)
  //         return <h3>No Results </h3>;

  //     return listElements;

  // }

  logout = () => {
    API.logoutUser().then(res => {
      this.props.history.push("/");
    });
  };

  render() {
    const students = [...this.state.students];
    const projectName = this.state.project.name;

    return (
      <div className="container">
        <h1>Hello Teacher</h1>
        <h2>
          <Clock />
        </h2>
        <Card>
          <Card.Header>Quick Information</Card.Header>
          <Card.Body>
              <ul className="list-group list-group-flush">
                {students.map(student => {
                  console.log(student);
                  return <li key={student._id} id={student._id}>{student.student} - {projectName} - {student.date} </li>;
                })}
              </ul>
          </Card.Body>
        </Card>
        <button className="btn btn-info" type="button" onClick={this.logout}>
          Log out
        </button>
      </div>
    );
  }
}
function simulateNetworkRequest() {
  return new Promise(resolve => setTimeout(resolve, 2000));
}

class LoadingButton extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      isLoading: false
    };
  }

  handleClick() {
    this.setState({ isLoading: true }, () => {
      simulateNetworkRequest().then(() => {
        this.setState({ isLoading: false });
      });
    });
  }

  render() {
    const { isLoading } = this.state;

    return (
      <Button
        variant="primary"
        disabled={isLoading}
        onClick={!isLoading ? this.handleClick : null}
      >
        {isLoading ? "Loading…" : "in"}
      </Button>
    );
  }
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
export default Supervisor;
