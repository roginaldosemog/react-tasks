import React, { Component } from "react";
import List from "../newList/List";
import "./Board.css";

export default class Board extends Component {
  constructor(props) {
    super(props);

    localStorage.clear();

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
    const parsedTasks = JSON.parse(rawTasks);
    return parsedTasks;
  }

  render() {
    return (
      <div className="board">
        <ul className="lists">
          <List tasks={this.state.tasks} name="A fazer" status="todo" />
          <List tasks={this.state.tasks} name="Fazendo" status="doing" />
          <List tasks={this.state.tasks} name="Feito" status="done" />
        </ul>
      </div>
    );
  }
}
