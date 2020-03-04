import React, { Component } from "react";
import "./Board.css";

export default class Board extends Component {
  constructor(props) {
    super(props);

    localStorage.clear();

    // if there's a localStorage to be had grab it otherwise set state
    if (localStorage.getItem("tasks")) {
      const parsedTasks = this.getParsedTasks();
      this.state = { tasks: parsedTasks };
    } else {
      this.state = {
        tasks: [
          {
            id: 0,
            title: "Igor Aragão",
            status: "doing"
          },
          {
            id: 1,
            title: "Matheus Toscano",
            status: "done"
          },
          {
            id: 2,
            title: "Karine Bruno",
            status: "todo"
          },
          {
            id: 3,
            title: "Guilherme Richard",
            status: "todo"
          }
        ]
      };

      // store tasks as string on localStorage
      localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
    }
  }

  getParsedTasks() {
    const rawTasks = localStorage.getItem("tasks");
    const parsedTasks = JSON.parse(rawTasks);
    return parsedTasks;
  }

  render() {
    const tasks = this.state.tasks.map((task, index) => (
      <li key={index}>
        <div className="task-card" draggable="true" id={0}>
          {task.title}
          <br />
          {task.status}
        </div>
      </li>
    ));

    return (
      <div className="board">
        <ul className="lists">
          <li className="list-wrapper" key={0}>
            <div>
              <h2 className={`name-header name-${0}`}>Tasks</h2>
              <ul className="list">{tasks}</ul>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
