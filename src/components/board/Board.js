import React, { Component } from "react";
import List from "../list/List";
import "./Board.css";

export default class Board extends Component {
  constructor(props) {
    super(props);

    // if there's a localStorage to be had grab it otherwise set state
    if (localStorage.getItem("tasks")) {
      const parsedTasks = this.getLocalStorageParsed("tasks");
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

  getLocalStorageParsed(item) {
    const rawTasks = localStorage.getItem(item);
    const tasks = JSON.parse(rawTasks);
    return tasks;
  }

  onDragStart = e => {
    const taskId = e.currentTarget.id;
    localStorage.setItem("draggedTaskId", taskId);
  };

  onDragOver = e => {
    e.preventDefault();
  };

  onDrop = (e, status) => {
    const droppedTaskId = localStorage.getItem("draggedTaskId");
    const tasks = this.getLocalStorageParsed("tasks");

    // get task
    const droppedTaskIndex = tasks.findIndex(task => {
      return task.id == droppedTaskId
    });
    tasks[droppedTaskIndex].status = status;
    
    //sync the state and localStorage
    this.setState({
      tasks: tasks
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  render() {
    return (
      <div className="board">
        <ul className="lists">
          <List
            tasks={this.state.tasks}
            name="A fazer"
            status="todo"
            onDragStart={e => this.onDragStart(e)}
            onDragOver={e => this.onDragOver(e)}
            onDrop={e => {
              this.onDrop(e, "todo");
            }}
          />
          <List
            tasks={this.state.tasks}
            name="Fazendo"
            status="doing"
            onDragStart={e => this.onDragStart(e)}
            onDragOver={e => this.onDragOver(e)}
            onDrop={e => {
              this.onDrop(e, "doing");
            }}
          />
          <List
            tasks={this.state.tasks}
            name="Feito"
            status="done"
            onDragStart={e => this.onDragStart(e)}
            onDragOver={e => this.onDragOver(e)}
            onDrop={e => {
              this.onDrop(e, "done");
            }}
          />
        </ul>
      </div>
    );
  }
}
