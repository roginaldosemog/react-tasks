import React, { Component } from "react";
import List from "../list/List";
import "./Board.css";

export default class Board extends Component {
  constructor(props) {
    super(props);

    localStorage.clear();

    // if there's a localStorage to be had grab it otherwise set state
    if (localStorage.getItem("lists")) {
      const rawLS = localStorage.getItem("lists");
      const parsedLS = JSON.parse(rawLS);
      this.state = { lists: parsedLS };
    } else {
      this.state = {
        lists: [
          {
            title: "To Do",
            id: 0,
            cards: [
              {
                taskText: "default task card 1",
                listNumber: 0,
                timeId: 0
              },
              {
                taskText: "default task card 2",
                listNumber: 0,
                timeId: 1
              }
            ]
          },
          {
            title: "Doing",
            id: 1,
            cards: [
              {
                taskText: "default task card 1",
                listNumber: 1,
                timeId: 2
              },
              {
                taskText: "default task card 2",
                listNumber: 1,
                timeId: 3
              }
            ]
          },
          {
            title: "Done",
            id: 2,
            cards: [
              {
                taskText: "default task card 1",
                listNumber: 2,
                timeId: 4
              },
              {
                taskText: "default task card 2",
                listNumber: 2,
                timeId: 5
              }
            ]
          }
        ],
        tasks: [
          {
            title: "Igor Aragão",
            status: "doing"
          },
          {
            title: "Matheus Toscano",
            status: "done"
          },
          {
            title: "Karine Bruno",
            status: "todo"
          },
          {
            title: "Guilherme Richard",
            status: "todo"
          }
        ]
      };

      localStorage.setItem("lists", JSON.stringify(this.state.lists));
      localStorage.setItem("tasks", JSON.stringify(this.state.tasks)); // store tasks object as string
    }
  }

  //get id of item being dragged and list where it's coming from
  onDragStart = (e, fromList) => {
    console.log(`what a drag!`);
    const dragInfo = {
      taskId: e.currentTarget.id,
      fromList: fromList
    };

    localStorage.setItem("dragInfo", JSON.stringify(dragInfo));
  };

  onDragOver = e => {
    e.preventDefault();
  };

  onDrop = (e, listNum) => {
    //get the dropped task card, the localStorage,
    const droppedTask = localStorage.getItem("dragInfo");
    const rawLS = localStorage.getItem("lists");
    const parsedLS = JSON.parse(rawLS);
    const parsedDragInfo = JSON.parse(droppedTask);

    //get task cards array, get rid of moved card, and put a new card
    // in the list where it was dropped
    const cardsArray = parsedLS[parsedDragInfo.fromList].cards;
    const taskCard = cardsArray.find(
      card => card.timeId == parsedDragInfo.taskId
    );

    taskCard.taskText = parsedLS[listNum].title

    const indexOfCard = cardsArray.findIndex(
      card => card.timeId == parsedDragInfo.taskId
    );

    parsedLS[parsedDragInfo.fromList].cards.splice(indexOfCard, 1);
    parsedLS[listNum].cards.push({
      ...taskCard,
      listNumber: parseInt(listNum)
    });

    //sync the state and localStorage
    this.setState({
      lists: parsedLS
    });
    localStorage.setItem("lists", JSON.stringify(parsedLS));
  };

  render() {
    const lists = this.state.lists.map((list, index) => (
      <li className="list-wrapper" key={index}>
        <List
          {...list}
          onDragStart={(e, fromList) => this.onDragStart(e, `${list.id}`)}
          onDragOver={e => this.onDragOver(e)}
          onDrop={(e, listNum) => {
            this.onDrop(e, `${list.id}`);
          }}
        />
      </li>
    ));

    return (
      <div className="board">
        <ul className="lists">{lists}</ul>
      </div>
    );
  }
}
