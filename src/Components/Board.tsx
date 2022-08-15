import { useEffect } from "react";

const Board = () => {
  let count = 0;
  useEffect(() => {
    if (count > 0) {
      return;
    }
    for (let a = 0; a < 8; a++) {
      let board = document.querySelector(".board");

      for (let b = 0; b < 8; b++) {
        let node = document.createElement("div");
        if ((a + b) % 2 === 0) {
          node.classList.add(a.toString(), "node", "black");
          node.id = b.toString();
        } else {
          node.classList.add(a.toString(), "node", "white");
          node.id = b.toString();
        }
        count++;
        board?.appendChild(node);
      }
    }

    let allNode = document.querySelectorAll(".node");
    for (let a = 0; a < allNode.length; a++) {
      allNode[a].addEventListener("click", fun);
    }

    function fun(this:Element) {
      for (let a = 0; a < allNode.length; a++) {
        allNode[a].classList.remove("active");
      }
      this.classList.add("active");
      let currentId = this.id;
      let currentClass = this.classList[0];
      let possible = reach(currentClass, currentId);
      possibleNodes(possible);
    }

    function possibleNodes(nodes : Element[]) {
      for (let a = 0; a < allNode.length; a++) {
        allNode[a].classList.remove("possible");
      }

      for (let a = 0; a < nodes.length; a++) {
        nodes[a].classList.add("possible");
      }
    }

    function reach(currentClass:string, currentId:string) {
      let possible = [];
      if (Number(currentClass) - 2 >= 0) {
        let current : number = Number(currentClass) - 2;
        let nodes = document.getElementsByClassName(current.toString());
        if (Number(currentId) - 1 >= 0) {
          possible.push(nodes[Number(currentId) - 1]);
        }
        if (Number(currentId) + 1 <= 7) {
          possible.push(nodes[Number(currentId) + 1]);
        }
      }
      if (Number(currentClass) + 2 <= 7) {
        let current:number = Number(currentClass) + 2;
        let nodes = document.getElementsByClassName(current.toString());
        if (Number(currentId) - 1 >= 0) {
          possible.push(nodes[Number(currentId) - 1]);
        }
        if (Number(currentId) + 1 <= 7) {
          possible.push(nodes[Number(currentId) + 1]);
        }
      }
      if (Number(currentClass) - 1 >= 0) {
        let current:number = Number(currentClass) - 1;
        let nodes = document.getElementsByClassName(current.toString());
        if (Number(currentId) - 2 >= 0) {
          possible.push(nodes[Number(currentId) - 2]);
        }
        if (Number(currentId) + 2 <= 7) {
          possible.push(nodes[Number(currentId) + 2]);
        }
      }

      if (Number(currentClass) + 1 <= 7) {
        let current:number = Number(currentClass) + 1;
        let nodes = document.getElementsByClassName(current.toString());
        if (Number(currentId) - 2 >= 0) {
          possible.push(nodes[Number(currentId) - 2]);
        }
        if (Number(currentId) + 2 <= 7) {
          possible.push(nodes[Number(currentId) + 2]);
        }
      }
      return possible;
    }
  });
  return <div className="board"></div>;
};
export default Board;
