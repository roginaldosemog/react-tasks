import React from "react";
import TaskCard from "../taskCard/TaskCard";
import "./List.css";

export default class List extends React.Component {
  render() {
    const cards = this.props.cards.map((card, index) => {
      return (
        <li key={index}>
          <TaskCard {...card} onDragStart={this.props.onDragStart} />
        </li>
      );
    });

    return (
      <div>
        <h2 className={`name-header name-${this.props.id}`}>
          {this.props.title}
        </h2>
        <ul
          className="list"
          onDragOver={this.props.onDragOver}
          onDrop={this.props.onDrop}
        >
          {cards}
        </ul>
      </div>
    );
  }
}
