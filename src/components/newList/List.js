import React, { Component } from "react";
import "./List.css";

export default class List extends Component {
  render() {
    const { tasks, name, status } = this.props;
    const filteredTasks = tasks
      .filter(task => task.status === status)
      .map((task, index) => (
        <li key={index}>
          <div
            className="task-card"
            id={[task.id]}
            draggable="true"
            onDragStart={this.props.onDragStart}
          >
            {task.title}
            <br />
            {task.status}
          </div>
        </li>
      ));

    return (
      <li className="list-wrapper">
        <div>
          <h2 className="name-header">{name}</h2>
          <ul
            className="list"
            onDragOver={this.props.onDragOver}
            onDrop={this.props.onDrop}
          >
            {filteredTasks}
          </ul>
        </div>
      </li>
    );
  }
}
